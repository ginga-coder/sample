from flask import Flask, render_template
from flask_socketio import SocketIO, emit

app = Flask(__name__)
socketio = SocketIO(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/chat')
def chat():
    return render_template('chat.html')

@socketio.on('joined', namespace='/chat')
def joined(message):
    emit('status', {'msg': 'User has entered the room.'}, broadcast=True)

@socketio.on('text', namespace='/chat')
def text(message):
    emit('message', {'msg': message['msg']}, broadcast=True)

@socketio.on('left', namespace='/chat')
def left(message):
    emit('status', {'msg': 'User has left the room.'}, broadcast=True)

if __name__ == '__main__':
    socketio.run(app)
