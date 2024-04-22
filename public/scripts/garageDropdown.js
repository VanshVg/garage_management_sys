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
  getInvoices()
};

const getInvoices = async () => {
  let garageId = document.getElementById("select-garage").value 
  let invoiceRequest = await fetch("/owner/garages/appointments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ garageId: garageId }),
  });
  let invoiceResponse = await invoiceRequest.json();
  let garageAppointments = ``
  if(invoiceResponse.appointments.length == 0) {
    garageAppointments+= `<p class="text-center text-lg text-red">No appointment has taken place yet.</p>`
  } else {
    garageAppointments+= `<table class="mx-auto w-full border-b-[1px] border-black">
    <thead>
      <tr class="bg-dark text-white">
        <th class="p-2">Sr. No.</th>
        <th>Appointment Date</th>
        <th>Customer Name</th>
        <th>Payment Status</th>
        <th>Invoice</th>
      </tr>
    </thead>`
    let i=0;
    invoiceResponse.appointments.forEach((element) => {
      garageAppointments += `<tr class="hover:bg-lightbg">
      <td class="mx-auto text-center p-4">${i+1}</td>
      <td class="mx-auto text-center">${element.start_time.split(" ")[0]}</td>
      <td class="mx-auto text-center">${element.customer_name}</td>`
      if(element.payment_status==0) {
        garageAppointments += `<td class="mx-auto text-center"><p class="mx-auto py-[5px] rounded-lg bg-red text-white w-[100px] mt-2">Pending</p></td>`
      } else {
        garageAppointments += `<td class="mx-auto text-center"><p class="mx-auto py-[5px] rounded-lg bg-green text-white w-[100px] mt-2">Completed</p></td>`
      }
      if(element.invoice_url != null && element.invoice_url != "") {
        garageAppointments += `<td class="mx-auto text-center underline text-linkBlue"><a id="download-invoice" href="/invoices/${element.invoice_url}.pdf" download="invoice.pdf"><p class="hover:cursor-pointer">Download here</p></a></td>`
      } else{
        garageAppointments += `<td class="mx-auto text-center underline text-linkBlue"><a id="download-invoice"><p class="hover:cursor-pointer" onclick="generateInvoice(` + `${element.appointment_id}` + `,`+`  '${element.customer_email}'` + `)">Generate Invoice</p></a></td>`
      }
      garageAppointments += `</tr> </tbody></table>`
      i++;
    })
  }
  if(document.getElementById("garage-appointments")) {
    document.getElementById("garage-appointments").innerHTML = garageAppointments
  }
};

garagesList();
