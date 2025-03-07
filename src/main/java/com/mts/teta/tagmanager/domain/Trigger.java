package com.mts.teta.tagmanager.domain;

import static javax.persistence.EnumType.STRING;
import static javax.persistence.FetchType.LAZY;
import static javax.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PACKAGE;
import static lombok.AccessLevel.PROTECTED;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.vladmihalcea.hibernate.type.json.JsonBinaryType;
import java.util.Map;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.Valid;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;
import org.hibernate.annotations.TypeDefs;

@Entity
@Table(name = "trigger")
@Getter
@Setter(PACKAGE)
@NoArgsConstructor(access = PROTECTED)
@TypeDefs({
    @TypeDef(name = "json", typeClass = JsonBinaryType.class)
})
public class Trigger {

  @Id
  @GeneratedValue(strategy = IDENTITY)
  private Long id;

  @Size(message = "Max trigger name size is {max} but value is ${validatedValue}", max = 100)
  private String name;

  @Enumerated(STRING)
  @NotNull(message = "Trigger type cannot be null")
  private TriggerType type;

  // У каждого типа триггера может быть свой набор атрибутов.
  // В данном примере для простоты предполагаем, что набор атрибутов у всех типов триггеров всегда одинаковый,
  // но в вашем пример может быть иначе.
  // В PostgreSQL сохраняются в колонку с типов JSONB
  @Type(type = "json")
  @Column(columnDefinition = "jsonb")
  @NotNull(message = "Trigger attributes cannot be null")
  @Valid
  private TriggerAttributes attributes;

  @ManyToOne(fetch = LAZY)
  @JoinColumn(name = "container_id")
  @NotNull(message = "App field is null but container should always reference some App")
  private Container container;

  // Тип триггера. По умолчанию добавлен только SET_INTERVAL (как функция в Javascript),
  // но вы можете добавлять свои
  public enum TriggerType {
    SET_INTERVAL,
    MOUSE_DOWN,
    MOUSE_UP,
    SCROLL,
    MOUSE_MOVE
  }

  public static Trigger newTrigger(
      String name,
      Container container,
      TriggerType type,
      TriggerAttributes triggerAttributes
  ) {
    final var trigger = new Trigger();
    trigger.setName(name);
    trigger.setContainer(container);
    trigger.setAttributes(triggerAttributes);
    trigger.setType(type);
    return trigger;
  }

  @Getter
  public static class TriggerAttributes {

    // Эти параметры выставляем, если тип триггера SET_INTERVAL
    // соответственно, если вы добавите новые типы, нужно будет для них сделать и новые параметры.
    // При этом предполагаем, что остальные в этом случае равны null
    @Valid
    private final SetTimeout setTimeout;
    @Valid
    private final MouseDown mouseDown;
    @Valid
    private final MouseUp mouseUp;
    @Valid
    private final Scroll scroll;
    @Valid
    private final MouseMove mouseMove;


    @JsonCreator
    public TriggerAttributes(
        SetTimeout setTimeout, MouseDown mouseDown, MouseUp mouseUp, Scroll scroll, MouseMove mouseMove
    ) {
      this.setTimeout = setTimeout;
      this.mouseDown = mouseDown;
      this.mouseUp = mouseUp;
      this.scroll = scroll;
      this.mouseMove = mouseMove;
    }

    public interface TemplateTrigger {
      Map<String, Object> getMessageToSend();

      int getDelayMillis();
    }

    @Getter
    public static class SetTimeout implements TemplateTrigger {

      @Min(value = 1, message = "Delay millis cannot be less than {value} but actual value is ${validatedValue}")
      private final int delayMillis;
      // Это как раз то сообщение, которое при срабатывании триггера и отправляется на бэкенд
      // и в итоге попадает в аналитическое хранилище.
      // Для простоты здесь оно задано статически. Но вы можете подумать, как сюда добавить динамику
      // При формировании итогового JS-скрипта (смотри ContainerController) сюда могут подставляться также и другие значения.
      @NotNull(message = "MessageToSend cannot be null")
      private final Map<String, Object> messageToSend;

      @JsonCreator
      public SetTimeout(
          int delayMillis,
          Map<String, Object> messageToSend
      ) {
        this.delayMillis = delayMillis;
        this.messageToSend = messageToSend;
      }
    }

    @Getter
    public static class MouseDown implements TemplateTrigger {
      @NotNull(message = "MessageToSend cannot be null")
      private final Map<String, Object> messageToSend;

      private final int delayMillis = 0;

      @JsonCreator
      public MouseDown(
              Map<String, Object> messageToSend
      ) {
        this.messageToSend = messageToSend;
      }
    }

    @Getter
    public static class MouseUp implements TemplateTrigger {
      @NotNull(message = "MessageToSend cannot be null")
      private final Map<String, Object> messageToSend;

      private final int delayMillis = 0;

      @JsonCreator
      public MouseUp(
              Map<String, Object> messageToSend
      ) {
        this.messageToSend = messageToSend;
      }
    }

    @Getter
    public static class Scroll implements TemplateTrigger {
      @NotNull(message = "MessageToSend cannot be null")
      private final Map<String, Object> messageToSend;

      @Min(value = 1, message = "Delay millis cannot be less than {value} but actual value is ${validatedValue}")
      private final int delayMillis;

      @JsonCreator
      public Scroll(
              int delayMillis,
              Map<String, Object> messageToSend
      ) {
        this.delayMillis = delayMillis;
        this.messageToSend = messageToSend;
      }
    }

    @Getter
    public static class MouseMove implements TemplateTrigger {
      @NotNull(message = "MessageToSend cannot be null")
      private final Map<String, Object> messageToSend;

      @Min(value = 1, message = "Delay millis cannot be less than {value} but actual value is ${validatedValue}")
      private final int delayMillis;

      @JsonCreator
      public MouseMove(
              int delayMillis,
              Map<String, Object> messageToSend
      ) {
        this.delayMillis = delayMillis;
        this.messageToSend = messageToSend;
      }
    }
  }
}
