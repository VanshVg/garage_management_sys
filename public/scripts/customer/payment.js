const payment = () => {
  Swal.fire({
    title: "Make Payment",
    text: "to Book appointment please pay required charges..!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, Book it!",
    cancelButtonText: "No, cancel!",
    reverseButtons: true,
  }).then((result) => {
    if (result.isConfirmed) {
      let timerInterval;
      Swal.fire({
        title: "Your Slot Booking is in Preogress..!!",
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
        willClose: () => {
          clearInterval(timerInterval);
        },
      }).then((result) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your Appointment is Booked..",
          showConfirmButton: false,
          timer: 1500,
          didOpen: () => {
            // Swal.showLoading();
          },
          willClose: () => {
            localStorage.clear();
            location.href = "/customer/profile";
            return;
          },
        });
      });
    } else {
      Swal.fire({
        title: "Opps.!!",
        text: "Appointment is not booked..!!",
        icon: "error",
      });
      return;
    }
  });
  return;
};
