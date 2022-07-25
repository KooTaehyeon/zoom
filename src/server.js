import http from 'http';
import SocketIO from 'socket.io';
import express from 'express';
const app = express();
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use('/public', express.static(__dirname + '/public'));
app.get('/', (_, res) => res.render('home'));
app.get('/*', (_, res) => res.redirect('/'));
const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);

wsServer.on('connection', (socket) => {
  socket.on('enter_room', (roomName, done) => {
    console.log(roomName);
    setTimeout(() => {
      done('backEnd');
    }, 1000);
  });
});
const handleListen = () => console.log(`Listening on http://localhost:3006`);
httpServer.listen(3006, handleListen);
// 웹소켓 방식

// const server = http.createServer(app);
// const wss = new WebSocket.Server({
//   server,
// });

// const onSocketClose = () => {
//   console.log('sever off s');
// };

// const sockets = [];

// wss.on('connection', (socket) => {
//   sockets.push(socket);
//   socket['nickname'] = 'Anon';
//   console.log('browser on');
//   socket.on('close', onSocketClose);
//   socket.on('message', (msg) => {
//     const message = JSON.parse(msg);
//     switch (message.type) {
//       case 'new_message':
//         sockets.forEach((aSocket) =>
//           aSocket.send(`${socket.nickname}:${message.payload}`)
//         );
//       case 'nickname':
//         socket['nickname'] = message.payload;
//     }
//   });
// });
// server.listen(3004, handleListen);

// {
//   type: 'nickName';
//   payload: 'nico';
// }

// {
//   type: 'message';
//   payload: 'hello everyone';
// }
