const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('server.json'); // Use o arquivo server.json como seu banco de dados
const middlewares = jsonServer.defaults();

server.use(middlewares);
// Defina uma rota específica para /tags
server.get('/tags', (req, res) => {
  res.jsonp({ tags: router.db.get('tags').value() });
});

server.listen(3000, () => {
  console.log('JSON Server is running');
});
