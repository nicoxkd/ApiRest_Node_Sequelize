import * as service from "../../services/productosService.js";

export const obtenerTodos = async (req, res) => {
    try { res.json(await service.getAll()); }
    catch (error) { res.status(500).json({ error: error.message }); }
};

export const obtenerUno = async (req, res) => {
    try {
        const item = await service.getById(req.params.id);
        if (!item) return res.status(404).json({ mensaje: "No encontrado" });
        res.json(item);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

export const crear = async (req, res) => {
    try { res.status(201).json(await service.create(req.body)); }
    catch (error) { res.status(500).json({ error: error.message }); }
};

export const actualizar = async (req, res) => {
    try {
        const item = await service.update(req.params.id, req.body);
        if (!item) return res.status(404).json({ mensaje: "No encontrado" });
        res.json(item);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

export const eliminar = async (req, res) => {
    try {
        const exito = await service.remove(req.params.id);
        if (!exito) return res.status(404).json({ mensaje: "No encontrado" });
        res.json({ mensaje: "Eliminado correctamente" });
    } catch (error) { res.status(500).json({ error: error.message }); }
};