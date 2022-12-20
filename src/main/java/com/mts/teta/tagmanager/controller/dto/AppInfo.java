package com.mts.teta.tagmanager.controller.dto;

import lombok.Data;

import java.util.List;

@Data
public class AppInfo {
    private Long id;
    private String name;
    private List<Long> containersId;

    public AppInfo(Long id, String name, List<Long> containersId) {
        this.id = id;
        this.name = name;
        this.containersId = containersId;
    }
}
