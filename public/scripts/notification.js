const socketIo = io("");

const notification = async() => {
  // const socketIo = io("");

  let data = await callAPI("/owner/notification")

  console.log(data.notifications.length);

    document.querySelectorAll('.totalNotification').forEach((notify=>{
        notify.innerHTML = data.notifications.length;
    }))
}

notification();

socketIo.on("Recevied", (message) => {
  console.log(message);
  if(message === 1) notification();
})