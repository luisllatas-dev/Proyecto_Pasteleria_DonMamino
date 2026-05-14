import pool from '../config/db.js';

export const getClientes = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Clientes');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getClienteById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM Clientes WHERE id_cliente = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Cliente no encontrado' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createCliente = async (req, res) => {
  try {
    const { nombre_cliente, email, telefono, direccion_envio } = req.body;
    const [result] = await pool.query(
      'INSERT INTO Clientes (nombre_cliente, email, telefono, direccion_envio) VALUES (?, ?, ?, ?)',
      [nombre_cliente, email, telefono, direccion_envio]
    );
    res.status(201).json({ id: result.insertId, mensaje: 'Cliente creado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_cliente, email, telefono, direccion_envio } = req.body;
    const [result] = await pool.query(
      'UPDATE Clientes SET nombre_cliente = ?, email = ?, telefono = ?, direccion_envio = ? WHERE id_cliente = ?',
      [nombre_cliente, email, telefono, direccion_envio, id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Cliente no encontrado' });
    res.json({ mensaje: 'Cliente actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM Clientes WHERE id_cliente = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Cliente no encontrado' });
    res.json({ mensaje: 'Cliente eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
