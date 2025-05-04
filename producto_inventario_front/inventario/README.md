# 🛠️ Inventario de Productos - Kata Beginner Challenge 2

Este proyecto es una aplicación web de inventario de productos desarrollada como parte del reto **"Kata Beginner - Challenge 2 | Product Inventory"**. Permite **listar, agregar, editar y eliminar productos**, con validaciones tanto en frontend como backend.

---

## 🚀 Tecnologías utilizadas

### 🔧 Backend
- **Java 24**
- **Spring Boot 3.4.5**
  - Spring Web
  - Spring Data JPA
  - Spring Validation
  - H2 Database
- **JUnit** para pruebas unitarias
- Proyecto inicializado con **Spring Initializr**

### 💻 Frontend
- **React**
- **Reactstrap** para estilos con Bootstrap
- **SweetAlert2** para mensajes de confirmación y alertas
- **Jest** para pruebas unitarias

### 🛠️ Herramientas de desarrollo
- **Visual Studio Code** como editor principal
- **Postman** para probar la API REST

---

## 🗃️ Funcionalidades principales

- ✅ Listar todos los productos
- ➕ Agregar un nuevo producto
- ✏️ Editar un producto existente
- ❌ Eliminar un producto
- ✅ Validaciones de formulario (campos requeridos, restricciones)
- 💾 Persistencia en base de datos H2 en memoria

---

## ⚙️ Cómo ejecutar el proyecto

### 🔙 Backend

1. Clona el repositorio.
2. Abre la carpeta del proyecto en Visual Studio Code o tu IDE favorito.
3. Ejecuta la clase `ProductoInventarioApplication.java` (con anotación `@SpringBootApplication`).
4. Accede a la consola H2 si lo deseas:  
   - URL: `http://localhost:8080/h2-console`
   - JDBC URL: `jdbc:h2:mem:testdb`
5. La API quedará expuesta en: `http://localhost:8080/api/productos`

### 🔜 Frontend

1. Navega a la carpeta del frontend (`cd frontend` si está en una carpeta separada).
2. Instala dependencias:
   ```bashñ
   npm install
