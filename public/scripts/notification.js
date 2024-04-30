const socketIo = io("");

const notification = async() => {

  let data = await callAPI("/owner/notification")

    document.querySelectorAll('.totalNotification').forEach((notify=>{
        notify.innerHTML = data.notifications.length;
    }))


}

notification();

const livePopup = async () => {

  let data = await callAPI("/owner/notification");

  console.log(data);

  document.getElementById('notificationPopup').style.visibility = "visible";
}

socketIo.on("Recevied", (message) => {
  if(message === 1) notification(); livePopup();
})