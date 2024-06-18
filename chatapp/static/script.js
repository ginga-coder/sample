document.addEventListener('DOMContentLoaded', () => {
    const socket = io.connect('https://' + document.domain + '/chat');

    socket.on('connect', () => {
        console.log('Connected to server');
    });

    socket.on('status', (data) => {
        const msg = document.createElement('p');
        msg.textContent = data.msg;
        document.getElementById('messages').appendChild(msg);
    });

    socket.on('message', (data) => {
        const msg = document.createElement('p');
        msg.textContent = data.msg;
        document.getElementById('messages').appendChild(msg);
    });

    document.getElementById('send').onclick = () => {
        const messageInput = document.getElementById('message');
        const message = messageInput.value;
        messageInput.value = '';
        socket.emit('text', {'msg': message});
    };

    window.onbeforeunload = () => {
        socket.emit('left', {});
        socket.disconnect();
    };
});
