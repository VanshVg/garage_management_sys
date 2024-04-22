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