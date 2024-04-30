let generateInvoice = async (appointmentId, customerEmail) => {
  let pdfRequest = await fetch(`/invoice/${appointmentId}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ customerEmail }),
  });
  let response = await pdfRequest.json();
  if (response.success) {
    window.open(`/invoices/${response.pdf}.pdf`, "_blank");
    let deletePdf = await fetch(`/invoice/${response.pdf}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
