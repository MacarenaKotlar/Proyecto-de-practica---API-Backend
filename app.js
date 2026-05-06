// Importaciones
import express, { response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import {__joiner} from './src/utils/path.js';

// Se crea la app
const app = express();

/* Morgan: Middleware que permite ver el estado de los accesos al servidor desde la terminal en donde se levantó el servidor */

// Se define el tipo de Morgan a usar (common)
const morganType = ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length]';

// Se implementa Morgan con su tipo en la app
app.use(morgan(morganType));

/* CORS: Middleware de seguridad que permite que los servidores controlen qué origenes pueden acceder a sus recursos */

// Se implementa CORS
app.use(cors());

// Permite utilizar statics (en este caso, archivos .html y .css) definidos en el proyecto
app.use(express.static(__joiner("statics")));

// Request GET para que, al acceder a la página principal, se envíe el arhivo index.html
app.get("/", (request, response) => {
    response.sendFile(
        __joiner("statics", "index.html")
    );
});

// Request GET para ver si el servidor está activo o no
app.get("/health", (request, response) => {
    response
        .status(200)
        .json({
            status: "ok",
            timestamp: new Date().toISOString()
        });
});

/* app.use: Se usa para atrapar cualquier endpoint indefinido y para implementar dependencias */

// Request con USE para lanzar un error al entrar a cualquier endpoint inexistente
app.use((request, response) => {
    response
        .status(404)
        .json({
            error: "No encontrado"
        })
})

export default app;