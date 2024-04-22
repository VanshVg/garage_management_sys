const showServicesAdd = async () => {
  const result = await fetch('/allServices');
  const json = await result.json();

  const services = json.services;
  let select = document.createElement("select");
  select.setAttribute('id', "service-name");
  services.forEach((service) => {
    let option = document.createElement("option");
    option.value = service.id;
    option.textContent = service.name;
    select.appendChild(option);
  });
  let option = document.createElement('option');
  option.value = "other";
  option.textContent = "other";
  select.appendChild(option);
  document.getElementsByClassName("select-service")[0].appendChild(select);
  addMyEventListener();
};

const addService = async () => {
  let serviceId = document.getElementById("service-name").value;
  let price = document.getElementById('price').value;
  let body = {
    serviceId,
    price
  };

  let serviceName = document.getElementById('serviceName');
  let description = document.getElementById('description');
  if (serviceName) {
    serviceName = serviceName.value;
    description = description.value;
    body.serviceName = serviceName,
      body.description = description
  }


  const select = document.getElementById('garageDropDown');
  const option = select[select.selectedIndex].value;
  let data = await fetch(`/owner/services/${option}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  let response = await data.json();
  if (response.success == true) {
    window.location.href = "/owner/services";
  } else {
    if (document.getElementById("error")) {
      document.getElementById("error").remove()
    }
    let error = document.createElement("p");
    error.id = "error";
    error.style.color = "red";
    error.textContent = response.message;
    document.getElementsByClassName("service-top")[0].appendChild(error)
  }
};

const showAddService = () => {
  document.getElementsByClassName("add-service-container")[0].style.display = "block";
  document.getElementsByClassName("service-container")[0].style.display = "none";
}

const showAllServices = () => {
  document.getElementsByClassName("add-service-container")[0].style.display = "none";
  document.getElementsByClassName("service-container")[0].style.display = "block";
}

showServicesAdd();

const addMyEventListener = () => {
  document.getElementById('service-name').addEventListener('change', (e) => {
    if (e.target.value == 'other') {
      let div = document.createElement('div');
      let input = document.createElement('input');
      input.setAttribute('placeholder', 'service name');
      input.setAttribute('name', 'serviceName');
      input.setAttribute('id', 'serviceName');
      div.appendChild(input);
      let textarea = document.createElement('textarea');
      textarea.setAttribute('placeholder', 'service description');
      textarea.setAttribute('name', 'description');
      textarea.setAttribute('id', 'description');
      div.appendChild(textarea);
      e.target.parentNode.appendChild(div);
    }
  });
}

const garageDropdown = async () => {
  const garageList = await callAPI('/owner/garages/getGaragesList');
  const garages = garageList.garages;
  let optionsGarage = "";
  garages.forEach(element => {
    optionsGarage += `<option value=${element.garage_id}>${element.garage_name}</option>`;
  });
  let selectGarage = document.getElementById('garageDropDown');
  selectGarage.innerHTML = optionsGarage;

}
garageDropdown();