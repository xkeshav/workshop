/* eslint-disable no-undef */
import express from 'express';
import path from 'path';

const app = express();

const BASE_DIR = path.join(__dirname, 'src');
const HTML_DIR = path.join(BASE_DIR, 'html');
const port = 3000;

//console.log({ BASE_DIR, HTML_DIR });

const router = express.Router();

app.use((_, res, next) => {
  let now = new Date();
  console.log('Time: ', now.toUTCString());
  next();
});

router.get('/', (_, res) => {
  res.sendFile(`${HTML_DIR}/index.html`);
});

router.get('/index', (_, res) => {
  res.sendFile(`${HTML_DIR}/index.html`);
});

router.get('/named', (_, res) => {
  console.log('typing....');
  res.sendFile(`${HTML_DIR}/named-color.html`);
});

router.get('/mix', (_, res) => {
  res.sendFile(`${HTML_DIR}/color-mix.html`);
});

router.get('/wall', (_, res) => {
  res.sendFile(`${HTML_DIR}/color-wall.html`);
});

router.get('/space', (_, res) => {
  res.sendFile(`${HTML_DIR}/color-space.html`);
});

router.get('/relative', (_, res) => {
  res.sendFile(`${HTML_DIR}/relative-color.html`);
});

router.get('/syntax', (_, res) => {
  res.sendFile(`${HTML_DIR}/color-syntax.html`);
});

router.get('/hsl', (_, res) => {
  res.sendFile(`${HTML_DIR}/hsl.html`);
});

// error handling middleware

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.use('/', express.static(BASE_DIR));

app.use('/', router);

app.listen(port, () => {
  console.log(' listening port ' + port);
});
