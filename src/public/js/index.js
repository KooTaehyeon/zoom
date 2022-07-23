const host = window.location.host;

const socket = new WebSocket(`ws://${host}`);

socket.addEventListener('open', () => {
  console.log('server on');
});
socket.addEventListener('message', (message) => {
  console.log('this : ', message.data, 'from the message');
});
socket.addEventListener('close', (close) => {
  console.log('serner off');
});
