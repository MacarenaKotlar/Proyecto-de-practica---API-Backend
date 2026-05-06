// Importaciones
import { Router } from "express";
import { historyDeleteAllController, historyDeleteOneController, historyGetAllController } from "../controllers/history.controller.js";

// Se crea el enrutador
const router = Router();

// Guardo la url del historial en una constante
const historyUrl = "/history";

// Request GET para mostrar todos los chats del historial
router.get(historyUrl, historyGetAllController);

// Request DELETE para borrar un chat del historial según su id
router.delete(`${historyUrl}/:chatId`, historyDeleteOneController);

// Request DELETE para borrar todos los chats del historial
router.delete(historyUrl, historyDeleteAllController);

// Exporta el router con el nombre definido después del "as"
export {router as historyRouter};