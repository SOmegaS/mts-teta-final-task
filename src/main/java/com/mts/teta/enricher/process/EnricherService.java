package com.mts.teta.enricher.process;

import com.mts.teta.enricher.Message;
import com.mts.teta.enricher.cache.UserInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
@RequiredArgsConstructor
public class EnricherService {
  private final UserInfoRepository userInfoRepository;

  // Обогащение очень простое: смотрит только на поле userId.
  // Можно ли сделать его поинтересней? Например, добавить несколько полей, которые можно проверять.
  public Message enrich(Message message) {
    final var msisdn = userInfoRepository.findMsisdnByUserId(message.getUserId()).orElse("");
    if (!message.getMsisdn().isEmpty() && !Objects.equals(message.getMsisdn(), msisdn)) {
      userInfoRepository.updateMsisdn(message.getUserId(), message.getMsisdn());
      return message;
    }
    message.setMsisdn(msisdn);
    return message;
  }
}
