const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('chat message', (msg) => {
        console.log('Message received: ' + msg);

        // Broadcast to everyone
        io.emit('chat message', msg);

        // Simple auto reply
        setTimeout(() => {
            const reply = botReply(msg);
            io.emit('chat message', 'Bot: ' + reply);
        }, 1000); // 1 second delay for bot reply
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Simple bot reply function
function botReply(message) {
    message = message.toLowerCase();
    if (message.includes("hi") || message.includes("hello")) {
        return "Hello! How can I help you today?";
    } else if (message.includes("how are you")) {
        return "I'm a bot, I'm always good 😄";
    } else if (message.includes("bye")) {
        return "Goodbye! Have a nice day!";
    } else {
        return "Sorry, I don't understand that.";
    }
}

const PORT = 3000;
http.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
