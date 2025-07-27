package com.newproject.jhocadi.projectRegisterComputerBackend.repository;

import com.newproject.jhocadi.projectRegisterComputerBackend.model.modelRolUsuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface repositoryRolUsuario extends JpaRepository<modelRolUsuario, Integer> {
}
