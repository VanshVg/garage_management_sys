const socketIo = io("");

const notification = async () => {
  let data = await callAPI("/owner/notification")
  document.querySelector('.totalNotification').innerHTML = data.notifications.length;
}

notification();

socketIo.on("Received", (message) => {
  if (message === 1) notification();
})