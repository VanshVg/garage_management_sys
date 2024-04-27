const book = () => {
  Swal.fire({
    title: "Are you sure ?",
    text: "you want to book Appointment..!!",
    icon: "info",
    showCancelButton: true,
    confirmButtonText: "Yes, Book it!",
    cancelButtonText: "No, cancel!",
    reverseButtons: true,
  }).then(async (result) => {
    if (result.isConfirmed) {
      //book logic
      let garageId = localStorage.getItem("garageId");
      let serviceId = localStorage.getItem("serviceId");
      let vehicleId = localStorage.getItem("vehicleId");
      let slotId = localStorage.getItem("slotId");
      try {
        let response = await callAPI(
          "/customer/bookAppointment",
          { garageId, serviceId, vehicleId, slotId },
          "POST"
        );
        toast.show(response.success ? "success" : "error", response.message);
      } catch (error) {
        toast.show("error", error);
      }
    } else {
      let formPlace = document.getElementById('other');
      formPlace.style.display = "flex";
      formPlace.style.zIndex = 9999999;
    }
  });
  //     Swal.fire({
  //       width: "800px",
  //       showConfirmButton: false,
  //       html: `
  //       <div class="mx-auto px-4" id="payment-container">
  //     <h1 class="text-center text-dark text-3xl font-bold">Payment Details</h1>
  //     <p class="text-center mt-5 text-lg text-dark">
  //       Payment of : Slot Booking Charges (₹ 20 /-)
  //     </p>
  //     <div class="mx-auto mt-10 bg-white rounded-md py-10">
  //       <div class="flex mx-auto justify-between">
  //         <label class="text-dark text-lg font-semibold  text-left">Choose a payment type:</label>
  //         <select
  //           class="rounded-lg  px-2 py-2 h-[40px] my-auto text-dark w-3/5 text-sm bg-lightbg"
  //           id="payment-type"
  //           onchange="changePayment()"
  //           name="paymentType"
  //         >
  //           <option value="card">Debit Card/Credit Card</option>
  //           <option value="upi">UPI</option>
  //           <option value="net banking">Net Banking</option>
  //           <option value="cash">Cash</option>
  //         </select>
  //       </div>
  //       <div class="flex justify-between mt-5" id="bank-section">
  //         <label class="text-dark text-lg font-semibold  text-left">Choose your bank: </label>
  //         <select
  //           class="rounded-lg  px-2 py-2 h-[40px] my-auto text-dark w-3/5 text-sm bg-lightbg"
  //           name="bankName"
  //         >
  //           <option value="sbi">SBI Bank</option>
  //           <option value="hdfc">HDFC Bank</option>
  //           <option value="bob">Bank of Baroda</option>
  //           <option value="icici">ICICI Bank</option>
  //           <option value="axis">Axis Bank</option>
  //         </select>
  //       </div>
  //       <div
  //         class="bg-dark h-[1px] w-[700px] mx-auto mt-10"
  //         id="payment-line"
  //       ></div>
  //       <div class="w-full" id="card-section">
  //         <h2 class="text-2xl text-dark font-bold">Card Details</h2>
  //         <div class="flex justify-center mt-5">
  //           <label class="text-dark text-lg">Card Number: </label>
  //           <input
  //             class="ml-[72px] rounded h-[30px] bg-lightbg placeholder:text-dark placeholder:opacity-70 px-2"
  //             name="cardNumber"
  //             type="text"
  //             placeholder="Enter card number"
  //           />
  //         </div>
  //         <div class="flex justify-center mt-5">
  //           <label class="text-dark text-lg">Account holder name: </label>
  //           <input
  //             class="ml-2 rounded h-[30px] bg-lightbg placeholder:text-dark placeholder:opacity-70 px-2"
  //             name="accountHolder"
  //             type="text"
  //             placeholder="Enter card holder name"
  //           />
  //         </div>
  //         <div class="flex justify-center">
  //           <div class="flex justify-center mt-5">
  //             <label class="text-dark text-lg">CVV: </label>
  //             <input
  //               class="ml-2 rounded h-[30px] w-[50px] bg-lightbg placeholder:text-2xl placeholder:text-dark placeholder:opacity-60 px-2"
  //               name="cvv"
  //               type="text"
  //               maxlength="3"
  //               placeholder="- - -"
  //             />
  //           </div>
  //           <div class="flex justify-center mt-5 ml-[85px]">
  //             <label class="text-dark text-lg">Expiry Date: </label>
  //             <input
  //               class="ml-[35px] rounded h-[30px] w-[100px] bg-lightbg placeholder:text-dark placeholder:opacity-60 px-2"
  //               name="expiryDate"
  //               type="text"
  //               placeholder="MM-YYYY"
  //             />
  //           </div>
  //         </div>
  //       </div>
  //       <div class="mt-5 hidden" id="upi-section">
  //         <h2 class="text-center text-2xl text-dark">UPI Details</h2>
  //         <div class="flex justify-center mt-5">
  //           <label class="text-dark text-lg">UPI Id: </label>
  //           <input
  //             class="ml-2 rounded h-[30px] bg-lightbg placeholder:text-dark placeholder:opacity-70 px-2"
  //             name="upi"
  //             type="text"
  //             placeholder="Enter your UPI id"
  //           />
  //         </div>
  //       </div>
  //       <div class="mt-10">
  //         <p
  //           class="text-center text-white mx-auto pt-[13px] rounded bg-dark w-[120px] h-[50px] hover:cursor-pointer"
  //         >
  //           Pay Now
  //         </p>
  //       </div>
  //     </div>
  //   </div>
  // `,
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         let timerInterval;
  //         Swal.fire({
  //           title: "Your Slot Booking is in Preogress..!!",
  //           timer: 2000,
  //           timerProgressBar: true,
  //           didOpen: () => {
  //             Swal.showLoading();
  //           },
  //           willClose: () => {
  //             clearInterval(timerInterval);
  //           },
  //         }).then((result) => {
  //           Swal.fire({
  //             position: "top-end",
  //             icon: "success",
  //             title: "Your Appointment is Booked..",
  //             showConfirmButton: false,
  //             timer: 1500,
  //             didOpen: () => {
  //               // Swal.showLoading();
  //             },
  //             willClose: () => {
  //               localStorage.clear();
  //               location.href = "/customer/profile";
  //               return;
  //             },
  //           });
  //         });
  //       }
  //     });
  //   } else {
  //     Swal.fire({
  //       title: "Opps.!!",
  //       text: "Appointment is not booked..!!",
  //       icon: "error",
  //     });
  //     return;
  //   }
  // });
  return;
};
