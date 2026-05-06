// Importaciones
import app from './app.js';
import { PORT } from './src/config/config.js';

// Se llama a la app. Por parámetros se le pasa el puerto y una callback, la cual en este caso llama a un conole.log()
app.listen(
    PORT,
    () => console.log(`Corriendo en el puerto: http://localhost:${PORT}`)
);