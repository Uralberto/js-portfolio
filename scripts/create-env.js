const fs = require('fs'); // file sistem es un módulo de node que nos permite trabajar con el sistema operativo y poder guardar o enviar datos, según sea necesario.

fs.writeFileSync('./.env', `API=${process.env.API}\n`);
// Aquí estamos escribiendo un archivo .env dentro del servidor. Va a correr a nivel del servidor.
