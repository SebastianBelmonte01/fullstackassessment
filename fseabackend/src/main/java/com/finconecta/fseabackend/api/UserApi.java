package com.finconecta.fseabackend.api;

import com.finconecta.fseabackend.bl.UsersBl;
import com.finconecta.fseabackend.dao.User;
import com.finconecta.fseabackend.dto.ResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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

    @Autowired
    private UsersBl usersBl;

    @GetMapping()
    public ResponseDto<List<User>> getUsers() {
        ResponseDto<List<User>> response = new ResponseDto<>(
                true,
                "Usuarios obtenidos con éxito",
                usersBl.getAllUsers(),
                200);
        return response;
    }


}
