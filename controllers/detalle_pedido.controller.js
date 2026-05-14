import pool from '../config/db.js';

export const getDetalles = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Detalle_Pedido');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getDetalleById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM Detalle_Pedido WHERE id_detalle = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Detalle no encontrado' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createDetalle = async (req, res) => {
  try {
    const { id_pedido, id_producto, cantidad, precio_unitario } = req.body;
    const [result] = await pool.query(
      'INSERT INTO Detalle_Pedido (id_pedido, id_producto, cantidad, precio_unitario) VALUES (?, ?, ?, ?)',
      [id_pedido, id_producto, cantidad, precio_unitario]
    );
    res.status(201).json({ id: result.insertId, mensaje: 'Detalle creado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateDetalle = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_pedido, id_producto, cantidad, precio_unitario } = req.body;
    const [result] = await pool.query(
      'UPDATE Detalle_Pedido SET id_pedido = ?, id_producto = ?, cantidad = ?, precio_unitario = ? WHERE id_detalle = ?',
      [id_pedido, id_producto, cantidad, precio_unitario, id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Detalle no encontrado' });
    res.json({ mensaje: 'Detalle actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteDetalle = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM Detalle_Pedido WHERE id_detalle = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Detalle no encontrado' });
    res.json({ mensaje: 'Detalle eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
