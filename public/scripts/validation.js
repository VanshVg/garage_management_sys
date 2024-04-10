const Validation = {
  allValid: true,
  conditions: {
    require: (value) =>
      !value.length || value.trim() == ""
        ? { errorMessage: "field is require..", valid: false }
        : { valid: true },
    alpha: (value) =>
      !/^[a-z]+$/i.test(value)
        ? { errorMessage: "only alphabet is allowed..", valid: false }
        : { valid: true },
    length8: (value) =>
      value.length < 8
        ? {
            errorMessage: "password must be at least 8 character..",
            valid: false,
          }
        : { valid: true },
    email: (value) =>
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        ? { errorMessage: "invalid email address..", valid: false }
        : { valid: true },
    match: (value) => {
      return { errorMessage: "", valid: false };
    },
    none: () => {
      valid: true;
    },
  },
  isValid: (control) => {
    let validateControls = {};
    control
      .getAttribute("validation")
      .split(" ")
      ?.forEach((validCondition) => {
        if (
          validateControls[control.id]?.valid == undefined ||
          validateControls[control.id]?.valid ||
          validateControls[control.id] === undefined
        ) {
          validateControls[control.name] = Validation.conditions[
            validCondition
          ](control.value);
          if (control.nextSibling != null) {
            control.nextSibling.remove();
          }
          if (validateControls[control.name].errorMessage != undefined) {
            Validation.allValid = false;
            let errorElement = document.createElement("error");
            errorElement.innerText =
              validateControls[control.name].errorMessage;
            control.insertAdjacentElement("afterend", errorElement);
          }
        }
      });
    Validation.allValid = document.querySelector("error") == null;
  },
  validateAll: async (e, form) => {
    e.preventDefault();
    document.querySelectorAll(`input[validation]`).forEach((ele) => {
      Validation.isValid(ele);
    });
    let loading = true;
    if (Validation.allValid) {
      document.querySelectorAll("input[type=submit]").forEach((ele) => {
        ele.setAttribute("disabled", "");
      });
      let btn = document.querySelector(`input[type=submit]`);
      btn.setAttribute("disabled", "");
      btn.innerHTML = `<img src="https://i.gifer.com/ZKZg.gif" height="20px" />`;
      const formData = new FormData(e.target);
      const formProps = Object.fromEntries(formData);
      if (form == "register")
        formProps["role_id"] = document.querySelector(
          "input[type=radio]:checked"
        ).value;
      let response = await fetch(`/${form}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formProps),
      });
      let data = 0;
      try {
        data = await response.json();
        if (data.success) {
          Swal.fire({
            title: "Good job!",
            text: "Welcome To Your Dashboard",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
            allowOutsideClick: false,
          });
          setTimeout(() => {
            location.href = "/home";
          }, 1500);
        } else {
          throw data.message;
        }
      } catch (error) {
        if (error == undefined) {
          error = "Something wen't wrong..!!";
        }
        toast.show("error", error);
      } finally {
        btn.removeAttribute("disabled");
        btn.innerHTML =
          form.charAt(0).toUpperCase() + form.toLowerCase().substring(1);
      }
    }
  },
  setDefault: () => {
    document.querySelectorAll(`error`).forEach((ele) => {
      ele.remove();
    });
  },
};
