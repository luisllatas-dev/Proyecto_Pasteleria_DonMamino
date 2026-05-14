import pool from '../config/db.js';

// Obtener todos los productos
export const getProductos = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Productos');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un producto por ID
export const getProductoById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM Productos WHERE id_producto = ?', [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo producto
export const createProducto = async (req, res) => {
  try {
    const { nombre_producto, descripcion, precio, stock, imagen_url, estado, tipo_producto, id_sede } = req.body;
    
    const [result] = await pool.query(
      'INSERT INTO Productos (nombre_producto, descripcion, precio, stock, imagen_url, estado, tipo_producto, id_sede) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [nombre_producto, descripcion, precio, stock, imagen_url, estado, tipo_producto, id_sede]
    );
    
    res.status(201).json({ 
      id: result.insertId, 
      mensaje: 'Producto creado exitosamente' 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un producto existente
export const updateProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_producto, descripcion, precio, stock, imagen_url, estado, tipo_producto, id_sede } = req.body;
    
    const [result] = await pool.query(
      'UPDATE Productos SET nombre_producto = ?, descripcion = ?, precio = ?, stock = ?, imagen_url = ?, estado = ?, tipo_producto = ?, id_sede = ? WHERE id_producto = ?',
      [nombre_producto, descripcion, precio, stock, imagen_url, estado, tipo_producto, id_sede, id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    
    res.json({ mensaje: 'Producto actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un producto
export const deleteProducto = async (req, res) => {
  try {
    const { id } = req.params;
    
    const [result] = await pool.query('DELETE FROM Productos WHERE id_producto = ?', [id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    
    res.json({ mensaje: 'Producto eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
