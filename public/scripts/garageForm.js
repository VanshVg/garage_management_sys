const changeStep = (hide, show) => {
  document.getElementById(hide).classList.add('hidden');
  document.getElementById(show).classList.remove('hidden');
}

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
  // if (
  //   window.location.href == "http://localhost:3000/owner/garage/garageUpdate"
  // ) {
  //   updateGarage();
  // } else {
  //   addGarageDetails();
  // }
};

// let tabs = document.getElementsByClassName("tab");
// let currentTab = 0;

const loadCity = async () => {
  let stateId = document.querySelector("#state").selectedOptions[0].id;
  let city = document.getElementById("city");
  let response = await callAPI(`/address/city/${stateId}`);
  let cityOption = ``;
  response.city.forEach((city) => {
    cityOption += `<option id='${city.id}' name='${city.id}' value='${city.id}'>${city.city_name}</option>`;
  });
  city.innerHTML = "";
  city.innerHTML = cityOption;
};
const loadAddress = async () => {
  let state = document.getElementById("state");
  state.addEventListener("change", () => loadCity());
  let response = await callAPI("/address/state");
  let stateOption = `<option selected disabled>--select state--</option>`;
  response.state.forEach((state) => {
    stateOption += `<option id='${state.id}' name='${state.id}' value='${state.id}'>${state.state_name}</option>`;
  });
  state.innerHTML = "";
  state.innerHTML = stateOption;
};
loadAddress();
// const showTabs = (n) => {
//   tabs[n].style.display = "block";
// };
// const nextPage = () => {
//   tabs[0].style.display = "none";
//   tabs[1].style.display = "block";
// };
// const prevPage = () => {
//   tabs[0].style.display = "block";
//   tabs[1].style.display = "none";
// };
// showTabs(currentTab);
// taking form and request of insert
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
