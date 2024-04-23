const handleEmployeeAddForm = async (e) => {
    e.preventDefault();
    Validation.allValid = true;
    document.querySelectorAll(`input[Validation]`).forEach((ele) => {
      if (!Validation.isValid(ele)) Validation.allValid = false;
    });
    if (!document.querySelector("#updateOwner error")) {
      let formData = new FormData(e.target);
      let formProps = Object.fromEntries(formData);
      let fileds = Object.keys(formProps);
      // console.log(formProps);
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
      console.log(formData);
    //   debugger
    //   let response = await fetch("/owner/profile/update", {
    //     method: "PUT",
    //     body: formData,
    //   });
    //   response = await response.json();
      
    //   console.log(response,"this is response");
    //   toast.show(response.success ? "success" : "error", response.message);
    //   if (response.success)
    //     setTimeout(() => {
    //       location.href = "/owner/profile";
    //     }, 3000);
    }
  };

  const getGarages = async () => {
    console.log("here")
    var garageData = await fetch("/owner/garages/getGaragesList");
    var garageData = await garageData.json();
    console.log(garageData);
    var dropdown = document.querySelector("#garagesDropdown");
  
    garageData.garages.forEach((element) => {
      var option = document.createElement("option");
      option.setAttribute("value", element.garage_name);
      option.classList.add("font-family");
      option.classList.add("options");
      option.innerText = element.garage_name;
      option.value = element.garage_name;
      dropdown.appendChild(option);
    });
  };
  
  getGarages();