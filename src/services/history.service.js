// Importaciones
import { deleteOneChat, deleteUserChatHistory, retrieveUserChatHistory } from "../repositories/file.repository.js"

export const getUserHistoryService = async (userId) => retrieveUserChatHistory(userId);

export const deleteOneUserChatService = async (userId, chatId) => deleteOneChat(userId, chatId);

export const deleteAllHistoryService = async (userId) => deleteUserChatHistory(userId);