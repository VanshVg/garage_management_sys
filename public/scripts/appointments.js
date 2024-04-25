let generateInvoice = async (appointmentId, customerEmail) => {
  console.log(appointmentId);
  let pdfRequest = await fetch(`/invoice/${appointmentId}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ customerEmail }),
  });
  console.log(pdfRequest);
  let response = await pdfRequest.json();
  if (response.success) {
    window.location.href = "/owner/invoice";
  }
};
