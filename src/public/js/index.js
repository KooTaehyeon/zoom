const socket = io();
const welcome = document.getElementById('welcome');
const form = welcome.querySelector('form');
const room = document.getElementById('room');
room.hidden = true;

let roomName;
// 메세지 출력
const addMessage = (message) => {
  const ul = room.querySelector('ul');
  const li = document.createElement('li');
  li.innerText = message;
  ul.appendChild(li);
};

// 새 메세지 넣는 함수
const handleMessageSubmit = (e) => {
  e.preventDefault();
  const input = room.querySelector('input');
  const value = input.value;
  socket.emit('new_message', value, roomName, () => {
    addMessage('you:' + value);
  });
  value = '';
};
// 방 메세지 => 방 메세지가 보여지면 원래 방이름 만드는 곳이 사라짐
const showRoom = () => {
  welcome.hidden = true;
  room.hidden = false;
  const h3 = room.querySelector('h3');
  h3.innerText = `Room ${roomName}`;
  const form = room.querySelector('form');
  form.addEventListener('submit', handleMessageSubmit);
};
// 방이 만들어지고 메세지를 적는곳
function handleRoomSubmit(e) {
  e.preventDefault();
  const input = form.querySelector('input');
  socket.emit('enter_room', input.value, showRoom);
  roomName = input.value;
  input.value = '';
}

form.addEventListener('submit', handleRoomSubmit);

socket.on('welcome', () => {
  addMessage('someone joined!');
});
socket.on('bye', () => {
  addMessage('someone left!');
});
socket.on('new_message', addMessage);

// 웹소켓
// const host = window.location.host;
// const messageList = document.querySelector('ul');
// const messageForm = document.querySelector('#message');
// const nickName = document.querySelector('#nick');
// const socket = new WebSocket(`ws://${host}`);

// const makeMessage = (type, payload) => {
//   const msg = { type, payload };
//   return JSON.stringify(msg);
// };

// socket.addEventListener('open', () => {
//   console.log('server on');
// });
// socket.addEventListener('message', async (message) => {
//   const li = document.createElement('li');
//   li.innerText = await message.data;
//   messageList.append(li);
// });
// socket.addEventListener('close', (close) => {
//   console.log('serner off');
// });
// const heandleSubmit = (e) => {
//   e.preventDefault();
//   const input = messageForm.querySelector('input');
//   socket.send(makeMessage('new_message', input.value));
//   const li = document.createElement('li');
//   li.innerText = `you: ${input.value}`;
//   messageList.append(li);
//   input.value = '';
// };
// const heandleNickSubmit = (e) => {
//   e.preventDefault();
//   const input = nickName.querySelector('input');
//   socket.send(makeMessage('nickname', input.value));
//   input.value = '';
// };

// messageForm.addEventListener('submit', heandleSubmit);
// nickName.addEventListener('submit', heandleNickSubmit);
