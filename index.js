import express from 'express';
import exphbs from 'express-handlebars';
import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('home');
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
