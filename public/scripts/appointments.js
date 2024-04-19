const downloadInvoice = async (appointmentId) => {
  // let pdfRequest = await fetch(`/customer/invoice/${appointmentId}`, {
  //   method: "GET",
  //   headers: {
  //     "content-type": "application/json",
  //   },
  // });
  // let response = await pdfRequest.json();
  // if(response.success) {
    let downloadRequest = await fetch(`/customer/downloadInvoice/${appointmentId}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });
    let downloadResponse = await downloadRequest.json();
    if(downloadResponse.success) {
      document.getElementById("download-invoice").setAttribute("href", `/invoices/${downloadResponse.pdf}.pdf`);
      document.getElementById("download-invoice").setAttribute("download", "invoice.pdf");
  }
// }
}
