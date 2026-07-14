/*
    ACLARACIÓN:
    En la capa de services, se realiza la lógica de negocio
    En este caso no es necesario, pero Ander puso la capa services igual para que estén todas las capas que se usan normalmente
*/

// Importaciones
import { deleteOneChat, deleteUserChatHistory, retrieveUserChatHistory } from "../repositories/file.repository.js"

export const getUserHistoryService = async (userId) => retrieveUserChatHistory(userId);

export const deleteOneUserChatService = async (userId, chatId) => deleteOneChat(userId, chatId);

export const deleteAllHistoryService = async (userId) => deleteUserChatHistory(userId);