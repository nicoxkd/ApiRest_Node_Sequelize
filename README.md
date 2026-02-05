# API Rest: MVC Reducido + AutoCRUD (Sequelize)

Proyecto Node.js que genera automáticamente capas de **Servicios**, **Controladores Base** y **Rutas**, permitiendo la extensión manual mediante herencia.

## Puesta en Marcha Rápida

### 1. Instalación
```bash
npm install

```
### 2. Base de Datos

Abre tu gestor MySQL (phpMyAdmin o Workbench).

Crea la base de datos api_database y las tablas ejecutando este script SQL:

SQL
CREATE DATABASE IF NOT EXISTS api_database;
USE api_database;

CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    precio FLOAT NOT NULL,
    stock INT DEFAULT 0,
    createdAt DATETIME, updatedAt DATETIME
);

CREATE TABLE logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    log VARCHAR(255),
    createdAt DATETIME, updatedAt DATETIME
);

INSERT INTO productos (nombre, precio, stock, createdAt, updatedAt) VALUES ('Demo', 100, 10, NOW(), NOW());
Nota: La configuración de conexión está definida en config/db.js (Usuario: root / Sin contraseña).

### 3. Ejecución
Genera el código automático y lanza el servidor:

```bash
node autocrud.js
npm run dev
```

### 4. Endpoints (Ejemplo: Productos)
GET    /productos        Ver todos

POST   /productos        Crear nuevo

PUT    /productos/:id    Actualizar

DELETE /productos/:id    Eliminar
