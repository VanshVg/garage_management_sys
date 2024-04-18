const handleSlots = () => {
  let labels = document.querySelectorAll("label");
  labels.forEach(element => {
    element.style.backgroundColor = 'burlywood';
  });
  let value = document.querySelector('.test:checked');
  value.parentNode.style.backgroundColor = 'white';
}

const populateSlots = async () => {
  let payLoad = {
    "garageId": '1',
    "startDate": '2020-01-01',
    "endDate": '2020-01-02'
  }
  let data = await fetch('/customer/getslots', {
    method: "post",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(payLoad)
  });
  let result = await data.json();
  if (result.length == 0) {
    let slotDisplay = document.getElementById("slotDisplay");
    slotDisplay.innerHTML += ` <p class="font-serif text-2xl text-white">No Slot Avaliable</p>`;
  }
  result.forEach((element) => {
    let slotDisplay = document.getElementById("slotDisplay");
    slotDisplay.innerHTML += `<label class="rounded-lg w-68 h-14 m-5 bg-lightorange text-xl flex items-center justify-center"
          tabindex="1">
          <input class="test" type="radio" name="test" value="${element.id}" onclick="handleSlots()">
          <p class="font-sans hover:font-serif text-xl text-blue">
            ${element.startTime}-${element.endTime}
          </p>
        </label>`
  });
}

populateSlots();