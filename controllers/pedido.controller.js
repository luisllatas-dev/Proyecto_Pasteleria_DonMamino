import pool from '../config/db.js';

export const getPedidos = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Pedidos');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPedidoById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM Pedidos WHERE id_pedido = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Pedido no encontrado' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createPedido = async (req, res) => {
  try {
    const { estado, id_cliente, id_usuario, id_sede } = req.body;
    const [result] = await pool.query(
      'INSERT INTO Pedidos (estado, id_cliente, id_usuario, id_sede) VALUES (?, ?, ?, ?)',
      [estado, id_cliente, id_usuario, id_sede]
    );
    res.status(201).json({ id: result.insertId, mensaje: 'Pedido creado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePedido = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado, id_cliente, id_usuario, id_sede } = req.body;
    const [result] = await pool.query(
      'UPDATE Pedidos SET estado = ?, id_cliente = ?, id_usuario = ?, id_sede = ? WHERE id_pedido = ?',
      [estado, id_cliente, id_usuario, id_sede, id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Pedido no encontrado' });
    res.json({ mensaje: 'Pedido actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deletePedido = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM Pedidos WHERE id_pedido = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Pedido no encontrado' });
    res.json({ mensaje: 'Pedido eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
