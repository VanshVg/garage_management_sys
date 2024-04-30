const showAppointments = async () => {
  document.getElementById("user-appointments").classList.remove("hidden");
  document.getElementById("user-appointments").classList.add("flex");
  document.getElementById("user-profile").classList.remove("flex");
  document.getElementById("user-profile").classList.add("hidden");
  document.getElementById("user-vehicles").classList.remove("flex");
  document.getElementById("user-vehicles").classList.add("hidden");
  document.getElementById("btn-half").classList.remove("opacity-100");
  document.getElementById("btn-half").classList.add("opacity-50");
  document.getElementById("btn-full").classList.remove("opacity-50");
  document.getElementById("btn-full").classList.add("opacity-100");
  document.getElementById("btn-double").classList.remove("opacity-100");
  document.getElementById("btn-double").classList.add("opacity-50");

  let appointmentRequest = await callAPI(`/customer/appointments`);
  let userAppointments = `<table class="mx-auto w-full">
  <thead class="text-xl">
    <tr class="bg-dark text-white">
      <th class="py-3">Sr. No.</th>
      <th class="py-3">Garage Name</th>
      <th class="py-3">Appointment Date</th>
      <th class="py-3">Appointment Status</th>
      <th class="py-3">Vehicle Status</th>
      <th class="py-3">Invoice</th>
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
    if (element.vehicle_status == 1 && element.status != 3) {
      userAppointments += `<td class="py-5 text-red">To Do</td>`;
    } else if (element.vehicle_status == 2 && element.status != 3) {
      if (element.payment_status == 2) {
        userAppointments += `<td class="py-5 text-green">Completed</td>`;
      } else {
        userAppointments += `<td class="py-5"><p class="bg-dark text-white p-2 w-[150px] mx-auto rounded-md hover:cursor-pointer" onclick="getPayment(${element.appointment_id})"}>Pay Now</p></td>`;
      }
    } else {
      userAppointments += `<td class="py-5 text-red">In Progress</td>`;
    }
    if (
      element.vehicle_status == 2 &&
      element.status == 2 &&
      element.payment_status == 2
    ) {
      if (element.invoice_url != null && element.invoice_url != "") {
        userAppointments += `<td class="mx-auto text-center underline text-linkBlue"><a id="download-invoice" href="/invoices/${element.invoice_url}.pdf" download="invoice.pdf"><p class="hover:cursor-pointer">Download here</p></a></td>`;
      } else {
        userAppointments +=
          `<td class="mx-auto text-center underline text-linkBlue"><a id="download-invoice"><p class="hover:cursor-pointer" onclick="generateInvoice(` +
          `${element.appointment_id}` +
          `,` +
          `  '${element.customer_email}'` +
          `)">Generate Invoice</p></a></td>`;
      }
    } else {
      userAppointments += `<td>-</td></td>`;
    }
    userAppointments += `</tr>`;
    i++;
  });
  userAppointments += `</tbody> </table>`;
  document.getElementById("user-appointments").innerHTML = userAppointments;
};

const getPayment = (appointmentId) => {
  window.location.href = `/customer/payment/${appointmentId}`;
};
