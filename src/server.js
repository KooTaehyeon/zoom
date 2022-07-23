import { log } from 'console';
import express from 'express';
import http from 'http';
import WebSocket from 'ws';
const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use('/public', express.static(__dirname + '/public'));
app.get('/', (req, res) => res.render('home'));
app.get('/*', (rep, res) => res.redirect('/'));
const handleListen = () => console.log(`Listening on http://localhost:3004`);
// app.listen(3004, handleListen);

const server = http.createServer(app);
const wss = new WebSocket.Server({
  server,
});

wss.on('connection', (socket) => {
  console.log('browser on');
  socket.on('close', () => console.log('sever off s'));
  socket.send('hello');
});
server.listen(3004, handleListen);
