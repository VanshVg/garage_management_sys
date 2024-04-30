const socketIo = io("");

const notification = async () => {
  let data = await callAPI("/owner/notification")
  document.querySelector('.totalNotification').innerHTML = data.notifications.length;
}

notification();

const livePopup = async () => {

  let data = await callAPI("/owner/notification");

  let userName = data.notifications[0].customerName
  let userNotification = `${userName} has requested for slot Approval`;

  document.getElementById('userNameNotification').innerHTML = userName;

  document.getElementById('userNameNotification').innerHTML = userNotification;

  document.getElementById('notificationPopup').style.visibility = "visible";
}

socketIo.on("Received", (message) => {
  if (message === 1) {
    notification();
    getOwnerData();
    loadAppointments();
    setTimeout(function () {
      document.getElementById('notificationPopup').style.visibility = "hidden";
    }, 5000)
    livePopup();

  }
})