const express = require('express');
const app = express();
const port = 3001;
const router = require('./routes/index');
const conexao = require('./structure/conection');
const tables = require('./structure/tables');
const cors = require('cors');

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
};

app.use(cors(corsOptions));

router(app, express);
tables.init(conexao);

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, (error) => {
  if (error) {
    console.log("Error starting server");
    return;
  }
  console.log(`Server running on http://localhost:${port}`);
});
