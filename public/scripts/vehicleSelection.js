const vehicleSelectionNext = () => {
  let fields = document.getElementsByName("vehicle");
  let type;
  fields.forEach((element) => {
    if(element.checked) {
      type = element.value;
    }
  })
  if(!type) {
    document.getElementById("vehicle-type-error").style.display = "block"
  } else {
    window.location.href = `/customer/addVehicle/${type}`
  }
  console.log(type);
}