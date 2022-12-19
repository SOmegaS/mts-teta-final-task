package com.mts.teta.enricher.db;

import com.clickhouse.jdbc.ClickHouseDataSource;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mts.teta.enricher.Message;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

/**
 * Реализация, которая сохраняет полученные сообщения в Clickhouse.
 */
@Service
@RequiredArgsConstructor
public class ClickhouseAnalyticDB implements AnalyticDB {
  private final ClickhouseWrapper wrapper;
  private final ObjectMapper objectMapper;

  private Message stringToMessage(String msg) throws JsonProcessingException {
    return objectMapper.readValue(msg, Message.class);
  }

  @KafkaListener(topics = "enriched_messages", groupId = "app.1")
  @SneakyThrows
  public void persistMessage(String msg) {
    Message message = stringToMessage(msg);
    final var dataSource = wrapper.getDataSource();
    try (final var connection = dataSource.getConnection()) {
      final var statement = connection.prepareStatement(""" 
          INSERT INTO db.event(user_id, event, element, app_name, app_id, event_params, server_timestamp, msisdn)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)""");
      // в стандарте JDBC отчет параметров начинается с 1
      statement.setString(1, message.getUserId());
      statement.setString(2, message.getEvent());
      statement.setString(3, message.getElement());
      statement.setString(4, message.getAppName());
      statement.setLong(5, message.getAppId());
      statement.setString(
          6,
          objectMapper.writeValueAsString(message.getEventParams())
      );
      statement.setTimestamp(
          7,
          Timestamp.from(
              message.getTimestamp().toInstant()
          )
      );
      statement.setString(8, message.getMsisdn());
      statement.execute();
    } catch (SQLException e) {
      throw new AnalyticDBException(
          "Unexpected exception during connection to Clickhouse",
          e
      );
    } catch (JsonProcessingException e) {
      throw new AnalyticDBException(
          "Unexpected error during JSON serialization", e
      );
    }
  }

  public List<Message> GetMessages() {
    List<Message> messages = new ArrayList<>();
    final var dataSource = wrapper.getDataSource();
    try (final var connection = dataSource.getConnection()) {
      final var statement = connection.prepareStatement("""
          SELECT * FROM db.event""");
      ResultSet resultSet = statement.executeQuery();
      while (resultSet.next()) {
        messages.add(new Message(
                resultSet.getString("user_id"),
                resultSet.getString("event"),
                resultSet.getString("element"),
                resultSet.getString("app_name"),
                resultSet.getLong("app_id"),
                resultSet.getString("event_params"),
                resultSet.getDate("server_timestamp"),
                resultSet.getString("msisdn")));
      }
    } catch (SQLException e) {
      throw new AnalyticDBException(
              "Unexpected exception during connection to Clickhouse",
              e
      );
    }
    return messages;
  }

  @Configuration
  static class Config {

    @Bean
    @SneakyThrows
    public ClickhouseWrapper clickhouseWrapper(
        @Value("${clickhouse.url}") String url,
        @Value("${clickhouse.username}") String username,
        @Value("${clickhouse.password}") String password,
        @Value("${clickhouse.client-name}") String clientName
    ) {
      final var properties = new Properties();
      properties.setProperty("user", username);
      properties.setProperty("password", password);
      properties.setProperty("client_name", clientName);
      return new ClickhouseWrapper(
          new ClickHouseDataSource(
              url,
              properties
          )
      );
    }
  }
}
