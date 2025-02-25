# mts-teta-final-task

Финальное задание Java-курса МТС Тета.

Команда разработчиков:
Горшков Александр (лид, бэкенд)
Павлова Наталья (фронтенд)
Байбулатов Амир (бэкенд)

Для запуска требуется PostgreSQL, Clickhouse, Kafka.

Docker-команды:

```shell
# Postgres
docker run --name mts-teta-postgres -e POSTGRES_PASSWORD=password -e POSTGRES_USER=user -e POSTGRES_DB=mts-teta-database -p 5432:5432 -d postgres

# Clickhouse
docker run -e CLICKHOUSE_DB=db -e CLICKHOUSE_USER=username -e CLICKHOUSE_PASSWORD=password -p 8123:8123 -d yandex/clickhouse-server

# Kafka
docker network create kafka
docker run -d --network=kafka --name=zookeeper -e ZOOKEEPER_CLIENT_PORT=2181 -e ZOOKEEPER_TICK_TIME=2000 -p 2181:2181 confluentinc/cp-zookeeper
docker run -d --network=kafka --name=kafka -e KAFKA_ZOOKEEPER_CONNECT=zookeeper:2181 -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://localhost:9092 -e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 -p 9092:9092 confluentinc/cp-kafka
# Подключение к терминалу Kafka
docker exec -it kafka bash
```

К Postgres можно цепляться через [DBeaver](https://dbeaver.io/). К Clickhouse тоже, но также
доступен web-интерфейс в браузере по ссылке [http://localhost:8123/play](http://localhost:8123/play)
. Обратите внимание, что в web-интерфейса Clickhouse в правом верхнем углу нужно вписать логин и
пароль.

Чтобы посмотреть, какие данные записались в Clickhouse, сделайте запрос:

```sql
SELECT *
FROM db.event
```

Если вы выполняете Docker-команды по умолчанию, не меняя пользователей, названия баз и порты, то
достаточно просто запустить приложение через [main](src/main/java/com/mts/teta/DemoApplication.java)
. Иначе же нужно также предварительно поправить конфиги
в [application.properties](src/main/resources/application.properties).

Для запуска требуется Java 17.

## Модули

Если кратко, то flow отправки сообщения и его обогащения выглядит следующим образом.

1. Модуль `tagmanager` предоставляет endpoint (
   смотри [ContainerController.getContainerAsJsFile](src/main/java/com/mts/teta/tagmanager/controller/ContainerController.java))
   для получения Javascript-файла, который можно встроить в веб-сайт. Для простоты в репозитории
   также есть [index.html](index.html). Достаточно просто открыть его в браузере как файл (не
   обязательно даже подключать веб-сервер), чтобы события начали отправляться. Но перед этим нужно
   создать App, Container и Trigger. Про swagger написано ниже.
2. [MessageController](src/main/java/com/mts/teta/enricher/controller/MessageController.java)
   принимает сообщение и обогащает его, делегируя
   вызов [EnricherService](src/main/java/com/mts/teta/enricher/process/EnricherService.java).
3. [EnricherService](src/main/java/com/mts/teta/enricher/process/EnricherService.java) вытаскивает
   поле `userId` и по нему пытается определить `msisdn`. Реализован вариант, когда
   связки `userId -> msisdn` просто хранятся в памяти приложения.
4. [AnalyticDB](src/main/java/com/mts/teta/enricher/db/AnalyticDB.java) предоставляет интерфейс для
   записи обогащенного сообщения в аналитиеское хранилище. В проекте есть реализация для Clickhouse.
5. [DBInitializer](src/main/java/com/mts/teta/enricher/db/DBInitializer.java) запускается при старте
   и создает в Clickhouse таблицу для записи данных, если ее там нет.
6. [liquibase-changelog.xml](src/main/resources/liquibase-changelog.xml) представляет собой
   Liquibase changelog для изменения структуры PostgreSQL.

Также, когда приложение запущено, вы можете открыть в
браузере [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html), чтобы
увидеть все доступные REST endpoints по OpenAPI спецификации. Рекомендуется отправлять запросы
именно оттуда для удобства. Для этого нужно кликнуть на нужный endpoint, и нажать `Try it out`.

## Точки расширения системы

1. Добавить новый тип [Trigger](src/main/java/com/mts/teta/tagmanager/domain/Trigger.java). Сейчас
   есть только [setInterval](https://developer.mozilla.org/en-US/docs/Web/API/setInterval). Было бы
   здорово, если бы еще отслеживались, например, события клика или скролла. Еще лучше, если
   отслеживать можно не все подряд элементы, а какие-то определенные.
2. Сейчас
   в [ContainerController.getContainerAsJsFile](src/main/java/com/mts/teta/tagmanager/controller/ContainerController.java)
   подставляется случайный `userId` из всех тех, что есть в памяти. Лучше, если разные
   коллекции `userId` будут привязаны к разным приложениям. А еще лучше, если иногда будут
   происходить ошибки. Например, подставиться `userId`, для которого `msisdn` неизвестен.
3. Связка `userId -> msisdn` сейчас хранится в памяти. Лучше, если для этого будет использоваться
   какой-то сервис для кэширования. Например, [Redis](https://redis.io/). Еще лучше, если эти связки
   будут обновляться во время работы системы. Например, какие-то сообщения уже могут содержать
   и `msisdn` и `userId`. Тогда недостающую связку можно записать в real-time.
4. События сейчас напрямую пишутся в Clickhouse. Лучше, если для этого будет использоваться
   промежуточная очередь. Например, [Kafka](https://kafka.apache.org/)
   или [RabbitMQ](https://www.rabbitmq.com/). То есть, когда `MessageController` принимает
   сообщения, он отправляет его в очередь. А отдельно есть какой-то листенер, который читает
   сообщения из этой очереди и пишет их в Clickhouse.
