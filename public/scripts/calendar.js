const holidays = [
  {
    date: "13-04-2024",
    holiday: "saturday"
  }
];

const calendar = document.querySelector("#calendar");
const monthBanner = document.querySelector("#calendar-month");
let navigation = 0;
let clicked = null;

let events = [{
  date: "14-04-2024",
  title: "something"
}];

const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const loadCalendar = () => {
  const date = new Date();

  if (navigation != 0) {
    date.setMonth(new Date().getMonth() + navigation);
  }

  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  monthBanner.innerText = `${date.toLocaleDateString("en-us", {
    month: "long",
  })} ${year}`;

  calendar.innerHTML = "";
  const dayInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1);
  const dateText = firstDayOfMonth.toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  const dayString = dateText.split(", ")[0];
  const emptyDays = weekdays.indexOf(dayString);

  for (let i = 1; i <= dayInMonth + emptyDays; i++) {
    const dayBox = document.createElement("div");
    dayBox.classList.add("day");
    const monthVal = month + 1 < 10 ? "0" + (month + 1) : month + 1;
    const dateVal = i - emptyDays < 10 ? "0" + (i - emptyDays) : i - emptyDays;
    const dateText = `${year}-${monthVal}-${dateVal}`;
    if (i > emptyDays) {
      dayBox.innerText = i - emptyDays;
      const eventOfTheDay = events.find((e) => e.date == dateText);
      const holidayOfTheDay = holidays.find((e) => e.date == dateText);

      if (i - emptyDays === day && navigation == 0) {
        dayBox.id = "currentDay";
      }

      if (eventOfTheDay) {
        const eventDiv = document.createElement("div");
        eventDiv.classList.add("event");
        eventDiv.innerText = eventOfTheDay.title;
        dayBox.appendChild(eventDiv);
      }
      if (holidayOfTheDay) {
        const eventDiv = document.createElement("div");
        eventDiv.classList.add("event");
        eventDiv.classList.add("holiday");
        dayBox.classList.add("red");
        eventDiv.innerText = holidayOfTheDay.holiday;
        dayBox.appendChild(eventDiv);
      }

      dayBox.addEventListener("click", () => {
        showModal(dateText);
      });
    } else {
      dayBox.classList.add("plain");
    }
    calendar.append(dayBox);
  }
}

const buttons = () => {
  const btnBack = document.querySelector("#btnBack");
  const btnNext = document.querySelector("#btnNext");

  btnBack.addEventListener("click", () => {
    navigation--;
    loadCalendar();
  });

  btnNext.addEventListener("click", () => {
    navigation++;
    loadCalendar();
  });

  modal.addEventListener("click", closeModal);
}

const modal = document.querySelector("#modal");
const appointmentsContainer = document.querySelector("#viewAppointments");

const showModal = async (dateText) => {
  clicked = dateText;
  const startDate = new Date(dateText);
  let time = startDate.getTime();
  time += 24 * 60 * 60 * 1000;
  const endDate = new Date(time);
  let garageId = document.querySelector('#garage-select #garageList').value;
  const formData = new FormData();
  formData.append('garageId', garageId);
  formData.append('startDate', startDate.toISOString().slice(0, 19).replace('T', ' '));
  formData.append('endDate', endDate.toISOString().slice(0, 19).replace('T', ' '));
  console.log(formData)

  let result = await fetch('/owner/slots/appointmentsByDateRange', {
    method: "POST",
    body: new URLSearchParams(formData)
  });
  result = await result.json();
  let appointments = result.appointments;
  console.log(appointments);
  const body = document.getElementById('appointment-body');
  let str = "";
  let i = 1;
  appointments.forEach(appointment => {
    str += `<tr>
      <td>${i++}</td>
      <td>${appointment.customerName}</td>
      <td>${appointment.startTime.slice(0, 10)}</td>
      <td>${appointment.startTime.slice(11, 17)} - ${appointment.endTime.slice(11, 17)}</td>
    </tr>`
  });
  body.innerHTML = str;
  appointmentsContainer.style.display = "block";
}

const closeModal = () => {
  appointmentsContainer.style.display = "none";
  addEventForm.style.display = "none";
  modal.style.display = "none";
  clicked = null;
  loadCalendar();
}

buttons();
loadCalendar();