// Importaciones
import { Router } from "express";
import { chatController } from "../controllers/chat.controller.js";

// Se crea el enrutador
const router = Router();

// Request POST para enviar un prompt al chat y recibir una respuesta
router.post("/chat", chatController);

export {router as chatRouter};