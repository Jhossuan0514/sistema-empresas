package com.newproject.jhocadi.projectRegisterComputerBackend.controller;

import com.newproject.jhocadi.projectRegisterComputerBackend.model.modelRolUsuario;
import com.newproject.jhocadi.projectRegisterComputerBackend.repository.repositoryRolUsuario;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/roles")
@CrossOrigin(origins = "http://localhost:4200")
public class controllerRolUsuario {

    private final repositoryRolUsuario rolRepo;

    public controllerRolUsuario(repositoryRolUsuario rolRepo) {
        this.rolRepo = rolRepo;
    }

    @PostMapping
    public modelRolUsuario crearRol(@RequestBody modelRolUsuario rol) {
        return rolRepo.save(rol);
    }

    @GetMapping
    public List<modelRolUsuario> listarRoles() {
        return rolRepo.findAll();
    }
}
