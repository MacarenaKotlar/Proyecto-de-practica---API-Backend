// Importaciones
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import {__joiner} from './src/utils/path.js';
import { proxyRouter } from './src/routes/proxy.router.js';
import { chatRouter } from './src/routes/chat.router.js';

// Se crea la app
const app = express();

/* Morgan: Middleware que permite ver el estado de los accesos al servidor desde la terminal en donde se levantó el servidor */

// Se define el tipo de Morgan a usar (common)
const morganType = ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length]';

/*
    app.use: Se usa para definir funciones middleware en la ruta indicada.
    ES SECUENCIAL, EL ORDEN EN EL QUE SE LLAMA A ESTE MÉTODO AFECTA EL ORDEN EN EL QUE SE EJECUTAN LAS FUNCIONES MIDDLEWARE
*/

// Se implementa Morgan con su tipo en la app
app.use(morgan(morganType));

/* CORS: Middleware de seguridad que permite que los servidores controlen qué origenes pueden acceder a sus recursos */

// Se implementa CORS
app.use(cors());

// Permite utilizar statics (en este caso, archivos .html y .css) definidos en el proyecto
app.use(express.static(__joiner("statics")));

// Permite leer los cuerpos de las requests
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

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

// Llamo al proxy
app.use("/proxy", proxyRouter);

// Llamo al chat de mi api
app.use("/api/v1", chatRouter);

// Request con USE para lanzar un error al entrar a cualquier endpoint inexistente
// DEBE DEFINIRSE COMO ÚLTIMA REQUEST DEBIDO AL FACTOR SECUENCIAL DE USE
// SI SE DEFINE ANTES DE OTRA REQUEST, NO SE TOMARÁ EN CUENTA ESTA ÚLTIMA Y AL QUERER ENTRAR EN ELLA APARECERÁ EL RESULTADO DE ESTE MÉTODO
app.use((request, response) => {
    response
        .status(404)
        .json({
            error: "No encontrado"
        })
})

export default app;