// Importaciones
import { deleteAllHistoryService, deleteOneUserChatService, getUserHistoryService } from "../services/history.service.js";

// Obtiene todos los historiales de chats de un usuario
const historyGetAllController = async (request, response) => {
    // Obtiene el id de usuario del objeto user, sacado del cuerpo de la request
    const {userId} = request.body.user;

    // Obtiene el historial de chats del usuario
    const historyChats = await getUserHistoryService(userId);

    // Como respuesta, envía un estado 200 (OK) y el historial del usuario hasta la fecha
    response
        .status(200)
        .json({
            status: "ok",
            message: `Historial pedido hasta la fecha: ${Date.now().toLocaleString()}`,
            payload: historyChats
        });
}

// Borra un chat
const historyDeleteOneController = async (request, response) => {
    // Obtiene el id de usuario del objeto user, sacado del cuerpo de la request
    const {userId} = request.body.user;

    // Obtiene el id del chat de los parámetros de la request
    const {chatId} = request.params;

    // Guarda el chat eliminado
    const deletedChat = await deleteOneUserChatService(userId, chatId);

    // Si el chat no existe, retorna una respuesta con el estado 404 (Not Found) y un mensaje de error
    if(!deletedChat){
        return response
                    .status(404)
                    .json({
                        error: "No se encontró el chat"
                    });
    }

    // En caso de encontrarlo, obtiene el prompt del chat eliminado 
    const {prompt: deletedPrompt} = deletedChat;

    // Como respuesta, envía un estado 200 (OK), el prompt del chat borrado y un mensaje
    response
        .status(200)
        .json({
            status: "ok",
            deletedPrompt,
            message: "Se borró el chat"
        });
}

// Borra todos los chats de un usuario
const historyDeleteAllController = async (request, response) => {
    // Obtiene el id de usuario del objeto user, sacado del cuerpo de la request
    const {userId} = request.body.user;
    
    // Borra los chats del usuario
    await deleteAllHistoryService(userId);
    
    // Como respuesta, envía un estado 200 (OK) y un mensaje
    response
        .status(200)
        .json({
            status: "ok",
            message: "Se borró el historial"
        });
}

export {historyGetAllController, historyDeleteOneController, historyDeleteAllController};