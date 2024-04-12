const showServices = () => {
  let services = ["Service1", "Service2", "Service3", "Service4"];
  let select = document.createElement("select");
  select.id = "service-name";
  services.forEach((element) => {
    let option = document.createElement("option");
    option.value = element;
    option.name = element;
    option.textContent = element;
    select.appendChild(option);
  });
  document.getElementsByClassName("select-service")[0].appendChild(select);
};

const addService = async () => {
  let value = document.getElementById("service-name").value;
  let body = {
    name: value,
  };

  let data = await fetch(`/owner/service/1`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  let response = await data.json();
  if(response.success==true) {
    window.location.href = "/owner/home"
  } else {
    if(document.getElementById("error")) {
      document.getElementById("error").remove()
    }
    let error = document.createElement("p");
    error.id = "error";
    error.style.color = "red";
    error.textContent = response.message;
    document.getElementsByClassName("service-top")[0].appendChild(error)
  }
};

const showAddService = () => {
  document.getElementsByClassName("add-service-container")[0].style.display = "block";
  document.getElementsByClassName("service-container")[0].style.display = "none";
}

const showAllServices = () => {
  document.getElementsByClassName("add-service-container")[0].style.display = "none";
  document.getElementsByClassName("service-container")[0].style.display = "block";
}

showServices();
