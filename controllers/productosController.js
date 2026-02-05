import * as Base from "./base/productosBaseController.js";

// Así es como se aplica la herencia/extensión que pide el Anexo II
export const obtenerProductos = async (req, res) => {
    try {
        // Aquí es donde pondrías tu "lógica personalizada" si el profesor te la pide
        console.log("🧠 Cargando productos desde el controlador extendido...");
        
        // Llamas al método que generó el AutoCRUD en la carpeta base
        await Base.obtenerTodos(req, res); 
    } catch (error) {
        res.status(500).json({ mensaje: "Error", error });
    }
};

// Para el resto de métodos, los exportas directamente del base para no repetir código
export const crearProducto = Base.crear;
export const obtenerProducto = Base.obtenerUno;
export const actualizarProducto = Base.actualizar; // Asegúrate de que el nombre coincida con tu autocrud
export const eliminarProducto = Base.eliminar;