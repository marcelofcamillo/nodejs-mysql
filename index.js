import express from 'express';
import exphbs from 'express-handlebars';
import pool from './db/conn.js';

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

  const sql = `INSERT INTO books (??, ??) VALUES (?, ?)`;
  const values = ['title', 'pageqty', title, pageqty];

  pool.query(sql, values, (err) => {
    if (err) {
      console.log(err);
      return;
    }

    res.redirect('/books');
  });
});

app.get('/books', (req, res) => {
  const sql = 'SELECT * FROM books';

  pool.query(sql, (err, data) => {
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

  const sql = `SELECT * FROM books WHERE ?? = ?`;
  const values = ['id', id];

  pool.query(sql, values, (err, data) => {
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

  const sql = `SELECT * FROM books WHERE ?? = ?`;
  const values = ['id', id];

  pool.query(sql, values, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    const book = data[0];

    res.render('editbook', { book });
  });
});

app.post('/books/updateBook', (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  const pageqty = req.body.pageqty;

  const sql = `UPDATE books SET ?? = ?, ?? = ? WHERE ?? = ?`;
  const values = ['title', title, 'pageqty', pageqty, 'id', id];

  pool.query(sql, values, (err) => {
    if (err) {
      console.log(err);
      return;
    }

    res.redirect('/books');
  });
});

app.post('/books/remove/:id', (req, res) => {
  const id = req.params.id;

  const sql = `DELETE FROM books WHERE ?? = ?`;
  const values = ['id', id];

  pool.query(sql, values, (err) => {
    if (err) {
      console.log(err);
      return;
    }

    res.redirect('/books');
  });
});

app.listen(3000, () => {
  console.log('API started!');
});
