const fillNotification = async () => {
  const socketIo = io("");

  socketIo.on("notification", (notification) => {
    document.getElementById("userTotalNotification").innerHTML =
      notification.length;
  });
};

fillNotification();

const updateDetails = async () => {
  document.getElementById("user-profile").classList.remove("hidden");
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
  console.log(address);
  document.getElementById("address").innerHTML =
    `<b class="text-xl mr-2">Address:</b>` +
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
