-- 1. Crear la base de datos
CREATE DATABASE IF NOT EXISTS don_mamino_db;

-- 2. Usar la base de datos creada
USE don_mamino_db;

-- 3. Tabla Sedes: Almacena la información de las diferentes ubicaciones físicas de la empresa Don Mamino.
CREATE TABLE Sedes (
  id_sede INT PRIMARY KEY AUTO_INCREMENT,  -- Identificador único para cada sede
  nombre_sede VARCHAR(255) NOT NULL,  -- Nombre de la sede
  direccion VARCHAR(255) NOT NULL,  -- Dirección de la sede
  telefono VARCHAR(15) NOT NULL,  -- Teléfono de contacto de la sede
  email VARCHAR(100) NOT NULL UNIQUE  -- Correo electrónico de contacto de la sede
);

-- 4. Tabla Usuarios: Almacena los usuarios del sistema (administradores, vendedores, etc.), con su sede asociada.
CREATE TABLE Usuarios (
  id_usuario INT PRIMARY KEY AUTO_INCREMENT,  -- Identificador único del usuario
  nombre_usuario VARCHAR(255) NOT NULL,  -- Nombre completo del usuario
  email VARCHAR(100) NOT NULL UNIQUE,  -- Correo electrónico del usuario
  rol VARCHAR(50) NOT NULL,  -- Rol del usuario (ej. administrador, vendedor)
  contraseña VARCHAR(255) NOT NULL,  -- Contraseña (encriptada)
  id_sede INT,  -- Relación con la sede del usuario
  FOREIGN KEY (id_sede) REFERENCES Sedes(id_sede) ON DELETE SET NULL  -- Relación con la tabla Sedes
);

-- 5. Tabla Clientes: Almacena los datos de los clientes que realizan pedidos.
CREATE TABLE Clientes (
  id_cliente INT PRIMARY KEY AUTO_INCREMENT,  -- Identificador único del cliente
  nombre_cliente VARCHAR(255) NOT NULL,  -- Nombre completo del cliente
  email VARCHAR(100) NOT NULL UNIQUE,  -- Correo electrónico del cliente
  telefono VARCHAR(15) NOT NULL,  -- Teléfono de contacto del cliente
  direccion_envio VARCHAR(255) NOT NULL  -- Dirección de envío del cliente
);

-- 6. Tabla Productos: Almacena la información de los productos, incluyendo tipo y visibilidad para la venta.
CREATE TABLE Productos (
  id_producto INT PRIMARY KEY AUTO_INCREMENT,  -- Identificador único del producto
  nombre_producto VARCHAR(255) NOT NULL,  -- Nombre del producto
  descripcion TEXT NOT NULL,  -- Descripción del producto
  precio DECIMAL(10,2) NOT NULL,  -- Precio del producto
  stock INT NOT NULL DEFAULT 0,  -- Cantidad disponible en inventario
  imagen_url VARCHAR(255) NOT NULL,  -- URL de la imagen del producto
  estado ENUM('activo', 'inactivo') DEFAULT 'activo',  -- Estado del producto (activo o inactivo)
  tipo_producto ENUM('vendible', 'insumo') DEFAULT 'vendible',  -- Tipo de producto (vendible o insumo)
  id_sede INT,  -- Relación con la sede
  FOREIGN KEY (id_sede) REFERENCES Sedes(id_sede) ON DELETE CASCADE  -- Relación con la tabla Sedes
);

-- 7. Tabla Pedidos: Almacena la información de los pedidos realizados por los clientes.
CREATE TABLE Pedidos (
  id_pedido INT PRIMARY KEY AUTO_INCREMENT,  -- Identificador único del pedido
  fecha_pedido DATETIME DEFAULT CURRENT_TIMESTAMP,  -- Fecha y hora del pedido
  estado ENUM('procesando', 'en preparación', 'enviado', 'entregado') DEFAULT 'procesando',  -- Estado del pedido
  id_cliente INT,  -- Relación con el cliente que realizó el pedido
  id_usuario INT,  -- Relación con el usuario que gestionó el pedido
  id_sede INT,  -- Relación con la sede que gestionó el pedido
  FOREIGN KEY (id_cliente) REFERENCES Clientes(id_cliente) ON DELETE CASCADE,  -- Relación con la tabla Clientes
  FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario) ON DELETE SET NULL,  -- Relación con la tabla Usuarios
  FOREIGN KEY (id_sede) REFERENCES Sedes(id_sede) ON DELETE CASCADE  -- Relación con la tabla Sedes
);

-- 8. Tabla Detalle_Pedido: Almacena los productos específicos dentro de cada pedido.
CREATE TABLE Detalle_Pedido (
  id_detalle INT PRIMARY KEY AUTO_INCREMENT,  -- Identificador único del detalle
  id_pedido INT,  -- Relación con el pedido
  id_producto INT,  -- Relación con el producto
  cantidad INT NOT NULL,  -- Cantidad del producto en el pedido
  precio_unitario DECIMAL(10,2) NOT NULL,  -- Precio unitario del producto en el momento de la compra
  FOREIGN KEY (id_pedido) REFERENCES Pedidos(id_pedido) ON DELETE CASCADE,  -- Relación con la tabla Pedidos
  FOREIGN KEY (id_producto) REFERENCES Productos(id_producto) ON DELETE CASCADE  -- Relación con la tabla Productos
);

-- 9. Tabla Inventario: Controla el stock de productos en cada sede.
CREATE TABLE Inventario (
  id_inventario INT PRIMARY KEY AUTO_INCREMENT,  -- Identificador único del inventario
  id_producto INT,  -- Relación con el producto
  id_sede INT,  -- Relación con la sede
  cantidad_actual INT NOT NULL,  -- Cantidad actual disponible en inventario
  cantidad_minima INT NOT NULL,  -- Cantidad mínima antes de generar alerta de reposición
  FOREIGN KEY (id_producto) REFERENCES Productos(id_producto) ON DELETE CASCADE,  -- Relación con la tabla Productos
  FOREIGN KEY (id_sede) REFERENCES Sedes(id_sede) ON DELETE CASCADE  -- Relación con la tabla Sedes
);

-- 10. Tabla Reportes_Ventas: Almacena los reportes de ventas generados para cada sede.
CREATE TABLE Reportes_Ventas (
  id_reporte INT PRIMARY KEY AUTO_INCREMENT,  -- Identificador único del reporte
  fecha_reporte DATETIME DEFAULT CURRENT_TIMESTAMP,  -- Fecha del reporte
  total_ventas DECIMAL(10,2) NOT NULL,  -- Total de ventas en el periodo
  id_sede INT,  -- Relación con la sede
  FOREIGN KEY (id_sede) REFERENCES Sedes(id_sede) ON DELETE CASCADE  -- Relación con la tabla Sedes
);
