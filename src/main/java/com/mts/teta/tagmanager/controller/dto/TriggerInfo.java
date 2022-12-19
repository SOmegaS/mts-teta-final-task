package com.mts.teta.tagmanager.controller.dto;

import lombok.Data;

@Data
public class TriggerInfo {
    private Long id;
    private String name;
    private String type;
    private String attributes;
    private Long containerId;

    public TriggerInfo(Long id, String name, String type, String attributes, Long containerId) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.attributes = attributes;
        this.containerId = containerId;
    }
}
