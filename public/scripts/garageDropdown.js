const getGarages = () => {
  let garages = ["garage1", "garage2", "garage3", "garage4"];
  garages.forEach((element) => {
    let option = document.createElement("option");
    option.id = element;
    option.name = element;
    option.textContent = element;
    document.getElementById("select-garage").appendChild(option)
  })
}

getGarages();