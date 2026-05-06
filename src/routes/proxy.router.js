// Importaciones
import { Router } from "express";
import { pokemonProxy } from "../controllers/proxy.controller.js";

// Se crea el enrutador
const router = Router();

// Request GET para obtener datos de una API externa para la capa de proxy con el endpoint pasado por parámetros
router.get("/pokemon/:endpoint", pokemonProxy);

// Exporta el router con el nombre definido después del "as"
export {router as proxyRouter};