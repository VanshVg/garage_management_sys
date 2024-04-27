import {Server} from "socket.io";

let io;

const socket = async (server) => {

  io = new Server(server);

  io.on('connection', (socket) => {

    socket.on("notification", (msg) => {
      console.log("notification");
    })

})

};

export function getInstance(){
  if(!io){
    console.log("Socket is not Connected");
    return;
  }
  return io;
}

export default socket;
