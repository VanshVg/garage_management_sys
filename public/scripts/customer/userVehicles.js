const showUserVehicles = async () => {
  document.getElementById("user-vehicles").classList.remove("hidden");
  document.getElementById("user-vehicles").classList.add("flex");
  document.getElementById("user-profile").classList.remove("flex");
  document.getElementById("user-profile").classList.add("hidden");
  document.getElementById("user-appointments").classList.remove("flex");
  document.getElementById("user-appointments").classList.add("hidden");

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
    console.log(userVehicles);
  });
  document.getElementById("vehicle-card").innerHTML = userVehicles;
};
