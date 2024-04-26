
const notification = () => {
  const socketIo = io("");

  // socketIo.on('connect', ()=> {
  //   console.log("Socket Io is working");
  // })

  socketIo.on('notification', (notification) => {
    document.querySelectorAll('.totalNotification').forEach((notify=>{
        notify.innerHTML = notification.length;
    }))

  })

}

notification();
