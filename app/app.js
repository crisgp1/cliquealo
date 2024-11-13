const express = require('express');
const app = express();
const port = 3000;

// Ruta de inicio
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

// Otra ruta de ejemplo
app.get('/about', (req, res) => {
  res.send('This is the about page');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
