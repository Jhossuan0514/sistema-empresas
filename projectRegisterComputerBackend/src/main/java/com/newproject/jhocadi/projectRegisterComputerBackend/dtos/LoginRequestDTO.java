package com.newproject.jhocadi.projectRegisterComputerBackend.dtos;

import lombok.Data;

@Data
public class LoginRequestDTO {
    private String nombreUsuario;
    private String passwordUsuario;
}
