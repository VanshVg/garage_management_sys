let generateInvoice = async (appointmentId, customerEmail) => {
  let pdfRequest = await fetch(`/invoice/generate/${appointmentId}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({customerEmail})
  });
  let response = await pdfRequest.json();
  if(response.success) {
    window.location.href = "/owner/invoice"
  }
}