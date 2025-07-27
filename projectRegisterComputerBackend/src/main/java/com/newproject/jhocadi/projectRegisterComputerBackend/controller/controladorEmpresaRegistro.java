package com.newproject.jhocadi.projectRegisterComputerBackend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Optional;


import com.newproject.jhocadi.projectRegisterComputerBackend.model.modelEmpresaRegistro;
import com.newproject.jhocadi.projectRegisterComputerBackend.repository.repositoryEmpresaRegistro;

import java.util.List;

@RestController
@RequestMapping("/api/empresas")
@CrossOrigin(origins = "http://localhost:4200")


public class controladorEmpresaRegistro {

    private final repositoryEmpresaRegistro empresaRepo;

    public controladorEmpresaRegistro(repositoryEmpresaRegistro empresaRepo) {
        this.empresaRepo = empresaRepo;
    }

    

    @GetMapping
    public List<modelEmpresaRegistro> listarEmpresas() {
        return empresaRepo.findAll();
    }

    @PostMapping
    public modelEmpresaRegistro guardarEmpresa(@RequestBody modelEmpresaRegistro empresa) {
        return empresaRepo.save(empresa);
    }

    @GetMapping("/{id}")
    public modelEmpresaRegistro obtenerEmpresa(@PathVariable Long id) {
        Optional<modelEmpresaRegistro> empresa = empresaRepo.findById(id);
        return empresa.orElse(null);
    }

    @PutMapping("/{id}")
    public modelEmpresaRegistro actualizarEmpresa(@PathVariable Long id, @RequestBody modelEmpresaRegistro empresaActualizada) {
        return empresaRepo.findById(id).map(empresa -> {
            empresa.setNombreEmpresa(empresaActualizada.getNombreEmpresa());
            empresa.setNitEmpresa(empresaActualizada.getNitEmpresa());
            empresa.setDireccionEmpresa(empresaActualizada.getDireccionEmpresa());
            empresa.setCiudadEmpresa(empresaActualizada.getCiudadEmpresa());
            empresa.setCorreoEmpresa(empresaActualizada.getCorreoEmpresa());
            empresa.setTelefonoEmpresa(empresaActualizada.getTelefonoEmpresa());
            return empresaRepo.save(empresa);
        }).orElse(null);
    }

    @DeleteMapping("/{id}")
    public void eliminarEmpresa(@PathVariable Long id) {
        empresaRepo.deleteById(id);
    }

  

    
}
