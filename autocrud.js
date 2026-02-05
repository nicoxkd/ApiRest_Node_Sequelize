import fs from "fs";
import path from "path";

const modelsPath = "./models";
const controllersBasePath = "./controllers/base";
const routesPath = "./routes";
const servicesPath = "./services";

// Crear carpetas necesarias
fs.mkdirSync(controllersBasePath, { recursive: true });
fs.mkdirSync(routesPath, { recursive: true });
fs.mkdirSync(servicesPath, { recursive: true });

// Leemos todos los modelos (incluido Log.js)
const models = fs.readdirSync(modelsPath)
    .filter(f => f.endsWith(".js") && f !== "init-models.js");

for (const modelFile of models) {
    const modelName = path.basename(modelFile, ".js");
    // El nombre de la clase será el del archivo capitalizado (ej: productos -> Productos)
    const modelClass = modelName.charAt(0).toUpperCase() + modelName.slice(1);

    // --- 1. GENERAR SERVICIO ---
    // CORRECCIÓN: Quitamos las llaves { } del import porque ahora usamos export default
    const serviceContent = `import ${modelClass} from "../models/${modelFile}";

export const getAll = async () => await ${modelClass}.findAll();
export const getById = async (id) => await ${modelClass}.findByPk(id);
export const create = async (data) => await ${modelClass}.create(data);
export const update = async (id, data) => {
    const item = await ${modelClass}.findByPk(id);
    return item ? await item.update(data) : null;
};
export const remove = async (id) => {
    const item = await ${modelClass}.findByPk(id);
    return item ? await item.destroy() : null;
};`;

    fs.writeFileSync(`${servicesPath}/${modelName}Service.js`, serviceContent);

    // --- 2. GENERAR CONTROLADOR BASE ---
    const controllerContent = `import * as service from "../../services/${modelName}Service.js";

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
};`;

    fs.writeFileSync(`${controllersBasePath}/${modelName}BaseController.js`, controllerContent);

    // --- 3. GENERAR RUTA ---
    const routeContent = `import express from "express";
import * as controller from "../controllers/base/${modelName}BaseController.js";
const router = express.Router();

router.get("/", controller.obtenerTodos);
router.get("/:id", controller.obtenerUno);
router.post("/", controller.crear);
router.put("/:id", controller.actualizar);
router.delete("/:id", controller.eliminar);

export default router;`;

    fs.writeFileSync(`${routesPath}/${modelName}Routes.js`, routeContent);
    console.log(`✅ CRUD generado para: ${modelName}`);
}