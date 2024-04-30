const garagesList = async () => {
  let garageRequest = await fetch(`/owner/garages/getGaragesList`);
  let garageResponse = await garageRequest.json();
  let selectGarage = document.getElementById("select-garage");
  garageResponse.garages.forEach((element) => {
    let option = document.createElement("option");
    option.name = element.garage_id;
    option.textContent = element.garage_name;
    option.value = element.garage_id;
    selectGarage.appendChild(option);
  });
  getInvoices();
};

const getInvoices = async () => {
  let garageId = document.getElementById("select-garage").value;
  let invoiceRequest = await fetch(`/owner/garages/appointments/${garageId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let invoiceResponse = await invoiceRequest.json();
  let garageAppointments = ``;

  if (invoiceResponse.appointments.length == 0) {
    garageAppointments += `<div class="w-full h-[80vh] flex justify-center items-center flex-col">
        <svg class="fill-[#ef4444]" width="100px" height="100px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M520.741 163.801a10.234 10.234 0 00-3.406-3.406c-4.827-2.946-11.129-1.421-14.075 3.406L80.258 856.874a10.236 10.236 0 00-1.499 5.335c0 5.655 4.585 10.24 10.24 10.24h846.004c1.882 0 3.728-.519 5.335-1.499 4.827-2.946 6.352-9.248 3.406-14.075L520.742 163.802zm43.703-26.674L987.446 830.2c17.678 28.964 8.528 66.774-20.436 84.452a61.445 61.445 0 01-32.008 8.996H88.998c-33.932 0-61.44-27.508-61.44-61.44a61.445 61.445 0 018.996-32.008l423.002-693.073c17.678-28.964 55.488-38.113 84.452-20.436a61.438 61.438 0 0120.436 20.436zM512 778.24c22.622 0 40.96-18.338 40.96-40.96s-18.338-40.96-40.96-40.96-40.96 18.338-40.96 40.96 18.338 40.96 40.96 40.96zm0-440.32c-22.622 0-40.96 18.338-40.96 40.96v225.28c0 22.622 18.338 40.96 40.96 40.96s40.96-18.338 40.96-40.96V378.88c0-22.622-18.338-40.96-40.96-40.96z"/></svg>
        <h2 class="text-[#ef4444] font-bold text-2xl">Oops..!!</h2><p class="text-[#ef4444]"><b>No appointment has taken place yet...!!!</b></p>
  </div>`;
  } else {
    garageAppointments += `<table class="mx-auto w-full border-b-[1px] border-black">
    <thead>
      <tr class="bg-dark text-white">
        <th class="p-2">Sr. No.</th>
        <th>Appointment Date</th>
        <th>Customer Name</th>
        <th>Payment Status</th>
        <th>Invoice</th>
      </tr>
    </thead>`;
    let i = 0;
    invoiceResponse.appointments.forEach((element) => {
      garageAppointments += `<tr class="hover:bg-lightbg">
      <td class="mx-auto text-center p-4">${i + 1}</td>
      <td class="mx-auto text-center">${element.start_time.split(" ")[0]}</td>
      <td class="mx-auto text-center">${element.customer_name}</td>`;
      if (element.payment_status == 0) {
        garageAppointments += `<td class="mx-auto text-center text-red">Pending</td>`;
      } else {
        garageAppointments += `<td class="mx-auto text-center text-green">Completed</td>`;
      }
      if (element.invoice_url != null && element.invoice_url != "") {
        garageAppointments += `<td class="mx-auto text-center underline text-linkBlue"><a id="download-invoice" href="/invoices/${element.invoice_url}.pdf" download="invoice.pdf"><p class="hover:cursor-pointer">Download here</p></a></td>`;
      } else {
        garageAppointments +=
          `<td class="mx-auto text-center underline text-linkBlue"><a id="download-invoice"><p class="hover:cursor-pointer" onclick="generateInvoice(` +
          `${element.appointment_id}` +
          `,` +
          `  '${element.customer_email}'` +
          `)">Generate Invoice</p></a></td>`;
      }
      garageAppointments += `</tr>`;
      i++;
    });
    garageAppointments += `</tbody></table>`;
  }
  if (document.getElementById("garage-appointments")) {
    document.getElementById("garage-appointments").innerHTML =
      garageAppointments;
  }
};
