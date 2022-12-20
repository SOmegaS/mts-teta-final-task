package com.mts.teta.tagmanager.controller.dto;

import lombok.Data;

import java.util.List;

@Data
public class ContainerInfo {
    private Long id;
    private String name;
    private Long appId;
    private List<Long> triggersId;

    public ContainerInfo(Long id, String name, Long appId, List<Long> triggersId) {
        this.id = id;
        this.name = name;
        this.appId = appId;
        this.triggersId = triggersId;
    }
}
