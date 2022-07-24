const host = window.location.host;
const messageList = document.querySelector('ul');
const messageForm = document.querySelector('#message');
const nickName = document.querySelector('#nick');
const socket = new WebSocket(`ws://${host}`);

const makeMessage = (type, payload) => {
  const msg = { type, payload };
  return JSON.stringify(msg);
};

socket.addEventListener('open', () => {
  console.log('server on');
});
socket.addEventListener('message', async (message) => {
  const li = document.createElement('li');
  li.innerText = await message.data;
  messageList.append(li);
});
socket.addEventListener('close', (close) => {
  console.log('serner off');
});
const heandleSubmit = (e) => {
  e.preventDefault();
  const input = messageForm.querySelector('input');
  socket.send(makeMessage('new_message', input.value));
  const li = document.createElement('li');
  li.innerText = `you: ${input.value}`;
  messageList.append(li);
  input.value = '';
};
const heandleNickSubmit = (e) => {
  e.preventDefault();
  const input = nickName.querySelector('input');
  socket.send(makeMessage('nickname', input.value));
  input.value = '';
};

messageForm.addEventListener('submit', heandleSubmit);
nickName.addEventListener('submit', heandleNickSubmit);
