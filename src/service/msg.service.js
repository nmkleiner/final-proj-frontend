import ioClient from 'socket.io-client'

var socket = null;
const msgs = [];

connectSocket();

function connectSocket() {
    socket = ioClient('http://localhost:3000');

    socket.on('chat newMsg', function (msg) {
        console.log('chat new masg', msg);
        msgs.push(msg);
    });

   
}

const getMsgs = () => {
    return msgs;
}

const send = (msg) => {
    console.log('chat msg', msg);
    socket.emit('chat msg', msg);
}

function createEmptyMsg(nickname = 'jhon doe', txt = '') {
    console.log('createEmptyMsg: ', nickname )
    return { txt, from: nickname };
}


function roomJoin(roomName) {
    console.log('chat room-joined', roomName)
    socket.emit('chat room-joined', roomName)
}

function disconnectFromRoom(){
    socket.emit('disconnect');
}

export default {
    // msgType,
    getMsgs,
    send,
    createEmptyMsg,
    roomJoin,
    disconnectFromRoom
}



function lorem(size = 5) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    for (var i = 0; i < size; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
