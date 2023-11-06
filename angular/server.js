const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors()); // Use o middleware cors

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'rafael23',
  database: 'usuarios'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Conectado ao banco de dados MySQL');
});

// Rotas para manipular dados
app.get('/', (req, res) => {
    res.send('Bem-vindo ao meu servidor Node.js!');
  });

// Exemplo de rota para inserir um novo usuário
app.post('/api/usuarios', (req, res) => {
    const { nome, email, senha } = req.body;
    const query = `INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)`;
    db.query(query, [nome, email, senha], (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message }); // Envia uma resposta JSON em caso de erro
      } else {
        res.json({ message: 'Usuário adicionado com sucesso!' }); // Envia uma resposta JSON em caso de sucesso
      }
    });
  });
  

// Inicie o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
