package com.mts.teta.enricher.controller;

import static org.springframework.http.MediaType.TEXT_PLAIN_VALUE;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mts.teta.enricher.Message;
import com.mts.teta.enricher.db.AnalyticDB;
import com.mts.teta.enricher.process.EnricherService;
import java.util.Map;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Validated
public class MessageController {
  private final EnricherService enricherService;
  private final AnalyticDB analyticDB;
  private final ObjectMapper objectMapper;
  @Autowired
  @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
  private KafkaTemplate<String, String> kafkaTemplate;

  public void sendMessage(Message message) throws JsonProcessingException {
    String msg = objectMapper.writeValueAsString(message);
    kafkaTemplate.send("enriched_messages", msg);
  }

  @SuppressWarnings("unchecked")
  @SneakyThrows
  @PostMapping(value = "/api/message", consumes = TEXT_PLAIN_VALUE)
  // Важно, что здесь мы принимаем любой JSON, а не какой-то конкретный формат.
  // Потому что со временем формат сообщений может меняться, да и клиенты нашей платформы
  // могут отправлять нам не структированные сообщения. Мы все равно должны их все принимать и не отвечать ошибкой.
  public void acceptMessage(@NotBlank @RequestBody String rawMessage) {
    final var message = new Message(objectMapper.readValue(rawMessage, Map.class), false);
    final var enrichedMessage = enricherService.enrich(message);
    sendMessage(enrichedMessage);
  }
}
