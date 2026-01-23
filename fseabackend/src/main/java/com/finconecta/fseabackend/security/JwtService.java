package com.finconecta.fseabackend.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Date;
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
 * 23.01.2026 | Sebastian Francisco Belmonte Cerveró | Creación Inicial
 * -------------------------------------------------------------------------*
 */
@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${jwt.expiration}")
    private long expirationTime;

    @Value("${jwt.issuer}" )
    private String issuer;

    private Algorithm algorithm() {
        return Algorithm.HMAC256(secretKey);
    }

    public String generateToken(UserDetails user) {
        var roles = user.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .toList();
        return JWT.create()
                .withSubject(user.getUsername())
                .withIssuer(issuer)
                .withClaim("roles", roles)
                .withIssuedAt(new Date())
                .withExpiresAt(new Date(System.currentTimeMillis() + expirationTime))
                .sign(algorithm());
    }

    public void verify(String token) {
        JWT.require(algorithm()).withIssuer(issuer).build().verify(token);
    }

    public String getUsername(String token) {
        return JWT.decode(token).getSubject();
    }

    public List<String> getRoles(String token) {
        return JWT.decode(token).getClaim("roles").asList(String.class);
    }
}
