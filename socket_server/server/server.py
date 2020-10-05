from flask import Flask, send_from_directory, request
from flask_socketio import SocketIO, emit, join_room
from flask_cors import CORS
import json
import logging 

app = Flask(__name__)
app.config['SECRET_KEY'] = 'development key'
socket = SocketIO(app,cors_allowed_origins='*')
CORS(app)
log = logging.getLogger('werkzeug')
log.setLevel(logging.ERROR)


@socket.on('connect')
def on_connect():
    print('user connected' + request.sid)
    emit('request_sync',{},broadcast=True) 


@socket.on('sync_clients')
def update(update):
    print('syncing clients')
    emit('send_sync_data',update,broadcast=True)

@socket.on('username')
def update(update):
    emit('username_updated',update,broadcast=True)

@socket.on('reset_votes')
def update():
    emit('reset_votes',broadcast=True)

@socket.on('set_skip')
def update(update):
    emit('set_skip_updated',update,broadcast=True)

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

