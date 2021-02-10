const server = require('server');
const { get, socket } = server.router;
const { render } = server.reply;

const updateCounter = ctx => {
  ctx.io.emit('count', ctx.io.sockets.sockets.length);
};

server([
  // For the initial load render the index.html
  get('/', ctx => render('index.html')),

  // Join/leave the room
  socket('connect', updateCounter),
  socket('disconnect', updateCounter)
]);
Finally let's create a new socket router that, when it receives a message, it will push the same message to everyone in a similar way as before:

// /index.js

const server = require('server');
const { get, socket } = server.router;
const { render } = server.reply;

// Update everyone with the current user count
const updateCounter = ctx => {
  ctx.io.emit('count', Object.keys(ctx.io.sockets.sockets).length);
};

// Send the new message to everyone
const sendMessage = ctx => {
  ctx.io.emit('message', ctx.data);
};

server([
  get('/', ctx => render('index.html')),
  socket('connect', updateCounter),
  socket('disconnect', updateCounter),
  socket('message', sendMessage)
]);
