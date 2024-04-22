const changePayment = () => {
  let paymentType = document.getElementById("payment-type");
  let bankSection = document.getElementById("bank-section");
  let cardSection = document.getElementById("card-section");
  let paymentLine = document.getElementById("payment-line");
  let upiSection = document.getElementById("upi-section");
  
  if(paymentType.value == "card") {
    bankSection.style.display = "";
    cardSection.style.display = "block";
    paymentLine.style.display = "block";
    upiSection.style.display = "none";
  }
  if(paymentType.value == "upi") {
    bankSection.style.display = "";
    cardSection.style.display = "none";
    paymentLine.style.display = "block";
    upiSection.style.display = "block";
  }
  if(paymentType.value == "net banking") {
    bankSection.style.display = "";
    cardSection.style.display = "none";
    paymentLine.style.display = "none";
    upiSection.style.display = "none";
  }
  if(paymentType.value == "cash") {
    bankSection.style.display = "none";
    cardSection.style.display = "none";
    paymentLine.style.display = "none";
    upiSection.style.display = "none";
  }
}

const addPayment = async() => {

  let fields = document.getElementById("payment-container").querySelectorAll("*");
  let data = {};
  fields.forEach((element) => {
    if(element.tagName == "INPUT" || element.tagName == "SELECT") {
      data[element.name] = element.value;
    }
  })
  console.log(data);
  let url = window.location.href;
  url = url.split("/");
  let appointmentId = url[url.length-1];
  
  let paymentRequest = await fetch(`/payment/${appointmentId}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data)
  });
  let paymentResponse = await paymentRequest.json();
  if(paymentResponse.success) {
    Swal.fire({
      title: "Good job!",
      text: "Payment is done",
      icon: "success",
      showConfirmButton: false,
      timer: 1500,
      allowOutsideClick: false,
    });
  }
}