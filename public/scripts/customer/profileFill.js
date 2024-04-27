const fillNotification = async () => {
    const socketIo = io("");

    socketIo.on('notification', (notification) => {
        document.getElementById('userTotalNotification').innerHTML = notification.length;  
      // console.log(notification.length);
    })

}

fillNotification();

const updateDetails = async () => {
  const userDetails = await fetch("/userDetails");
  const userJson = await userDetails.json();
  const user = userJson.user;
  const address = userJson.address;
  const vehicleServices = userJson.vehicleServices;
  const bio = document.querySelector("address");
  bio.innerText = user.bio || "please update your biodata";

  const profilePic = document.querySelector("#prifile_pic");
  profilePic.setAttribute("src", user.profile_pic);
  const userProfilePic = document.querySelector("#user_profile_pic");
  userProfilePic.setAttribute("src", user.profile_pic);
  document.getElementById("name").innerHTML = user.name;
  document.getElementById("email").innerHTML = user.email;
  document.getElementById("address").innerHTML =
    address.area +
    ", " +
    address.cityName +
    ", " +
    address.stateName +
    ", Pincode: " +
    address.pincode;
  var tbody = document.querySelector("tbody");
  vehicleServices.forEach((element) => {
    var tr = document.createElement("tr");
    tr.classList.add("bg-white");
    tr.classList.add("border-b");
    tr.classList.add("hover:bg-lightbg");
    Object.keys(vehicleServices[0]).forEach((ele) => {
      td = document.createElement("td");
      td.classList.add("px-6");
      td.classList.add("py-3");
      if (ele == "status") {
        if (element[ele] == 1) {
          td.innerText = "Completed";
        } else {
          td.innerText = "Pending";
        }
      } else {
        td.innerText = element[ele];
      }
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
};
