const notification = () => {
  const socketIo = io("/");
  socketIo.on('notification', (notification) => {
    document.querySelectorAll('.totalNotification').forEach((notify=>{
        notify.innerHTML = notification.length;
    }))
  })
}

notification();
