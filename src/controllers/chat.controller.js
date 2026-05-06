// Importaciones
import { createOneChat } from "../repositories/file.repository.js";
import {__joiner} from "../utils/path.js";
import fs from "fs/promises";

// Defino la lógica que va a ir dentro del método POST del enrutador del chat y exporto la función
export const chatController = async (request, response) => {

    const {userId} = request.body.user;

    // Obtiene el prompt enviado por el cuerpo de la request
    const {prompt} = request.body.user;

    // Obtiene el archivo mocksGeminiResponse.json y lo guarda
    const MOCK_FILE = __joiner("data", "mocksGeminiResponse.json");

    // Lee el archivo mocksGeminiResponse.json, lo pasa a formato utf8 y guarda el contenido en la constante "data"
    const data = await fs.readFile(MOCK_FILE, 'utf8');

    // Parseo data para que pueda devolver la respuesta correctamente
    const geminiApi = await JSON.parse(data);

    await createOneChat(userId, prompt, geminiApi[prompt], ['pagina12.v5']);

    response
        .status(200)
        .json(
            {respuesta: geminiApi[prompt]}
        );
    
    return;
}