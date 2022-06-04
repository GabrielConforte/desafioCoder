import io from 'socket.io-client';

let socket = io.connect('//localhost:8080');

export default socket;