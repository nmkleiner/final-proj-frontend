import ioClient from 'socket.io-client'

const msgs = [];
// const socket = ioClient('http://localhost:3000');



const getMsgs = () => {
    return msgs;
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
