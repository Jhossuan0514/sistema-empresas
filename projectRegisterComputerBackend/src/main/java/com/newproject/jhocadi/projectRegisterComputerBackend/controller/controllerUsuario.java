package com.newproject.jhocadi.projectRegisterComputerBackend.controller;

import com.newproject.jhocadi.projectRegisterComputerBackend.model.modelUsuario;
import com.newproject.jhocadi.projectRegisterComputerBackend.repository.repositoryUsuario;
import com.newproject.jhocadi.projectRegisterComputerBackend.service.serviceUsuario;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "http://localhost:4200")
public class controllerUsuario {

    private final repositoryUsuario usuarioRepo;
    private final serviceUsuario usuarioService;

    public controllerUsuario(repositoryUsuario usuarioRepo , serviceUsuario usuarioService) {
        this.usuarioService = usuarioService;
        this.usuarioRepo = usuarioRepo;
    }

    @GetMapping
    public List<modelUsuario> listarUsuarios() {
        return usuarioRepo.findAll();
    }

    @GetMapping("/{id}")
    public Optional<modelUsuario> obtenerUsuarioPorId(@PathVariable Integer id) {
        return usuarioRepo.findById(id);
    }

   

    @PostMapping
    public modelUsuario guardarUsuario(@RequestBody modelUsuario usuario) {
        // usa el service para que encripte antes de salvar
        return usuarioService.guardarUsuario(usuario);
    }

    @PutMapping("/{id}")
    public modelUsuario actualizarUsuario(@PathVariable Integer id, @RequestBody modelUsuario usuario) {
        usuario.setIdUsuario(id);
        return usuarioRepo.save(usuario);
    }

    @DeleteMapping("/{id}")
    public void eliminarUsuario(@PathVariable Integer id) {
        usuarioRepo.deleteById(id);
    }
}
