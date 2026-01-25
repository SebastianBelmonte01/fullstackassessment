package com.finconecta.fseabackend.api;

import com.finconecta.fseabackend.dto.LoginDto;
import com.finconecta.fseabackend.security.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

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
 * 23.01.2026 | Sebastian Francisco Belmonte Cerveró | Creación Inicial
 * -------------------------------------------------------------------------*
 */
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/v1/auth")
public class AuthApi {

    private final AuthenticationConfiguration authConfig;

    private final JwtService jwtService;

    @Autowired
    PasswordEncoder passwordEncoder;

    public AuthApi(AuthenticationConfiguration authConfig, JwtService jwtService) {
        this.authConfig = authConfig;
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody LoginDto req) {
        System.out.println("Login attempt for user: " + req.getUsername());
        System.out.println(passwordEncoder.encode("12313"));
        System.out.println("Password sent = " + req.getPassword());
        AuthenticationManager authManager = authConfig.getAuthenticationManager();

        Authentication auth = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        req.getUsername(), req.getPassword()
                )
        );


        UserDetails user = (UserDetails) auth.getPrincipal();
        String token = jwtService.generateToken(user);

        return Map.of("token", token);
    }
}
