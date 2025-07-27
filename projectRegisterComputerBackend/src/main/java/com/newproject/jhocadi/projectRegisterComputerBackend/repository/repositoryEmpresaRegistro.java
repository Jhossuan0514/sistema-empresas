package com.newproject.jhocadi.projectRegisterComputerBackend.repository;

import com.newproject.jhocadi.projectRegisterComputerBackend.model.modelEmpresaRegistro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface repositoryEmpresaRegistro extends JpaRepository<modelEmpresaRegistro, Long> {
}
