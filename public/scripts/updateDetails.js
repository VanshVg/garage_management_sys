const updateDetails = async (fieldList) => {
  const userDetails = await callAPI("/userDetails");
  const user = userDetails.user;
  user.address = !userDetails.address
    ? `please update your address..!!`
    : `${userDetails?.address?.area},</br>${userDetails?.address?.cityName}-${userDetails?.address?.pincode},</br>${userDetails?.address?.stateName}`;
  fieldList.forEach((field) => {
    document.querySelectorAll(`[dataBound=${field}]`).forEach((control) => {
      if (field == "profile_pic") {
        control.src = !user.profile_pic
          ? "https://wallpapers-clan.com/wp-content/uploads/2022/08/default-pfp-19.jpg"
          : "/uploads/" + user["profile_pic"];
        control.addEventListener("error", () => {
          control.src =
            "https://wallpapers-clan.com/wp-content/uploads/2022/08/default-pfp-19.jpg";
        });
        return;
      }
      control.innerHTML = user[field] || `please update your ${field}..!!`;
    });
  });
  document.querySelector;
};
