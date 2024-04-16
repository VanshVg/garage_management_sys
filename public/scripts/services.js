(async () => {
  const service = await callAPI('/owner/ownerServices');
  const services = service.services;
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
})();