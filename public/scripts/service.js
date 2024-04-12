let showServices = () => {
  console.log("Inside");
  let services = ["Service1", "Service2", "Service3", "Service4"];
  let select = document.createElement("select");
  services.forEach((element) => {
    let option = document.createElement("option");
    option.value = element;
    option.name = element;
    option.textContent = element
    select.appendChild(option);
  })
  document.getElementsByClassName("select-service")[0].appendChild(select);
}

showServices();