package com.finconecta.fseabackend.api;

import com.finconecta.fseabackend.dto.ResponseDto;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
 * 22.01.2026 | Sebastian Francisco Belmonte Cerveró | Creación Inicial
 * -------------------------------------------------------------------------*
 */
@RestController
@RequestMapping("/api/v1/users")
public class UserApi {

    @GetMapping()
    public ResponseDto<String> getUsers() {
        ResponseDto<String> response = new ResponseDto<>(true, "Usuarios obtenidos con éxito", "Lista de usuarios", 200);
        return response;
    }


}
