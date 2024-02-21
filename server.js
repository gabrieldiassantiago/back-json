const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('server.json'); // Use o arquivo server.json como seu banco de dados
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

// Defina uma rota específica para /tags
server.get('/tags', (req, res) => {
  // Obtenha os dados dos tags do arquivo server.json
  const tags = router.db.get('tags').value();
  res.json(tags);
});

// Defina a porta para o servidor ou use uma porta fornecida pelo ambiente
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
