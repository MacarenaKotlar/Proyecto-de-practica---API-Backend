// Importaciones
import fs from "fs/promises";
import {__joiner} from "../utils/path.js";

// Guardo el archivo chatHistory.json
const HISTORY_FILE = __joiner("data", "chatHistory.json");

// Trae todos los chats del historial
const readAllChatHisotry = async () => {
    // Lee la información guardada en el archivo y la guarda en "data"
    const data = await fs.readFile(HISTORY_FILE, "utf8");

    // Convierte la información del archivo, la cual está guardada en formato JSON, en un objeto y la retorna
    return JSON.parse(data);
}

// Trae todos los chats del historial correspondientes al usuario según el id pasado por parámetro
const retrieveUserChatHistory = async (userId) => {
    // Guarda la información que trae la función readAllChatHisotry() y la guarda en "data"
    const data = await readAllChatHisotry();

    // Obtiene los chats correspondientes al usuario con el id pasado por parámetro y los retorna
    // En caso de no encontrar chats, devuelve un array vacío
    return data[userId] || [];
}

// Trae el chat según el id de chat y el id de usuario pasados por parámetros
const findUserChatById = async (userId, chatId) => {
    // Guarda la información que trae la función retrieveUserChatHistory(userId) y la guarda en "chatHistory"
    const chatHistory = await retrieveUserChatHistory(userId);

    // Si el historial de chats de ese usuario no existe, devuelve un objeto vacío y termina la función
    if(!chatHistory) return {};

    // Si el historial de chats existe, filtra el mismo para obtener el chat con el id pasado por parámetro
    // Esto devuelve un array, por más que sea solo un chat devuelto
    const chats = chatHistory.filter(chat => chat.id === chatId);

    // Si no se encontró ningún chat con ese id, devuelve un objeto vacío y termina la función
    if(!chats) return {};

    // Si encuentra un chat, al ser un array, se devuelve la primera posición del mismo, que es donde está ese chat
    return chats[0];
}

// Función para reescribir el archivo chatHistory.json, con la data pasada por parámetro
const writeBackToFile = async (data) => await fs.writeFile(HISTORY_FILE, JSON.stringify(data, null, 2));

// Crea un chat con el usuario, prompt, respuesta y fuentes pasados por parámetros
const createOneChat = async (userId, prompt, answer, sources = []) => {
    // Guarda la información que trae la función readAllChatHisotry() y la guarda en "data"
    const data = await readAllChatHisotry();

    // Crea un objeto y lo guarda en "chat"
    const chat = {
        // El id es generado con la fecha y hora del momento en el que se creó el chat + una fórmula matemática, para que sea único
        // Esto es solo un ejemplo, pueden usarse otras maneras de crear ids únicos
        id: Date.now().toString() + Math.random().toString(36).substring(2, 4),

        // El timestamp es la fecha y hora en la que se creó el chat
        timestamp: new Date().toISOString,

        // Guarda el prompt, la respuesta y las fuentes pasados por parámetro en los atributos correspondientes del chat
        prompt: prompt,
        answer: answer,
        sources: sources
    }

    // En el historial del usuario pasado por parámetro, se agrega el chat creado
    data[userId].push(chat);
    
    // Sobreescribe el archivo con la constante "data", la cual contiene el nuevo chat creado
    await writeBackToFile(data);
}

// Borra un chat según el id de usuario y el id de chat pasados por parámetros
const deleteOneChat = async (userId, chatId) => {
    // Guarda la información que trae la función readAllChatHisotry() y la guarda en "data"
    const data = await readAllChatHisotry();

    // Filtra todos los chats del usuario pasado por parámetros, para excluir el chat con el id pasado por parámetros
    data[userId] = data[userId].filter(chat => chat.id !== chatId);
    
    // Sobreescribe el archivo con la constante "data" sin el chat que se quiere borrar
    await writeBackToFile(data);

    return;
}

// Borra todos los chats de un usuario según el id de usuario pasado por parámetros
const deleteUserChatHistory = async (userId) => {
    // Guarda la información que trae la función readAllChatHisotry() y la guarda en "data"
    const data = await readAllChatHisotry();

    // Convierte el historial de chats del usuario pasado por parámetro en un array vacío, borrando el historial de ese usuario
    data[userId] = [];

    // Sobreescribe el archivo con la constante "data" sin el historial que se quiere borrar
    await writeBackToFile(data);
}

export {
    readAllChatHisotry,
    retrieveUserChatHistory,
    findUserChatById,
    writeBackToFile,
    createOneChat,
    deleteOneChat,
    deleteUserChatHistory
}