const express = require("express");
const app = express();
const dotenv = require('dotenv')
dotenv.config();
const cors = require('cors');
app.use(cors());

const port = process.env.PORT // Recuperación de puerto para ejecución local

const { connection } = require("./config/db.js"); // Configuración de la base de datos

app.use(express.json())

// La dirección base solo contiene el mensaje "Home"
app.get('/', function (req, res) {
    res.send('Home');
});

app.use(require('./routes/routes.js'));

// Notificación del puerto utilizado
app.listen(port, () => {
 console.log(`Listening port ${port}`);
});