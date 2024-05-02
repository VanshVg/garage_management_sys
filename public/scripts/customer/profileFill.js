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

const handleUpdateForm = async (e) => {
  debugger;
  e.preventDefault();
  Validation.allValid = true;
  document.querySelectorAll(`input[Validation]`).forEach((ele) => {
    if (!Validation.isValid(ele)) Validation.allValid = false;
  });
  if (!document.querySelector("#updateOwner error")) {
    let formData = new FormData(e.target);
    let formProps = Object.fromEntries(formData);
    let fileds = Object.keys(formProps);
    formData = new FormData();
    fileds.forEach((filed) => {
      formData.append(
        filed,
        document.querySelector(`#updateOwner #${filed}`).value
      );
    });
    formData.delete("profile_pic");
    formData.append(
      "thumbnail",
      document.getElementById("profile_pic").files[0] || ""
    );
    formData.append("userId", localStorage.getItem("userId"));
    formProps = Object.fromEntries(formData);

    let response = await fetch("/customer/profile/update", {
      method: "PUT",
      body: formData,
    });
    response = await response.json();

    toast.show(response.success ? "success" : "error", response.message);
    if (response.success)
      setTimeout(() => {
        location.href = "/customer/profile";
      }, 3000);
  }
};

const myFetch = async () => {
  const userDetails = await callAPI("/userDetails");
  const user = userDetails.user;
  await loadAddress("updateOwner");
  document.querySelector("#updateOwner #name").value = user.name;
  document.querySelector("#updateOwner #bio").value = user.bio || "";
  const address = userDetails.address;
  if (address) {
    document.querySelector("#updateOwner #state").value = address.stateId;
    await loadCity("updateOwner");
    document.querySelector("#updateOwner #city").value = address.cityId;
    document.querySelector("#updateOwner #area").value = address.area;
    document.querySelector("#updateOwner #pincode").value = address.pincode;
  }
};
