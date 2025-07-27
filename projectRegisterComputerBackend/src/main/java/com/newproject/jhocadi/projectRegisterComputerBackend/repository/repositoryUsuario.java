package com.newproject.jhocadi.projectRegisterComputerBackend.repository;

import com.newproject.jhocadi.projectRegisterComputerBackend.model.modelUsuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface repositoryUsuario extends JpaRepository<modelUsuario, Integer> {
    
    Optional<modelUsuario> findByNombreUsuario(String nombreUsuario);
    


    
}
