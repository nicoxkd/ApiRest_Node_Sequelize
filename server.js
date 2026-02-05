import express from 'express';
import productosRoutes from './routes/productosRoutes.js';

const app = express();
app.use(express.json()); // Para que el servidor entienda el cuerpo de los POST (JSON)

// Registrar las rutas
app.use('/productos', productosRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});