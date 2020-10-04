from flask import Flask, send_from_directory, request
from flask_socketio import SocketIO, emit, join_room
from flask_cors import CORS
import json

app = Flask(__name__)
app.config['SECRET_KEY'] = 'development key'
socket = SocketIO(app,cors_allowed_origins='*')
CORS(app)

@socket.on('connect')
def on_connect():
    print('user connected' + request.sid)
    emit('set_id',{'id':request.sid},brodcast=True)


@socket.on('username')
def update(update):
    with open('data.json','r+') as json_file:
        emit('username_updated',update,broadcast=True)



@socket.on('deactivate_user')
def on_inactive_user(data):
    user = data.get('username')
    emit('user_deactivated', {'user': user}, broadcast=True)


@socket.on('join_room')
def on_join(data):
    room = data['room']
    join_room(room)
    emit('open_room', {'room': room}, broadcast=True)


@socket.on('send_message')
def on_chat_sent(data):
    room = data['room']
    emit('message_sent', data, room=room)
