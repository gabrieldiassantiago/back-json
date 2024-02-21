const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

const SERVER_JSON_PATH = path.join(__dirname, 'server.json');

// Rota para obter as tags

app.get('/tags', (req, res) => {
  // Leitura do arquivo JSON
  fs.readFile(SERVER_JSON_PATH, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erro interno do servidor');
      return;
    }

    try {
      const tagsData = JSON.parse(data);
      const tags = tagsData.tags;
      
      // Aplicar filtros, se houver
      const { title, _per_page } = req.query;
      let filteredTags = tags;
      if (title) {
        filteredTags = tags.filter(tag => tag.title === title);
      }

      // Limitar o número de resultados por página, se `_per_page` estiver presente
      const perPage = _per_page ? parseInt(_per_page) : undefined;
      if (perPage) {
        filteredTags = filteredTags.slice(0, perPage);
      }

      res.json(filteredTags);
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro interno do servidor');
    }
  });
});


// Inicialização do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor Express em execução na porta ${PORT}`);
});
