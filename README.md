# 🖥️ Computer & Electronic – Sistema de Registro de Empresas ( En estado de Desarrollo)

Aplicación **Fullstack** desarrollada para **Computer & Electronic** con el objetivo de gestionar empresas, fichas técnicas de equipos (computadores, impresoras, etc.) y control de usuarios con roles administrativos y técnicos.

---
PaginaComputerRegistro/
├── projectRegisterComputerBackend/   # Backend en Spring Boot
└── projectRegisterComputerFrontend/  # Frontend en Angular
---

##  **Tecnologías utilizadas**
### **Frontend**
- Angular 20 (Standalone Components)
- Angular Material
- SCSS con diseño tipo tarjetas y animaciones suaves
- JWT Authentication (consumo desde backend)
- Netlify (para despliegue)

### **Backend**
- Spring Boot 3
- MySQL (base de datos)
- JPA/Hibernate
- Spring Security + JWT
- Control de acceso por roles (ADMIN, TECNICO)

---

## **Características principales**
- **Login con autenticación JWT** y roles (ADMIN/TECNICO).
- **CRUD completo de empresas** (registro, listado, edición y eliminación).
- **Dashboard dinámico** con accesos a funcionalidades principales.
- **Módulo de fichas técnicas** para equipos.
- **Diseño responsive y profesional** con Angular Material y SCSS.

---
## 🌐 Demo
[Ver aplicación en Netlify](https://fantastic-faloodeh-414f5f.netlify.app/)
---

##  **Instalación y ejecución**

### **Backend (Spring Boot)**
1.Configura la base de datos en el archivo application.properties.
2. Ve a la carpeta:
   ```bash
   cd projectRegisterComputerBackend
   Ejecuta:
./mvnw spring-boot:run   ---> El servidor se levantará en http://localhost:8080.

### **Backend (Spring Boot)**
1. Nos dirigimos a la carpeta donde esta el Frontend ---> cd projectRegisterComputerFrontend
2. Instalamos dependecias ---> npm install
3. Ejecutamos ---> ng serve
4. La app estara disponible en http://localhost:4200

👤 Autor
Jhossuant Cabezas DIaz






