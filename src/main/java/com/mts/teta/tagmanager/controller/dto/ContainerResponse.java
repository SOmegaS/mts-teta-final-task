package com.mts.teta.tagmanager.controller.dto;

import com.mts.teta.tagmanager.domain.Container;
import com.mts.teta.tagmanager.domain.Trigger;
import com.mts.teta.tagmanager.domain.Trigger.TriggerAttributes;
import com.mts.teta.tagmanager.domain.Trigger.TriggerType;
import java.util.List;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import lombok.Getter;

@Getter
public class ContainerResponse {

  @NotNull
  private final long id;
  @NotBlank
  private final String name;
  @NotEmpty
  private final List<TriggerResponse> triggers;

  public ContainerResponse(Container container) {
    this.id = container.getId();
    this.name = container.getName();
    this.triggers = container.getTriggers()
        .stream()
        .map(TriggerResponse::new)
        .toList();
  }

  @Getter
  public static class TriggerResponse {

    @NotNull
    private final long id;
    @NotBlank
    private final String name;
    @NotNull
    private final TriggerType type;
    @NotNull
    private final TriggerAttributes attributes;

    public TriggerResponse(Trigger trigger) {
      this.id = trigger.getId();
      this.name = trigger.getName();
      this.type = trigger.getType();
      this.attributes = trigger.getAttributes();
    }
  }
}
