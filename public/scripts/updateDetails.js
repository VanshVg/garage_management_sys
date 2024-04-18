const updateDetails = async (fieldList) => {
  const userDetails = await callAPI("/userDetails");
  const user = userDetails.user;
  user.address = `${userDetails?.address?.area},</br>${userDetails?.address?.cityName}-${userDetails?.address?.pincode},</br>${userDetails?.address?.stateName}`;
  fieldList.forEach((field) => {
    document.querySelectorAll(`[dataBound=${field}]`).forEach((control) => {
      control.innerHTML = user[field] || `please update your ${field}..!!`;
    });
    // document.querySelector(`[dataBound=${field}]`).innerHTML =
  });
  document.querySelector;
};
