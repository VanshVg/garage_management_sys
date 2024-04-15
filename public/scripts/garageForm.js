let tabs = document.getElementsByClassName("tab");
let currentTab = 0;


const showTabs = (n) => {
  tabs[n].style.display = 'block';
}
const nextPage = () => {
  tabs[0].style.display = 'none';
  tabs[1].style.display = 'block';
}
const prevPage = () => {
  tabs[0].style.display = 'block';
  tabs[1].style.display = 'none';
}
showTabs(currentTab);
// taking form and request of insert
const addGarageDetails = async () => {

  let formData = document.getElementById("garageAdd");
  let details = new FormData(formData);
  const params = new URLSearchParams(details);
  const garageData = await new Response(params).text();
  let data = await fetch("/owner/garage/add", {
    method: "POST",
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    body: garageData

  })
  let result = await data.json();
  document.getElementById("message").innerText = result.message;
}

const updateGarage = async () => {
  let formData = document.getElementById("garageAdd");
  let details = new FormData(formData);
  const params = new URLSearchParams(details);
  const garageData = await new Response(params).text();
  let data = await fetch("/owner/garage/update", {
    method: "POST",
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    body: garageData

  })
  let result = await data.json();
  document.getElementById("message").innerText = result.message;
}

const handleGarage = (e) => {
  e.preventDefault()
  if (window.location.href == 'http://localhost:3000/owner/garage/garageUpdate') {
    updateGarage();
  }
  else {
    addGarageDetails();
  }
}