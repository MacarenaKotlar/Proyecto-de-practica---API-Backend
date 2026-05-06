// Defino la lógica que va a ir dentro del método GET del enrutador del proxy y exporto la función
export const pokemonProxy = async (request, response) => {
    // Obtiene el endpoint enviado por los parámetros de la request, usando destructuring
    const {endpoint} = request.params;
    
    // Guarda la url de la pokeapi pasándole el endpoint para obtener datos según el valor del mismo
    const url = `https://pokeapi.co/api/v2/${endpoint}`;

    try {
        // Llama a la pokeapi con el url declarado anteriormente
        const res = await fetch(url);

        // Obtiene el json de la respuesta
        const data = await res.json();

        response
            .status(200)
            .json({data});
        
        return
    } catch (error) {
        response
            .status(501)
            .json({errorMessage: error.message});
    }
}