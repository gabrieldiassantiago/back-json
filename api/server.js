const express = require('express');
const path = require('path');

const app = express();
const port = 3333;

// Defina o caminho para o arquivo JSON
const jsonFilePath = path.join(__dirname,  'server.json');

app.get('/tags', (req, res) => {
  // Envie o arquivo JSON como resposta
  res.sendFile(jsonFilePath, (err) => {
    if (err) {
      console.error('Erro ao enviar o arquivo JSON:', err);
      res.status(500).send('Erro interno do servidor');
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor Express está rodando na porta ${port}`);
});
