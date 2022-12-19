package com.mts.teta.tagmanager.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mts.teta.enricher.Message;
import com.mts.teta.enricher.db.ClickhouseAnalyticDB;
import com.mts.teta.tagmanager.controller.dto.AppInfo;
import com.mts.teta.tagmanager.controller.dto.ContainerInfo;
import com.mts.teta.tagmanager.controller.dto.TriggerInfo;
import com.mts.teta.tagmanager.domain.App;
import com.mts.teta.tagmanager.domain.Container;
import com.mts.teta.tagmanager.domain.Trigger;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class StatisticsController {
    @PersistenceContext
    EntityManager entityManager;

    private final ObjectMapper objectMapper;

    @Autowired
    private final ClickhouseAnalyticDB clickhouseAnalyticDB;

    @GetMapping("/actionstable")
    public List<Message> getEvents() {
        return clickhouseAnalyticDB.GetMessages();
    }

    @GetMapping("/appsstable")
    @Transactional
    public List<AppInfo> getApps() {
        var apps = entityManager.createQuery("SELECT app FROM App app", App.class)
                .setMaxResults(10)
                .getResultList();
        List<AppInfo> appsInfo = new ArrayList<>();
        for (App app : apps) {
            List<Long> containersId = new ArrayList<>();
            for (Container container : app.getContainers()) {
                containersId.add(container.getId());
            }
            appsInfo.add(new AppInfo(app.getId(), app.getName(), containersId));
        }
        return appsInfo;
    }

    @GetMapping("/containerstable")
    @Transactional
    public List<ContainerInfo> getContainers() {
        var containers = entityManager.createQuery("SELECT container FROM Container container", Container.class)
                .setMaxResults(10)
                .getResultList();
        List<ContainerInfo> containersInfo = new ArrayList<>();
        for (Container container : containers) {
            List<Long> triggersId = new ArrayList<>();
            for (Trigger trigger : container.getTriggers()) {
                triggersId.add(trigger.getId());
            }
            containersInfo.add(new ContainerInfo(container.getId(), container.getName(), container.getApp().getId(), triggersId));
        }
        return containersInfo;
    }

    @GetMapping("/triggersstable")
    @Transactional
    @SneakyThrows
    public List<TriggerInfo> getTriggers() {
        var triggers = entityManager.createQuery("SELECT trigger FROM Trigger trigger", Trigger.class)
                .setMaxResults(10)
                .getResultList();
        List<TriggerInfo> triggersInfo = new ArrayList<>();
        for (Trigger trigger : triggers) {
            triggersInfo.add(new TriggerInfo(
                    trigger.getId(),
                    trigger.getName(),
                    trigger.getType().toString(),
                    objectMapper.writeValueAsString(trigger.getAttributes()),
                    trigger.getContainer().getId()
            ));
        }
        return triggersInfo;
    }
}
