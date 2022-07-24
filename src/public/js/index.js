const host = window.location.host;
const messageList = document.querySelector('ul');
const messageForm = document.querySelector('form');

const socket = new WebSocket(`ws://${host}`);

socket.addEventListener('open', () => {
  console.log('server on');
});
socket.addEventListener('message', async (message) => {
  const li = document.createElement('li');
  li.innerText = await message.data.text();
  messageList.append(li);
});
socket.addEventListener('close', (close) => {
  console.log('serner off');
});
const heandleSubmit = (e) => {
  e.preventDefault();
  const input = messageForm.querySelector('input');
  socket.send(input.value);
  input.value = '';
};

messageForm.addEventListener('submit', heandleSubmit);
