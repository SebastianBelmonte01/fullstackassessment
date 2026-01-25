package com.finconecta.fseabackend.logging;

import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Map;

/**
 * -------------------------------------------------------------------------*
 * Información General
 * -------------------------------------------------------------------------*
 * Código de Aplicación:
 * Código de Objeto:
 * Descripción:
 * Author Prog.: Sebastian Francisco Belmonte Cerveró
 * -------------------------------------------------------------------------*
 * Fecha | Author | Comentario
 * 25.01.2026 | Sebastian Francisco Belmonte Cerveró | Creación Inicial
 * -------------------------------------------------------------------------*
 */
@Service
public class LogService {

    private final ApplicationLogRepository repository;

    public LogService(ApplicationLogRepository repository) {
        this.repository = repository;
    }

    public void info(String message, Map<String, Object> metadata) {
        save("INFO", message, metadata);
    }

    public void error(String message, Map<String, Object> metadata) {
        save("ERROR", message, metadata);
    }

    private void save(String level, String message, Map<String, Object> metadata) {
        ApplicationLog log = new ApplicationLog();
        log.setLevel(level);
        log.setMessage(message);
        log.setService("myfinconecta-service");
        log.setTimestamp(Instant.now());
        log.setMetadata(metadata);

        repository.save(log);
    }
}
