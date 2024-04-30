const showUserVehicles = async () => {
  document.getElementById("user-vehicles").classList.remove("hidden");
  document.getElementById("user-vehicles").classList.add("flex");
  document.getElementById("user-profile").classList.remove("flex");
  document.getElementById("user-profile").classList.add("hidden");
  document.getElementById("user-appointments").classList.remove("flex");
  document.getElementById("user-appointments").classList.add("hidden");
  document.getElementById("btn-full").classList.remove("opacity-100");
  document.getElementById("btn-full").classList.add("opacity-50");
  document.getElementById("btn-double").classList.remove("opacity-50");
  document.getElementById("btn-double").classList.add("opacity-100");
  document.getElementById("btn-half").classList.remove("opacity-100");
  document.getElementById("btn-half").classList.add("opacity-50");

  let appointmentRequest = await callAPI(`/customer/viewVehicles`);
  let userVehicles = ``;
  appointmentRequest.result.forEach((element) => {
    userVehicles += `
    <div class="w-[calc(100%/3)] px-5 mt-5">
      <div class="bg-dark text-white border-2 border-[silver]">
        <div class="flex border-2">
          <div class="w-[35%] py-3">
            <img
              src="/uploads/${element.condition_image}"
              class="h-[120px] w-[120px] bg-cover mx-auto border-2 rounded-md"
            />
          </div>
        <div class="my-auto">
         <p>
            Number Plate:<span class="ml-2 text-[silver]">
              ${element.register_plate_number}</span
            >
          </p>
          <p class="mt-3">
            Brand:
            <span class="text-lg ml-2 text-[silver]">
              ${element.brand}</span
            >
          </p>
          <p class="mt-3">
            Model: <span class="text-lg ml-2 text-[silver]"> ${element.model} </span>
          </p>
        </div>
      </div>
    </div> </div>`;
  });
  document.getElementById("vehicle-card").innerHTML = userVehicles;
};
