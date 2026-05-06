// Importaciones
import dotenv from 'dotenv';

// Carga los contenidos de archivos .env a process.env
dotenv.config();

// Obtiene el puerto con process.env y lo exporta
export const PORT = process.env.PORT;