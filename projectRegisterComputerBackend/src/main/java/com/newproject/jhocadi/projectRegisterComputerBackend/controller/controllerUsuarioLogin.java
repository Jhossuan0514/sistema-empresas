package com.newproject.jhocadi.projectRegisterComputerBackend.controller;

import com.newproject.jhocadi.projectRegisterComputerBackend.dtos.LoginRequestDTO;
import com.newproject.jhocadi.projectRegisterComputerBackend.model.modelUsuario;
import com.newproject.jhocadi.projectRegisterComputerBackend.security.JwtUtil;
import com.newproject.jhocadi.projectRegisterComputerBackend.service.serviceUsuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class controllerUsuarioLogin {

    @Autowired
    private serviceUsuario service;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDTO loginDTO) {
        modelUsuario usuario = service.validarCredenciales(
            loginDTO.getNombreUsuario(),
            loginDTO.getPasswordUsuario()
        );

        if (usuario == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales inválidas");
        }

        String token = jwtUtil.generateToken(usuario.getNombreUsuario());

       
       usuario.setUltimoLogin(LocalDateTime.now());
       service.actualizarUltimoLogin(usuario); // lo crearemos ahora

        return ResponseEntity.ok().body(Map.of(
            "token", token,
            "usuario", usuario.getNombreUsuario(),
            "rol", usuario.getRol().getNombreRol()
        ));
    }
}
