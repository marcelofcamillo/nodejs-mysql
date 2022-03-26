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
    if (err) {
      console.log(err);
      return;
    }

    res.redirect('/books');
  });
});

app.get('/books', (req, res) => {
  const sql = 'SELECT * FROM books';

  conn.query(sql, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    const books = data;

    res.render('books', { books });
  });
});

app.get('/books/:id', (req, res) => {
  const id = req.params.id;

  const sql = `SELECT * FROM books WHERE id = ${id}`;

  conn.query(sql, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    const book = data[0];

    res.render('book', { book });
  });
});

app.get('/books/edit/:id', (req, res) => {
  const id = req.params.id;

  const sql = `SELECT * FROM books WHERE id = ${id}`;

  conn.query(sql, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    const book = data[0];

    console.log(book);

    res.render('editbook', { book });
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
