const handleUpdateForm = async (e) => {
  e.preventDefault();
  Validation.allValid = true;
  document.querySelectorAll(`input[Validation]`).forEach((ele) => {
    if (!Validation.isValid(ele)) Validation.allValid = false;
  });
  if (!document.querySelector("#updateOwner error")) {
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
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
  loadAddress("updateOwner");
  document.querySelector("#updateOwner #name").value = user.name;
  console.log(user);
};

myFetch();
