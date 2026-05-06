// Importaciones
import fs from "fs/promises";
import {__joiner} from "../utils/path.js";

const HISTORY_FILE = __joiner("data", "chatHistory.json");

const readAllChatHisotry = async () => {
    const data = await fs.readFile(HISTORY_FILE, "utf8");
    return JSON.parse(data);
}

const retrieveUserChatHistory = async (userId) => {
    const data = await readAllChatHisotry();
    return data[userId] || [];
}

const findUserChatById = async (userId, chatId) => {
    const chatHistory = await retrieveUserChatHistory(userId);

    if(!chatHistory) return {};

    const chats = chatHistory.filter(chat => chat.id === chatId);

    if(!chats) return {};

    return chats[0];
}

const writeBackToFile = async (data) => await fs.writeFile(HISTORY_FILE, JSON.stringify(data, null, 2));

const createOneChat = async (userId, prompt, answer, sources = []) => {
    const data = await readAllChatHisotry();

    const chat = {
        id: Date.now().toString() + Math.random().toString(36).substring(2, 4),
        timestamp: new Date().toISOString,
        prompt: prompt,
        answer: answer,
        sources: sources
    }

    data[userId].push(chat);
    
    await writeBackToFile(data);
}

const deleteOneChat = async (userId, chatId) => {
    const data = await readAllChatHisotry();

    data[userId] = data[userId].filter(chat => chat.id !== chatId);
    
    await writeBackToFile(data);

    return;
}

const deleteUserChatHistory = async (userId) => {
    const data = await readAllChatHisotry();
    data[userId] = [];

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