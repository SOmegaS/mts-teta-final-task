package com.mts.teta.enricher;

import java.sql.Date;
import java.time.OffsetDateTime;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

/**
 * Здесь мы парсим поля, которые нам отправил TagManager,
 * с помощью javascript, который вернул ContainerController.
 * Любое поле может отсутствовать. Тогда мы не должны падать, а просто заполняем его как null
 */
@Getter
@EqualsAndHashCode
public class Message {
  private final String userId;
  private final String event;
  private final String element;
  private final String appName;
  private final Long appId;
  // время, когда сообщение было получено на сервере
  // Хорошо бы еще фиксировать время, когда клиент его отправил.
  // Для этого вам нужно будет внести изменения в JS, который возвращает ContainerController
  private final OffsetDateTime timestamp;
  private final Map<String, Object> eventParams;
  @Setter
  private String msisdn;

  public Message(Map<String, Object> rawMessage) {
    this.userId = parseString(rawMessage, "userId");
    this.event = parseString(rawMessage, "event");
    this.element = parseString(rawMessage, "element");
    this.appName = parseString(rawMessage, "app_name");
    this.appId = parseLong(rawMessage, "app_id");
    this.eventParams = parseMap(rawMessage, "event_params");
    this.timestamp = OffsetDateTime.now();
    this.msisdn = parseString(rawMessage, "msisdn");
  }

  public Message(String userId, String event, String element, String appName, Long appId, Map eventParams, OffsetDateTime timestamp, String msisdn) {
    this.userId = userId;
    this.event = event;
    this.element = element;
    this.appName = appName;
    this.appId = appId;
    this.eventParams = eventParams;
    this.timestamp = timestamp;
    this.msisdn = msisdn;
  }

  public Message(String userId, String event, String element, String appName, Long appId, String eventParams, Date timestamp, String msisdn) {
    this.userId = userId;
    this.event = event;
    this.element = element;
    this.appName = appName;
    this.appId = appId;
    this.eventParams = new HashMap<>();
    this.timestamp = OffsetDateTime.now();
    // this.eventParams = Splitter.on()eventParams;
    // this.timestamp = timestamp;
    this.msisdn = msisdn;
  }

  private static String parseString(Map<String, Object> msg, String field) {
    final var value = msg.get(field);
    if (value instanceof String str) {
      return str;
    }
    return "";
  }

  // Алгоритм здесь довольно примитивный. А что, если нам передадут число в виде строки?
  // Можно улучшить алгоритм :)
  private static Long parseLong(Map<String, Object> msg, String field) {
    final var value = msg.get(field);
    if (value instanceof Integer intValue) {
      return intValue.longValue();
    }
    if (value instanceof Long longValue) {
      return longValue;
    }
    return null;
  }

  @SuppressWarnings("unchecked")
  private static Map<String, Object> parseMap(Map<String, Object> msg, String field) {
    final var value = msg.get(field);
    if (value instanceof Map map) {
      return map;
    }
    return Collections.emptyMap();
  }
}
