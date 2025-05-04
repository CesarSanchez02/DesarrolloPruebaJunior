# 🛠️ Inventario de Productos - Kata Beginner Challenge 2

Este proyecto es una aplicación web de inventario de productos desarrollada como parte del reto **"Kata Beginner - Challenge 2 | Product Inventory"**. Permite listar, agregar, editar y eliminar productos, con validaciones tanto en frontend como backend.

## 🚀 Tecnologías utilizadas

### 🔧 Backend
- **Java 24**
- **Spring Boot 3.4.5**
- **Spring Web**
- **Spring Data JPA**
- **Spring Validation**
- **H2 Database** (base de datos en memoria)
- **JUnit** para pruebas unitarias
- Proyecto inicializado con **Spring Initializr**

### 💻 Frontend
- **React**
- **Reactstrap** para estilos con **Bootstrap**
- **SweetAlert2** para mensajes de confirmación y alertas
- **Vite** como bundler y servidor de desarrollo
- **Axios** para realizar solicitudes HTTP
- **Bootstrap 5** para diseño responsive
- **Jest** para pruebas unitarias
- **TypeScript** para el desarrollo en el frontend

### 🛠️ Herramientas de desarrollo
- **Visual Studio Code** como editor principal
- **Postman** para probar la API REST

## 🗃️ Funcionalidades principales
- ✅ **Listar todos los productos**
- ➕ **Agregar un nuevo producto**
- ✏️ **Editar un producto existente**
- ❌ **Eliminar un producto**
- ✅ **Validaciones de formulario** (campos requeridos, restricciones)
- 💾 **Persistencia en base de datos H2 en memoria**

## ⚙️ Cómo ejecutar el proyecto

### 🔙 Backend
1. Clona el repositorio del proyecto.
2. Abre la carpeta del proyecto en **Visual Studio Code** o tu IDE favorito.
3. Ejecuta la clase **`ProductoInventarioApplication.java`** (con la anotación `@SpringBootApplication`).
4. Si deseas, puedes acceder a la consola H2 para ver la base de datos en memoria:
   - **URL**: `http://localhost:8080/h2-console`
   - **JDBC URL**: `jdbc:h2:mem:testdb`
5. La API quedará expuesta en: `http://localhost:8080/api/productos`

### 🔜 Frontend
1. Navega a la carpeta del frontend (si está en una carpeta separada, usa `cd producto_inventario_front`).
2. Instala las dependencias con:
   ```bash
   npm install
3.Ejecuta el servidor de desarrollo con:

    ```bash
    npm run dev
📂 Estructura del Proyecto
Backend (Spring Boot)
src/main/java/com/example/producto_inventario: Contiene el código fuente del backend, incluyendo las entidades, controladores y servicios de Spring Boot.

src/main/resources/application.properties: Configuración de la base de datos H2 y otras propiedades del backend.

Frontend (React)
frontend/package.json: Contiene las dependencias y scripts necesarios para el frontend, incluyendo React, Reactstrap, y SweetAlert2.

frontend/src/: Contiene los componentes y la lógica del frontend desarrollada con React.

frontend/vite.config.ts: Configuración del bundler Vite.

🔧 Dependencias principales
Backend (pom.xml)
spring-boot-starter-data-jpa: Para el manejo de la base de datos y JPA.

spring-boot-starter-web: Para exponer la API REST.

spring-boot-starter-validation: Para validaciones de formularios.

h2: Base de datos en memoria para pruebas.

spring-boot-devtools: Para mejorar el ciclo de desarrollo.

Frontend (package.json)
axios: Para realizar solicitudes HTTP al backend.

bootstrap: Para diseño responsive utilizando Bootstrap 5.

react: Framework para construir la interfaz de usuario.

reactstrap: Componentes de React basados en Bootstrap.

vite: Bundler y servidor de desarrollo.

typescript: Para el desarrollo en TypeScript.

jest: Herramienta para pruebas unitarias.

🔄 Contribución
Si deseas contribuir a este proyecto, por favor abre un pull request con tus cambios y mejoras. ¡Toda ayuda es bienvenida!

📄 Licencia

Este proyecto está bajo la Licencia MIT.
