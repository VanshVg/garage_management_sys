const showServices = (async () => {
  const select = document.getElementById('servicesList');
  const option = select[select.selectedIndex].value;
  console.log(option);
  const payLoad = {
    "garageId": option,
  }
  // const service = await callAPI('/owner/ownerServices', payLoad);
  // const services = service.services;
  // console.log(services);
  let data = await fetch('/owner/ownerServices', {
    method: "post",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(payLoad)
  });
  let result = await data.json();
  const services = result.services;
  let string = "";
  services.forEach(service => {
    string += `<div class="services-col">
    <div class="services-card">
      <img src="/assets/service.png" height="200px" width="300px" />
      <div class="service">
        <div class="service-details">
          <h3> ${service.name}</h3>
          <p class="service-description">
            ${service.description}
          </p>
          <p class="service-price">${service.price}</p>
        </div>
        <div class="service-right">
          <p class="service-status">Active</p>
        </div>
      </div>
    </div>
  </div>`;
  });
  document.getElementById('services-row').innerHTML = string;
});
(async () => {
  const garageList = await callAPI('/owner/garages/getGaragesList');
  const garages = garageList.garages;
  let options
  garages.forEach(garage => {
    options += `<option value=${garage.garage_id}>${garage.garage_name}</option>`;
  });
  let select = document.getElementById('servicesList');
  select.innerHTML = options;
  select.addEventListener('change', showServices);
  showServices();
})()
