import express from 'express';
import exphbs from 'express-handlebars';
import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.render('home');
});

app.post('/books/insertBook', (req, res) => {
  const title = req.body.title;
  const pageqty = req.body.pageqty;

  const sql = `INSERT INTO books (title, pageqty) VALUES ('${title}', '${pageqty}')`;

  conn.query(sql, (err) => {
    if (err) console.log(err);

    res.redirect('/');
  });
});

const conn = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

conn.connect((err) => {
  if (err) console.log(err);

  console.log('Conectado ao MySQL!');
  app.listen(3000);
});
