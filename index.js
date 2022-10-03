const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

require('dotenv').config();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  socket.on('chat message', msg => {
    console.log('client id - '+ socket.id);
    // send message to all
    io.emit('chat message', msg);

    // send message to only client id
    //io.to(socket.id).emit('chat message', msg);
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
