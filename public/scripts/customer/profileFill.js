const socketIo = io("");

const fillNotification = async () => {
  let data = await callAPI("/customer/notification");
  console.log(data.notification);
  document.getElementById("userTotalNotification").innerHTML =
    data.notification.length;
};

socketIo.on("Received", (message) => {
  if (message) fillNotification();
});

const updateDetails = async () => {
  document.getElementById("user-profile")?.classList.remove("hidden");
  document.getElementById("user-profile").classList.add("flex");
  document.getElementById("user-appointments").classList.remove("flex");
  document.getElementById("user-appointments").classList.add("hidden");
  document.getElementById("user-vehicles").classList.remove("flex");
  document.getElementById("user-vehicles").classList.add("hidden");
  document.getElementById("btn-full").classList.remove("opacity-100");
  document.getElementById("btn-full").classList.add("opacity-50");
  document.getElementById("btn-half").classList.remove("opacity-50");
  document.getElementById("btn-half").classList.add("opacity-100");
  document.getElementById("btn-double").classList.remove("opacity-100");
  document.getElementById("btn-double").classList.add("opacity-50");

  const userDetails = await fetch("/userDetails");
  const userJson = await userDetails.json();
  const user = userJson.user;
  const address = userJson.address;
  const vehicleServices = userJson.vehicleServices;
  const bio = document.getElementById("bio");
  bio.innerText = user.bio || "please update your biodata";

  const profilePic = document.querySelector("#prifile_pic");
  profilePic.setAttribute("src", user.profile_pic);
  const userProfilePic = document.querySelector("#user_profile_pic");
  userProfilePic.setAttribute("src", user.profile_pic);
  document.getElementById("name").innerHTML = user.name;
  document.getElementById(
    "email"
  ).innerHTML = `<b class="text-xl mr-2">Email:</b> ${user.email}`;
  document.getElementById("address").innerHTML =
    `<b class="text-xl mr-2">Address:</b>` +
    address.area +
    ", " +
    address.cityName +
    ", " +
    address.stateName +
    ", Pincode: " +
    address.pincode;
};

const handleProfile = (id) => {
  let divs = ["profile", "editProfile"];
  document.getElementById(divs[1]).classList.remove("hidden");
  document.getElementById(divs[id]).classList.remove("hidden");
  document.getElementById(divs[(id + 1) % 2]).classList.add("hidden");
  if (id == 1) document.getElementById(divs[1]).classList.add("block");
};
