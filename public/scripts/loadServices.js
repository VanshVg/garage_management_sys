const showServices = async (parent) => {
  const select = document.querySelector(`#${parent}-servicesList`);
  const option = select[select.selectedIndex].value;
  const payLoad = {
    garageId: option,
  };
  const service =
    parent == "service-container"
      ? await callAPI("/owner/ownerServices", payLoad, "POST")
      : await callAPI(`/owner/services/all/${option}`);
  const services = service.services;
  let string = "";
  if (parent == "add-service-container") {
    string += `<div class="flex w-1/3 h-[150px] p-2 relative">
    <div class="w-full h-full rounded-md overflow-hidden flex flex-col cursor-pointer bg-white p-2 justify-center items-center">
    <svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" viewBox="0 0 24 24"><path class="fill-light" d="M18 12.998h-5v5a1 1 0 0 1-2 0v-5H6a1 1 0 0 1 0-2h5v-5a1 1 0 0 1 2 0v5h5a1 1 0 0 1 0 2"/></svg>
    <p class="opacity-50">other service</p>
    </div></div>`;
  }
  services.forEach((service) => {
    string += `
    <div class="flex w-1/3 h-[150px] p-2 relative">`;
    if (parent == "service-container")
      string += `<div class="cursor-pointer absolute top-1 right-1 bg-red-500 p-1 rounded-full" onclick="deleteService('${service.id}','${service.name}')" ><svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24"><path fill="white" d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6zM8 9h8v10H8zm7.5-5l-1-1h-5l-1 1H5v2h14V4z"/></svg></div>`;
    else
      string += `<div class="cursor-pointer absolute top-1 right-1 bg-green-600 p-1 rounded-full" onclick="newService('${
        service.id
      }','${option}','${service.name}','${service?.description.substring(
        0,
        100
      )}')"><svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24"><path fill="white" d="M18 12.998h-5v5a1 1 0 0 1-2 0v-5H6a1 1 0 0 1 0-2h5v-5a1 1 0 0 1 2 0v5h5a1 1 0 0 1 0 2"/></svg></div>`;
    string += `<div class="w-full h-full rounded-md overflow-hidden flex bg-white p-2">  
      <div class="w-[150px] rounded-md overflow-hidden h-full">
          <img class="object-cover h-full" src="/assets/service.png" alt="product image" />
      </div>
      <div class="p-2 pt-0 h-full w-full relative">
        <h5 class="text-lg text-dark font-bold tracking-wide text-left">${
          service.name
        }</h5>
            <div class="mt-2 mb-5  text-left">
          <p class=" text-blue text-sm">
            ${service?.description.substring(0, 100)}
          </p>
          ${
            parent == "service-container"
              ? `<span class="text-xl font-bold text-slate-900 absolute bottom-0 right-0">${service.price}</span>`
              : ""
          }
        </div>
      </div>
      </div>
    </div>
    `;
  });
  document.querySelector(`.${parent} #services-row`).innerHTML = string;
};
const loadService = async (parent) => {
  let panel = document.querySelector(`.${parent}`);
  document.querySelector(".service-container").style.display = "none";
  panel.style.display = "block";
  const garageList = await callAPI("/owner/garages/getGaragesList");
  const garages = garageList.garages;
  let options = "";
  garages.forEach((garage) => {
    options += `<option class="text-white" value=${garage.garage_id}>${garage.garage_name}</option>`;
  });
  let select = document.querySelector(`#${parent}-servicesList`);
  select.innerHTML = options;
  select.addEventListener("change", () => showServices(parent));
  showServices(parent);
};
const addServiceBtnClick = async (e, id, garage_id) => {
  e.preventDefault();
  let price = document.getElementById("service-price").value || 5;
  let response = null;
  try {
    response = await callAPI(
      "/owner/services/",
      {
        garageId: garage_id,
        serviceId: id,
        price: price,
      },
      "POST"
    );
  } catch (error) {
    response = error;
  } finally {
    Swal.close();
    toast.show(response.success ? "success" : "error", response.message);
    setTimeout(() => {
      location.href = "/owner/services";
    }, 3000);
  }
};
const newService = (id, garage_id, name, description) => {
  Swal.fire({
    title: `Add Service`,
    html: `
  <form class="max-w-sm mx-auto" onsubmit="addServiceBtnClick(event,'${id}','${garage_id}')">
    <div class="mb-5">
      <label  class="block mb-2 font-bold w-max">Name : </label>
      <input type="text" id="service-name" class="border p-2.5 border-gray-300 text-sm rounded-lg  block w-full" value="${name}" disabled/>
    </div>
    <div class="mb-5">
      <label  class="block mb-2 font-bold w-max">Description : </label>
      <textarea id="service-description" class="border p-2.5 border-gray-300 text-sm rounded-lg  block w-full" disabled>${description}</textarea>
    </div>
    <div class="mb-5">
      <label  class="block mb-2 font-bold w-max">Price : </label>
      <input type="number" id="service-price" class="border p-2.5 border-gray-300 text-sm rounded-lg  block w-full" placeholder="0000" value="100" min="5" max="20000" required/>
    </div>
    <div clss="w-full flex justify-end items-end">
        <button type="submit" class="bg-dark w-max p-2 rounded-md">Add Service</button> 
    </div>
    </form>
    `,
    showConfirmButton: false,
  });
};
const deleteService = (id, name) => {
  console.log(id);
  Swal.fire({
    title: "Are you sure?",
    text: `really you want to delete ${name} Service..`,
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: "Yes",
    denyButtonText: `No`,
    icon: "question",
  }).then(async (result) => {
    if (result.isConfirmed) {
      let response = await callAPI(`/owner/services/${id}`, {}, "DELETE");
      toast.show(response.success ? "success" : "error", response.message);
      if (response.success)
        setTimeout(() => {
          location.href = "/owner/services";
        }, 2500);
    }
  });
};
