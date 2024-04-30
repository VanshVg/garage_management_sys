const socketIo = io("");

const notification = async () => {
  // const socketIo = io("");

  let data = await callAPI("/owner/notification")

  document.querySelectorAll('.totalNotification').forEach((notify => {
    notify.innerHTML = data.notifications.length;
  }))
}

notification();

socketIo.on("Recevied", (message) => {
  if (message === 1) notification();
})