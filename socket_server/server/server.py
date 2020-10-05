from flask import Flask, send_from_directory, request
from flask_socketio import SocketIO, emit, join_room
from flask_cors import CORS
import json
import logging 

count = 0
app = Flask(__name__)
app.config['SECRET_KEY'] = 'development key'
socket = SocketIO(app,cors_allowed_origins='*')
CORS(app)
log = logging.getLogger('werkzeug')
log.disabled = True

@socket.on('connect')
def on_connect():
    print('user connected' + request.sid)
    emit('set_id',{'id':request.sid})
    global count
    count += 1
    if count == 1:
        print(count)
        print('SYNCING BLANK DATA')
        emit('sync_data',{'users':[]},broadcast=True)
    else:
        print('sync requested')
        print(count)
        emit('request_sync',broadcast=True)


@socket.on('disconnect')
def on_disconnect():
    global count
    count -= 1
    print('disconnected')
    print(count)


@socket.on('sync_clients')
def sync_clients(syncData):
   print('SENDING SYNC')
   print(syncData)
   emit('sync_data',syncData,broadcast=True) 


@socket.on('username')
def update(update):
    emit('username_updated',update,broadcast=True)

@socket.on('vote')
def update(update):
    emit('vote_updated',update,broadcast=True)

@socket.on('show_vote')
def update(update):
    emit('show_vote_updated',update,broadcast=True)

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

@socket.on('sync_clients')
def sync_clients(syncData):
   emit('sync_data',syncData,broadcast=True) 


@socket.on('username')
def update(update):
    emit('username_updated',update,broadcast=True)

@socket.on('vote')
def update(update):
    emit('vote_updated',update,broadcast=True)

@socket.on('show_vote')
def update(update):
    emit('show_vote_updated',update,broadcast=True)

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
