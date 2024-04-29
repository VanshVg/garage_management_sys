const showAppointments = async () => {
  document.getElementById("user-appointments").classList.remove("hidden");
  document.getElementById("user-appointments").classList.add("flex");
  document.getElementById("user-profile").classList.remove("flex");
  document.getElementById("user-profile").classList.add("hidden");
  let appointmentRequest = await callAPI(`/customer/appointments`);
  let userAppointments = `<table class="mx-auto w-full">
  <thead class="text-xl">
    <tr class="bg-dark text-white">
      <th class="py-3">Sr. No.</th>
      <th class="py-3">Garage Name</th>
      <th class="py-3">Appointment Date</th>
      <th class="py-3">Appointment Status</th>
    </tr>
  </thead>
  <tbody>`;
  let i = 1;
  appointmentRequest.result.forEach((element) => {
    userAppointments += `<tr
    class="text-lg border-b-2 border-dark hover:bg-lightbg text-center"
  >
    <td class="py-5">${i}</td>
    <td class="py-5">${element.garage_name}</td>
    <td class="py-5">${element.start_time}</td>`;
    if (element.status == 1) {
      userAppointments += `<td class="py-5 text-red">Pending</td>`;
    } else if (element.status == 2) {
      userAppointments += `<td class="py-5 text-green">Approved</td>`;
    } else {
      userAppointments += `<td class="py-5 text-red">Rejected</td>`;
    }
    userAppointments += `</tr>`;
  });
  userAppointments += `</tbody> </table>`;
  document.getElementById("user-appointments").innerHTML = userAppointments;
};
