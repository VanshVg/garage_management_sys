let date = new Date();
let year = date.getFullYear();
let month = date.getMonth();
let slots;
let slotDate;

(async () => {
  const result = await callAPI('/owner/garages/getGaragesList');
  garages = result.garages;
  let options = "";
  var i = 0;

  garages.forEach(garage => {
    options += `<option value=${i++}>${garage.garage_name}</option>`;
  });
  const select = document.getElementById('garage-select');
  select.innerHTML = options;
  select.addEventListener('change', displaySlots);
})()

const day = document
  .querySelector(".calendar-dates");

const currDate = document
  .querySelector(".calendar-current-date");

const preNexIcons = document
  .querySelectorAll(".calendar-navigation span");

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const addSlot = async (e) => {
  const index = document.getElementById('garage-select').value;
  const garageId = garages[index].garage_id;
  let slot = e.target.previousSibling.childNodes[0];
  slot = slot.innerText || slot.textContent;
  const startTime = slot.slice(0, 5);
  const endTime = slot.slice(-5);
  let startDate = year + "-";
  if (month + 1 < 10) startDate += 0;
  startDate += month + 1 + "-";
  if (slotDate.length == 1) startDate += 0;
  startDate += slotDate;
  let endDate = startDate + " " + endTime;
  startDate += " " + startTime;
  const formData = new FormData();
  formData.append('garageId', garageId);
  formData.append('startTime', startDate);
  formData.append('endTime', endDate);
  const myData = await fetch('/owner/slots/insert', {
    method: "POST",
    body: new URLSearchParams(formData)
  });
  const json = await myData.json();
  console.log(json);
  displaySlots();
}

const displaySlots = async (e = null) => {
  if (e && e.target.id == "slotDiff") {
  }
  else {
    if (e && e.target.innerText != '') {
      slotDate = e.target.innerText;
      document.getElementsByClassName('activeDate')[0].classList.remove('activeDate');
      e.target.classList.add('activeDate')
    }
    let startDate = year + "-";
    if (month + 1 < 10) startDate += 0;
    startDate += month + 1 + "-";
    if (slotDate.length == 1) startDate += 0;
    startDate += slotDate;
    const time = new Date(startDate).getTime();
    const tempDate = new Date(time + 24 * 60 * 60 * 1000);
    const endYear = tempDate.getFullYear();
    const endMonth = tempDate.getMonth();
    const endDay = tempDate.getDate();
    let endDate = endYear + "-";
    if (endMonth + 1 < 10) endDate += 0;
    endDate += endMonth + 1 + "-";
    if (endDay.length == 1) endDate += 0;
    endDate += endDay;
    let formData = new FormData();
    let index = document.getElementById('garage-select').value;
    formData.append("garageId", garages[index].garage_id);
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);

    const slotDetails = await fetch('/owner/garages/slots', {
      method: "POST",
      body: new URLSearchParams(formData),
    });
    slots = await slotDetails.json();
  }

  let slotListing = document.getElementById('slot-listing');
  slotListing.style.display = '';
  let slotBody = document.getElementById('slot-body');
  const index = document.getElementById('garage-select').value;

  let interval = document.getElementById('slotDiff').value || 1;
  const garage = garages[index];
  let startTime = new Date(garage.open_time);
  startTime.setFullYear(year);
  startTime.setMonth(month);
  startTime.setDate(slotDate);
  startTime = startTime.getTime();
  let endTime = new Date(garage.close_time);
  endTime.setFullYear(year);
  endTime.setMonth(month);
  endTime.setDate(slotDate);
  endTime = endTime.getTime();
  let increment = 3600000 * interval;

  let str = "";
  while (startTime < endTime && startTime + increment < endTime) {
    let flag = false;
    slots.forEach(slot => {
      let start = new Date(slot.startTime).getTime();
      let end = new Date(slot.endTime).getTime();
      if ((start >= startTime && start < startTime + increment) || (end > startTime && end < startTime + increment)) {
        while (startTime < end) {
          str += `<tr><td class="red">${('0' + new Date(startTime).getHours()).slice(-2)}:${('0' + new Date(startTime).getMinutes()).slice(-2)} - ${('0' + new Date(startTime + increment).getHours()).slice(-2)}:${('0' + new Date(startTime + increment).getMinutes()).slice(-2)}</td><td class="red">add</td></tr>`;
          startTime += increment;
        }
        flag = true;
        return;
      }
    });
    if (flag) continue;

    str += `<tr><td>${('0' + new Date(startTime).getHours()).slice(-2)}:${('0' + new Date(startTime).getMinutes()).slice(-2)} - ${('0' + new Date(startTime + increment).getHours()).slice(-2)}:${('0' + new Date(startTime + increment).getMinutes()).slice(-2)}</td><td onclick="addSlot(event)" class="btn">add</td></tr>`;
    startTime += increment;
  }
  slotBody.innerHTML = str;
}

const manipulate = () => {
  let dayOne = new Date(year, month, 1).getDay(); // 0 - sunday
  let lastDate = new Date(year, month + 1, 0).getDate(); // 31 - january
  let dayEnd = new Date(year, month, lastDate).getDay();
  let lastMonthDate = new Date(year, month, 0).getDate();
  let lit = "";

  for (let i = dayOne; i > 0; i--) {
    lit +=
      `<li class="inactiveDate">${lastMonthDate - i + 1}</li>`;
  }

  for (let i = 1; i <= lastDate; i++) {
    if (i == new Date().getDate() && month == new Date().getMonth() && year == new Date().getFullYear()) {
      lit += `<li class="activeDate date">${i}</li>`;
    }
    else if (year > new Date().getFullYear()) {
      lit += `<li class="date">${i}</li>`;
    }
    else if (month > new Date().getMonth() && year == new Date().getFullYear()) {
      lit += `<li class="date">${i}</li>`;
    }
    else if (i > new Date().getDate() && month == new Date().getMonth() && year == new Date().getFullYear()) {
      lit += `<li class="date">${i}</li>`;
    }
    else {
      lit += `<li class="inactiveDate">${i}</li>`;
    }
  }

  for (let i = dayEnd; i < 6; i++) {
    lit += `<li class="inactiveDate">${i - dayEnd + 1}</li>`
  }

  currDate.innerText = `${months[month]} ${year}`;
  day.innerHTML = lit;

  const dates = document.querySelectorAll('#simpleCalendar .date');
  dates.forEach(date => {
    date.addEventListener('click', displaySlots);
  });
}

manipulate();

preNexIcons.forEach(icon => {
  icon.addEventListener("click", () => {
    month = icon.id === "calendar-prev" ? month - 1 : month + 1;

    if (month < 0 || month > 11) {
      date = new Date(year, month, new Date().getDate());
      year = date.getFullYear();
      month = date.getMonth();
    }
    else {
      date = new Date();
    }
    manipulate();
  });
});