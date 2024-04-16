const changeStep = (hide, show) => {
  document.getElementById(hide).classList.add("hidden");
  document.getElementById(show).classList.remove("hidden");
};

const handleGarage = async (e) => {
  e.preventDefault();
  document
    .querySelectorAll(
      `input[Validation],select[Validation],textarea[Validation]`
    )
    .forEach((ele) => {
      Validation.isValid(ele);
    });
  if (!document.querySelector("error")) {
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    //renaming column
    formProps["garageName"] = formProps["name"];
    formProps["cityId"] = formProps["city"];
    formProps["contactNumber"] = formProps["contact"];
    formProps["userId"] = localStorage.getItem("userId");
    delete formProps["name"];
    delete formProps["city"];
    delete formProps["contact"];
    delete formProps["state"];

    let response = await callAPI(`/owner/garages/add`, formProps, "POST");
    toast.show(response.success ? "success" : "error", response.message);
    if (response.success)
      setTimeout(() => {
        location.href = "/owner/garages";
      }, 3000);
  }
};
const addGarageDetails = async () => {
  let formData = document.getElementById("garageAdd");
  let details = new FormData(formData);
  const params = new URLSearchParams(details);
  const garageData = await new Response(params).text();
  let data = await fetch("/owner/garage/add", {
    method: "POST",
    headers: {
      "Content-type": "application/x-www-form-urlencoded",
    },
    body: garageData,
  });
  let result = await data.json();
  document.getElementById("message").innerText = result.message;
};

const updateGarage = async () => {
  let formData = document.getElementById("garageAdd");
  let details = new FormData(formData);
  const params = new URLSearchParams(details);
  const garageData = await new Response(params).text();
  let data = await fetch("/owner/garage/update", {
    method: "POST",
    headers: {
      "Content-type": "application/x-www-form-urlencoded",
    },
    body: garageData,
  });
  let result = await data.json();
  document.getElementById("message").innerText = result.message;
};
