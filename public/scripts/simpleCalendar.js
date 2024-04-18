let date = new Date();
let year = date.getFullYear();
let month = date.getMonth();

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

const displaySlots = async (e) => {
  const date = e.target.innerText;
  let data = year + "-";
  if (month < 10) data += 0;
  data += month + "-";
  if (date.length == 1) data += 0;
  data += date;

  let slotListing = document.getElementById('slot-listing');
  slotListing.style.display = '';
  let slotBody = document.getElementById('slot-body');
  const index = document.getElementById('garage-select').value;

  const garage = garages[index];
  let startTime = new Date(garage.open_time).getTime();
  let endTime = new Date(garage.close_time).getTime();
  let increment = 3600000;

  let str = "";
  while (startTime < endTime && startTime + increment < endTime) {
    str += `<tr><td>${new Date(startTime).getHours()}:${new Date(startTime).getMinutes()} - ${new Date(startTime + increment).getHours()}:${new Date(startTime + increment).getMinutes()}</td><td>add</td></tr>`;
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