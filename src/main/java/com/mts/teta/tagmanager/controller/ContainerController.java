package com.mts.teta.tagmanager.controller;

import static java.nio.charset.StandardCharsets.UTF_8;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mts.teta.enricher.cache.UserInfoRepository;
import com.mts.teta.tagmanager.controller.dto.ContainerCreatedResponse;
import com.mts.teta.tagmanager.controller.dto.ContainerResponse;
import com.mts.teta.tagmanager.domain.Container;
import com.mts.teta.tagmanager.domain.Trigger;
import com.mts.teta.tagmanager.repository.AppRepository;
import com.mts.teta.tagmanager.repository.ContainerRepository;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;
import java.util.stream.Collectors;
import javax.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/container")
@RequiredArgsConstructor
@CrossOrigin("*")
@Validated
public class ContainerController {

  private final AppRepository appRepository;
  private final ContainerRepository containerRepository;
  private final ObjectMapper objectMapper;
  private final UserInfoRepository userInfoRepository;

  // получить список контейнеров вместе с их триггерами по ID-шнику приложения
  // GET /api/container/app/1
  @GetMapping("/app/{appId}")
  public List<ContainerResponse> getContainers(@NotNull @PathVariable long appId) {
    return containerRepository.findAllByAppId(appId)
        .stream()
        .map(ContainerResponse::new)
        .toList();
  }

  // Создать контейнер для заданного приложения
  // POST /api/container/app/1?name=containerName
  @PostMapping("/app/{appId}")
  @Transactional
  public ContainerCreatedResponse createContainer(
      @PathVariable long appId,
      @RequestParam String name
  ) {
    final var app = appRepository.findById(appId).orElseThrow();
    final var container = containerRepository.save(Container.newContainer(name, app));
    return new ContainerCreatedResponse(container.getId());
  }

  @GetMapping(value = "/{containerId}/jsFile", produces = "text/javascript;charset=UTF-8")
  @Transactional
  @SneakyThrows
  public byte[] getContainerAsJsFile(@NotNull @PathVariable long containerId) {
    final var container = containerRepository.findById(containerId).orElseThrow();
    var jsFile = container.getTriggers()
        .stream()
        .map(this::triggerToJsString)
        .collect(Collectors.joining(";\n"));
    Path filePath = Path.of("src/main/resources/js_templates/cookie.js");
    String content = Files.readString(filePath);
    jsFile = content + '\n' + jsFile;
    return jsFile.getBytes(UTF_8);
  }

  @SneakyThrows
  private String triggerToJsString(Trigger trigger) {
    final var userIds = userInfoRepository.findAllUserIds();
    switch (trigger.getType()) {
      case SET_INTERVAL -> {
        final var attributes = trigger.getAttributes().getSetTimeout();
        Path filePath = Path.of("src/main/resources/js_templates/set_interval.js");
        String content = Files.readString(filePath);
        return fillJsTemplate(content, attributes, userIds, trigger);
      }
      case MOUSE_DOWN -> {
        final var attributes = trigger.getAttributes().getMouseDown();
        Path filePath = Path.of("src/main/resources/js_templates/mouse_down.js");
        String content = Files.readString(filePath);
        return fillJsTemplate(content, attributes, userIds, trigger);
      }
      case MOUSE_UP -> {
        final var attributes = trigger.getAttributes().getMouseUp();
        Path filePath = Path.of("src/main/resources/js_templates/mouse_up.js");
        String content = Files.readString(filePath);
        return fillJsTemplate(content, attributes, userIds, trigger);
      }
      case SCROLL -> {
        final var attributes = trigger.getAttributes().getScroll();
        Path filePath = Path.of("src/main/resources/js_templates/scroll.js");
        String content = Files.readString(filePath);
        return fillJsTemplate(content, attributes, userIds, trigger);
      }
      case MOUSE_MOVE -> {
        final var attributes = trigger.getAttributes().getMouseMove();
        Path filePath = Path.of("src/main/resources/js_templates/mouse_move.js");
        String content = Files.readString(filePath);
        return fillJsTemplate(content, attributes, userIds, trigger);
      }
      default -> throw new UnsupportedOperationException(
        "Указанный тип триггера еще не поддерживается: " + trigger.getType()
      );
    }
  }

  @SneakyThrows
  private String fillJsTemplate(
          String content,
          Trigger.TriggerAttributes.TemplateTrigger attributes,
          List<String> userIds,
          Trigger trigger
  ) {
    content = content.replaceAll("\\{triggerName}", trigger.getName())
            .replaceAll(
                    "\\{attributes}",
                    // Здесь мы преобразуем Map<String, Object> в JSON, который и подставится в JSON.stringify
                    objectMapper.writeValueAsString(
                            attributes.getMessageToSend()
                    )
            )
            .replaceAll("\\{appName}", trigger.getContainer().getApp().getName())
            .replaceAll("\\{appId}", String.valueOf(trigger.getContainer().getApp().getId()));
    if (attributes.getDelayMillis() != 0) {
      content = content.replaceAll("\\{delayMillis}", String.valueOf(attributes.getDelayMillis()));
    }
    return content;
  }
}
