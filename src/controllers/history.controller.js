// Importaciones
import { deleteAllHistoryService, deleteOneUserChatService, getUserHistoryService } from "../services/history.service.js";

const historyGetAllController = async (request, response) => {
    const {userId} = request.body.user;

    const historyChats = await getUserHistoryService(userId);

    response
        .status(200)
        .json({
            status: "ok",
            message: `Historial pedido hasta la fecha: ${Date.now().toLocaleString()}`,
            payload: historyChats
        });
}
const historyDeleteOneController = async (request, response) => {
    const {userId} = request.body.user;
    const {chatId} = request.params;

    const deletedChat = await deleteOneUserChatService(userId, chatId);

    if(!deletedChat){
        return response
                    .status(404)
                    .json({
                        error: "No se encontró el chat"
                    });
    }

    const {prompt: deletedPrompt} = deletedChat;

    response
        .status(200)
        .json({
            status: "ok",
            deletedPrompt,
            message: "Se borró el chat"
        });
}
const historyDeleteAllController = async (request, response) => {
    const {userId} = request.body.user;
    
    await deleteAllHistoryService(userId);
    
    response
        .status(200)
        .json({
            status: "ok",
            message: "Se borró el historial"
        });
}

export {historyGetAllController, historyDeleteOneController, historyDeleteAllController};