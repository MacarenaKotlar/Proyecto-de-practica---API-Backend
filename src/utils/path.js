// Importaciones
import path from 'path';

// Obtiene el directorio actual donde se está trabajando
const __dirname = process.cwd();

/*
--- Alternativa usando fileURLToPath ---

// Importaciones
import { fileURLToPath } from 'url';
import path from 'path';

// Obtiene la ruta del archivo en el que está parado actualmente (con el archivo incluído)
const __filename = fileURLToPath(import.meta.url);

// Obtiene la ruta del archivo/carpeta enviado por parámetros.
// Al estar path.dirname anidado, va haciendo pasos hacia atrás en la ruta, según la cantidad de path.dirname que se aniden
const __dirname = path.dirname(path.dirname(path.dirname(__filename)));
*/

// Función que modulariza el método path.join con n parámetros
const __joiner = (...params) => path.join(__dirname, ...params);

export {__joiner};