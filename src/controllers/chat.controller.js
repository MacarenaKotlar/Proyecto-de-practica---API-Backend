// Importaciones
import {__joiner} from "../utils/path.js";
import fs from "fs/promises";

// Defino la lógica que va a ir dentro del método POST del enrutador del chat y exporto la función
export const chatController = async (request, response) => {

    // Obtiene el prompt enviado por el cuerpo de la request
    const {prompt} = request.body;

    // Lee el archivo mocksGeminiResponse.json, lo pasa a formato utf8 y guarda el contenido en la constante "data"
    const data = await fs.readFile(__joiner("data", "mocksGeminiResponse.json"), 'utf8');

    // Parseo data para que pueda devolver la respuesta correctamente
    const geminiApi = await JSON.parse(data);

    response
        .status(200)
        .json(
            {respuesta: geminiApi[prompt]}
        );
    
    return
}