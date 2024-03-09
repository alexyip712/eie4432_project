import express from 'express';
import session from 'express-session';
import route from './login.js';
import mongostore from 'connect-mongo';
import client from './dbclient.js';

const app = express();
var port = 8080;

app.use(
  session({
    secret: 'eie4432_project',
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true },
    store: mongostore.create({
      client,
      dbName: 'projectdb',
      collectionName: 'session',
    }),
  })
);

app.get('/', (req, res) => {
  res.redirect('/index.html');
});

app.use('/auth', route);

app.use(express.json());

app.get('/', (req, res) => {
  if (req.session.logged) {
    res.redirect('/index.html');
  } else {
    res.redirect('/login.html');
  }
});

app.use('/', express.static('static'));

app.listen(port, () => {
  console.log(Date().toLocaleString('en-HK'));
  console.log('Server started at http://127.0.0.1:8080');
});
