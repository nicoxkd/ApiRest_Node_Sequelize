import express from "express";
import * as controller from "../controllers/base/LogBaseController.js";
const router = express.Router();

router.get("/", controller.obtenerTodos);
router.get("/:id", controller.obtenerUno);
router.post("/", controller.crear);
router.put("/:id", controller.actualizar);
router.delete("/:id", controller.eliminar);

export default router;