const getTaskGarages = async () => {
  let response = await callAPI(`/owner/garages/getGaragesList`);
  response.garages.forEach((element) => {
    let option = document.createElement("option");
    option.value = element.garage_id;
    option.textContent = element.garage_name;
    document.getElementById("garage-list").appendChild(option);
  });
  getVehicleTasks();
};

const getVehicleTasks = async () => {
  let garageId = document.getElementById("garage-list").value;
  let response = await callAPI(`/owner/getVehicleStatus/${garageId}`);
  let tasksList = ``;
  let i = 1;
  if (response.result.length == 0) {
    tasksList += `<p class="text-red text-xl">No vehicle available..</p>`;
    document.getElementById("task-list").innerHTML = tasksList;
  } else {
    tasksList += `<table class="mx-auto w-full" id="task-table">
    <thead class="text-xl">
      <tr class="bg-dark text-white">
        <th class="px-5 py-3">Sr. No.</th>
        <th class="px-5 py-3">Customer Name</th>
        <th class="px-5 py-3">Vehicle Brand</th>
        <th class="px-5 py-3">Vehicle Model</th>
        <th class="px-5 py-3">Model year</th>
        <th class="px-5 py-3">Number Plate</th>
        <th class="px-5 py-3">Status</th>
      </tr>
    </thead>`;
    response.result.forEach((element) => {
      tasksList += `<tbody class="text-xl" id="task-body">`;
      tasksList += `<tr class="text-lg border-b-2 border-dark hover:bg-lightbg">
      <td class="py-5">${i++}</td>
      <td>${element.customer_name}</td>
      <td>${element.brand}</td>
      <td>${element.model}</td>
      <td>${element.year}</td>
      <td>${element.register_plate_number}</td>
      <td>
        <select class="bg-dark text-white rounded-xl p-2">
          <option value="0">Pending</option>
          <option value="1">In progress</option>
          <option value="2">Completed</option>
        </select>
      </td>
      </tr>`;
    });
    tasksList += `</tbody>`;
    document.getElementById("task-list").innerHTML = tasksList;
  }
};

getTaskGarages();
