const handleUpdateForm = async (e) => {
  e.preventDefault();
  Validation.allValid = true;
  document.querySelectorAll(`input[Validation]`).forEach((ele) => {
    if (!Validation.isValid(ele)) Validation.allValid = false;
  });
  if (!document.querySelector("#updateOwner error")) {
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    formProps["profilePic"] = document.querySelector('#updateOwner #dropzone-file').files;
    formProps["userId"] = localStorage.getItem("userId");
    let response = await callAPI("/owner/profile/update", formProps, "PUT");
    toast.show(response.success ? "success" : "error", response.message);
    if (response.success)
      setTimeout(() => {
        location.href = "/owner/profile";
      }, 3000);
  }
  myFetch();
};

const myFetch = async () => {
  const userDetails = await callAPI("/userDetails");
  const user = userDetails.user;
  await loadAddress("updateOwner");
  document.querySelector("#updateOwner #name").value = user.name;
  document.querySelector("#updateOwner #bio").value = user.bio || "";
  const address = userDetails.address;
  if (address) {
    document.querySelector('#updateOwner #state').value = address.stateId;
    await loadCity('updateOwner');
    document.querySelector('#updateOwner #city').value = address.cityId;
    document.querySelector('#updateOwner #area').value = address.area;
    document.querySelector('#updateOwner #pincode').value = address.pincode;
  }
};

myFetch();
