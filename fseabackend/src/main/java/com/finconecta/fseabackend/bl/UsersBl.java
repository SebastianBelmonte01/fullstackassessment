package com.finconecta.fseabackend.bl;

import com.finconecta.fseabackend.dao.User;
import com.finconecta.fseabackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
 * 26.01.2026 | Sebastian Francisco Belmonte Cerveró | Creación Inicial
 * -------------------------------------------------------------------------*
 */
@Service
public class UsersBl {

    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }


}
