const showServices = (async () => {
  const select = document.getElementById('servicesList');
  const option = select[select.selectedIndex].value;
  const payLoad = {
    "garageId": option,
  }
  // const service = await callAPI('/owner/ownerServices', payLoad);
  // const services = service.services;
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
    //   string += `<div class="services-col">
    //   <div class="services-card">
    //     <img src="/assets/service.png" height="200px" width="300px" />
    //     <div class="service">
    //       <div class="service-details">
    //         <h3> ${service.name}</h3>
    //         <p class="service-description">
    //           ${service.description}
    //         </p>
    //         <p class="service-price">${service.price}</p>
    //       </div>
    //       <div class="service-right">
    //         <p class="service-status">Active</p>
    //       </div>
    //     </div>
    //   </div>
    // </div>`;
    string += `
  <div class="relative m-3  services-col flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
  <a class="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" href="#">
    <img class="object-cover" src="/assets/service.png" alt="product image" />
  </a>
  <div class="mt-4 px-5 pb-5">
    <a href="#">
      <h5 class="text-xl tracking-tight text-slate-900">${service.name}</h5>
    </a>
    <div class="mt-2 mb-5   text-center">
      <p class=" text-dark">
        ${service.description}
      </p>
      <span class="text-3xl font-bold text-slate-900">$ ${service.price}</span>
    </div>
  </div>
</div>
`
  });
  document.getElementById('services-row').innerHTML = string;
});
(async () => {
  const garageList = await callAPI('/owner/garages/getGaragesList');
  const garages = garageList.garages;
  let options = "";
  garages.forEach(garage => {
    options += `<option value=${garage.garage_id}>${garage.garage_name}</option>`;
  });
  let select = document.getElementById('servicesList');
  select.innerHTML = options;
  select.addEventListener('change', showServices);
  showServices();
})()
