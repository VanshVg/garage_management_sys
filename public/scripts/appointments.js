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
    if (window.location.href.includes("customer")) {
      window.location.href = "/customer/profile";
    } else {
      window.location.href = "/owner/invoice";
    }
  }
};
