import express from 'express';
import cors from 'cors';
import pool from './config/db.js';
import productoRoutes from './routes/producto.routes.js';
import sedeRoutes from './routes/sede.routes.js';
import usuarioRoutes from './routes/usuario.routes.js';
import clienteRoutes from './routes/cliente.routes.js';
import pedidoRoutes from './routes/pedido.routes.js';
import detallePedidoRoutes from './routes/detalle_pedido.routes.js';
import inventarioRoutes from './routes/inventario.routes.js';
import reporteVentasRoutes from './routes/reporte_ventas.routes.js';
import authRoutes from './routes/auth.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/sedes', sedeRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/pedidos', pedidoRoutes);
app.use('/api/detalles-pedido', detallePedidoRoutes);
app.use('/api/inventario', inventarioRoutes);
app.use('/api/reportes-ventas', reporteVentasRoutes);

// Rutas básicas
app.get('/', (req, res) => {
  res.json({ mensaje: '¡Bienvenido a la API de Don Mamino!' });
});

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
