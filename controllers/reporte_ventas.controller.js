import pool from '../config/db.js';

export const getReportes = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Reportes_Ventas');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getReporteById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM Reportes_Ventas WHERE id_reporte = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Reporte no encontrado' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createReporte = async (req, res) => {
  try {
    const { total_ventas, id_sede } = req.body;
    const [result] = await pool.query(
      'INSERT INTO Reportes_Ventas (total_ventas, id_sede) VALUES (?, ?)',
      [total_ventas, id_sede]
    );
    res.status(201).json({ id: result.insertId, mensaje: 'Reporte creado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateReporte = async (req, res) => {
  try {
    const { id } = req.params;
    const { total_ventas, id_sede } = req.body;
    const [result] = await pool.query(
      'UPDATE Reportes_Ventas SET total_ventas = ?, id_sede = ? WHERE id_reporte = ?',
      [total_ventas, id_sede, id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Reporte no encontrado' });
    res.json({ mensaje: 'Reporte actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteReporte = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM Reportes_Ventas WHERE id_reporte = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Reporte no encontrado' });
    res.json({ mensaje: 'Reporte eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
