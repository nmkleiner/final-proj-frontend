import ioClient from 'socket.io-client'

var socket = null;
const msgs = [];

connectSocket();

function connectSocket() {
    socket = ioClient('http://localhost:3000');
    // socket.on('chat history', function (historyMsgs) {
    //     msgs.push(...historyMsgs)
    // });
    
    // socket.on('user joined', function(msg) {
    //     msgs.push({txt: msg.txt, from: nickname})
    // });

    socket.on('chat newMsg', function (msg) {
        // JIF
        // if (nickname === msg.from) msgs[msgs.length - 1].processed = true;
        // else 
        msgs.push(msg);
    });

   
}

const getMsgs = () => {
    return msgs;
}

const send = (msg) => {
    msgs.push(msg);
    console.log('chat msg', msg);
    socket.emit('chat msg', msg);
}

function createEmptyMsg(nickname = 'jhon doe', txt = '') {
    return { txt, processed: false, from: nickname };
}

// function msgType() {
//     socket.emit('user typing', nickname)
// }

function roomJoin(roomName) {
    console.log('chat room-joined', roomName)
    socket.emit('chat room-joined', roomName)
}

export default {
    // msgType,
    getMsgs,
    send,
    
    createEmptyMsg,
    roomJoin
}



function lorem(size = 5) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    for (var i = 0; i < size; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
