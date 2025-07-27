package com.newproject.jhocadi.projectRegisterComputerBackend.service;

import com.newproject.jhocadi.projectRegisterComputerBackend.model.modelUsuario;
import com.newproject.jhocadi.projectRegisterComputerBackend.repository.repositoryUsuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class serviceUsuario {

    private final repositoryUsuario usuarioRepo;
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public serviceUsuario(repositoryUsuario usuarioRepo) {
        this.usuarioRepo = usuarioRepo;
        this.passwordEncoder = new BCryptPasswordEncoder(); 
    }

    public void actualizarUltimoLogin(modelUsuario usuario) {
        usuarioRepo.save(usuario); // ya tiene el nuevo valor en el campo
    }
    

    public modelUsuario guardarUsuario(modelUsuario usuario) {
        usuario.setPasswordUsuario(passwordEncoder.encode(usuario.getPasswordUsuario())); // Encriptar contraseña
        return usuarioRepo.save(usuario);
    }

    public modelUsuario validarCredenciales(String nombreUsuario, String passwordPlano) {
        Optional<modelUsuario> optionalUsuario = usuarioRepo.findByNombreUsuario(nombreUsuario);
    
        if (optionalUsuario.isPresent()) {
            modelUsuario usuario = optionalUsuario.get();
            if (passwordEncoder.matches(passwordPlano, usuario.getPasswordUsuario())) {
                return usuario;
            }
        }
    
        return null; // credenciales inválidas
    }
    
    
    
}
