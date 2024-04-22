let date = new Date();
let year = date.getFullYear();
let month = date.getMonth();
let slots;
let slotDate;
let btns = ["btn-half", "btn-full", "btn-double"];
(async () => {
  const result = await callAPI("/owner/garages/getGaragesList");
  garages = result.garages;
  let options = "";
  var i = 0;
  garages.forEach((garage) => {
    options += `<option value=${garage.garage_id}>${garage.garage_name}</option>`;
  });
  const select = document.getElementById("garage-select");
  select.innerHTML = options;
  select.addEventListener("change", displaySlots);
})();

const day = document.querySelector(".calendar-dates");

const currDate = document.querySelector(".calendar-current-date");

const preNexIcons = document.querySelectorAll(".calendar-navigation span");

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
  "December",
];

const addSlot = async (garageId, start, end, date, duration = 1) => {
  date = new Date(date);
  let newStart = date.toISOString().split("T")[0] + " " + start + ":00";
  let newEnd = date.toISOString().split("T")[0] + " " + end + ":00";

  let addedSlot = await callAPI(
    "/owner/slots/insert",
    {
      garageId: garageId,
      startTime: newStart,
      endTime: newEnd,
    },
    "POST"
  );
  displaySlots(duration, date);
};
const generateSlots = ({
  date = new Date(),
  start = "8:00",
  end = "16:00",
  duration = 1,
}) => {
  let slots = [];
  let newStart = new Date(date.toISOString().split("T")[0]);
  newStart.setHours(start.split(":")[0], start.split(":")[1]);
  let newEnd = new Date(date.toISOString().split("T")[0]);
  newEnd.setHours(end.split(":")[0], end.split(":")[1]);
  while (newStart < newEnd) {
    let slot =
      (newStart.getHours() < 10 ? "0" : "") +
      newStart.getHours() +
      ":" +
      (newStart.getMinutes() < 10 ? "0" : "") +
      newStart.getMinutes();
    newStart.setMinutes(newStart.getMinutes() + duration * 60);
    slot +=
      "-" +
      (newStart.getHours() < 10 ? "0" : "") +
      newStart.getHours() +
      ":" +
      (newStart.getMinutes() < 10 ? "0" : "") +
      newStart.getMinutes();
    slots.push(slot);
  }
  return slots;
};
const fetchGarageSlots = async (id) => {
  try {
    let slots = await callAPI("/owner/garages/slots", { garageId: id }, "POST");
    return slots;
  } catch (error) {
    console.log("Something wen't wrong..");
    return [];
  }
};
const displaySlots = async (duration, date = new Date()) => {
  if (duration == 0) {
    toast.show("error", "This feature is not available for you..!!");
  } else {
    document.querySelectorAll(".hours").forEach((btn) => {
      btn.classList.add("opacity-50");
      btn.classList.remove("opacity-100");
    });
    let btn = document.querySelector(`#${btns[parseInt(duration)]}`);
    btn.classList.remove("opacity-50");
    btn.classList.add("opacity-100");
    const selectedGarage = document.getElementById("garage-select").value;
    let availableSlots = await fetchGarageSlots(selectedGarage);
    let time = availableSlots[availableSlots.length - 1];
    let slots = generateSlots({
      date: date,
      start: time.open_time.split(" ")[1],
      end: time.close_time.split(" ")[1],
      duration,
    });
    let slotCard = "";
    slots = slots.filter((slot) => {
      let flag = false;
      let slotStart =
        date.toISOString().split("T")[0] + " " + slot.split("-")[0] + ":00";
      let slotEnd =
        date.toISOString().split("T")[0] + " " + slot.split("-")[1] + ":00";
      availableSlots
        .slice(0, availableSlots.length - 1)
        .forEach((available) => {
          if (
            (available.startTime <= slotStart &&
              available.endTime > slotStart) ||
            (available.startTime < slotEnd && available.endTime >= slotEnd)
          ) {
            flag = true;
            return;
          }
        });
      if (!flag) return slot;
    });
    slots.forEach((slot) => {
      slotCard += `
      <div class="w-1/5 h-[110px] p-2 relative">
                    <div onclick="addSlot('${selectedGarage}','${
        slot.split("-")[0]
      }','${slot.split("-")[1]}','${date}','${duration}')"
                        class="bg-green w-[20px] h-[20px] absolute -top-0 -right-0 rounded-full text-white cursor-pointer">
                        +
                    </div>
                    <div
                        class="cursor-pointer border-2 border-dark bg-dark  h-full w-full rounded-md flex justify-center items-center">
                        <strong class="text-white  text-xs">${slot}</strong>
                    </div>
                </div>
      `;
    });
    document.getElementById("slots-list").innerHTML = slotCard;
  }
  // displaySlots(1);
  // if (e && e.target.id == "slotDiff") {
  // }
  // else {
  //   if (e && e.target.innerText != '') {
  //     slotDate = e.target.innerText;
  //     let active = document.getElementsByClassName('activeDate')[0];
  //     if (active) active.classList.remove('activeDate');
  //     e.target.classList.add('activeDate')
  //   }
  //   let startDate = year + "-";
  //   if (month + 1 < 10) startDate += 0;
  //   startDate += month + 1 + "-";
  //   if (slotDate.length == 1) startDate += 0;
  //   startDate += slotDate;
  //   const time = new Date(startDate).getTime();
  //   const tempDate = new Date(time + 24 * 60 * 60 * 1000);
  //   const endYear = tempDate.getFullYear();
  //   const endMonth = tempDate.getMonth();
  //   const endDay = tempDate.getDate();
  //   let endDate = endYear + "-";
  //   if (endMonth + 1 < 10) endDate += 0;
  //   endDate += endMonth + 1 + "-";
  //   if (endDay.length == 1) endDate += 0;
  //   endDate += endDay;
  //   let formData = new FormData();
  //   let index = document.getElementById('garage-select').value;
  //   formData.append("garageId", garages[index].garage_id);
  //   formData.append("startDate", startDate);
  //   formData.append("endDate", endDate);
  //   const slotDetails = await fetch('/owner/garages/slots', {
  //     method: "POST",
  //     body: new URLSearchParams(formData),
  //   });
  //   slots = await slotDetails.json();
  // }
  // let slotListing = document.getElementById('slot-listing');
  // slotListing.style.display = '';
  // let slotBody = document.getElementById('slot-body');
  // const index = document.getElementById('garage-select').value;
  // let interval = document.getElementById('slotDiff').value || 1;
  // const garage = garages[index];
  // let startTime = new Date(garage.open_time);
  // startTime.setFullYear(year);
  // startTime.setMonth(month);
  // startTime.setDate(slotDate);
  // startTime = startTime.getTime();
  // let endTime = new Date(garage.close_time);
  // endTime.setFullYear(year);
  // endTime.setMonth(month);
  // endTime.setDate(slotDate);
  // endTime = endTime.getTime();
  // let increment = 3600000 * interval;
  // let str = "";
  // while (startTime < endTime && startTime + increment < endTime) {
  //   let flag = false;
  //   slots.forEach(slot => {
  //     let start = new Date(slot.startTime).getTime();
  //     let end = new Date(slot.endTime).getTime();
  //     if ((start >= startTime && start < startTime + increment) || (end > startTime && end < startTime + increment)) {
  //       while (startTime < end) {
  //         str += `<tr><td class="red">${('0' + new Date(startTime).getHours()).slice(-2)}:${('0' + new Date(startTime).getMinutes()).slice(-2)} - ${('0' + new Date(startTime + increment).getHours()).slice(-2)}:${('0' + new Date(startTime + increment).getMinutes()).slice(-2)}</td><td class="red">add</td></tr>`;
  //         startTime += increment;
  //       }
  //       flag = true;
  //       return;
  //     }
  //   });
  //   if (flag) continue;
  //   str += `<tr><td>${('0' + new Date(startTime).getHours()).slice(-2)}:${('0' + new Date(startTime).getMinutes()).slice(-2)} - ${('0' + new Date(startTime + increment).getHours()).slice(-2)}:${('0' + new Date(startTime + increment).getMinutes()).slice(-2)}</td><td onclick="addSlot(event)" class="btn">add</td></tr>`;
  //   startTime += increment;
  // }
  // slotBody.innerHTML = str;
};

const manipulate = () => {
  let dayOne = new Date(year, month, 1).getDay(); // 0 - sunday
  let lastDate = new Date(year, month + 1, 0).getDate(); // 31 - january
  let dayEnd = new Date(year, month, lastDate).getDay();
  let lastMonthDate = new Date(year, month, 0).getDate();
  let lit = "";

  for (let i = dayOne; i > 0; i--) {
    lit += `<li class="inactiveDate">${lastMonthDate - i + 1}</li>`;
  }

  for (let i = 1; i <= lastDate; i++) {
    if (
      i == new Date().getDate() &&
      month == new Date().getMonth() &&
      year == new Date().getFullYear()
    ) {
      lit += `<li class="activeDate date">${i}</li>`;
    } else if (year > new Date().getFullYear()) {
      lit += `<li class="date">${i}</li>`;
    } else if (
      month > new Date().getMonth() &&
      year == new Date().getFullYear()
    ) {
      lit += `<li class="date">${i}</li>`;
    } else if (
      i > new Date().getDate() &&
      month == new Date().getMonth() &&
      year == new Date().getFullYear()
    ) {
      lit += `<li class="date">${i}</li>`;
    } else {
      lit += `<li class="inactiveDate">${i}</li>`;
    }
  }

  for (let i = dayEnd; i < 6; i++) {
    lit += `<li class="inactiveDate">${i - dayEnd + 1}</li>`;
  }

  currDate.innerText = `${months[month]} ${year}`;
  day.innerHTML = lit;

  const dates = document.querySelectorAll("#simpleCalendar .date");
  dates.forEach((date) => {
    date.addEventListener("click", (e) => {
      let duration = btns.indexOf(
        document.querySelector(".hours.opacity-100").id
      );
      duration = duration == 0 ? 0.5 : duration;
      slotDate = e.target.innerText;
      let active = document.getElementsByClassName("activeDate")[0];
      if (active) active.classList.remove("activeDate");
      e.target.classList.add("activeDate");
      let startDate = year + "-";
      if (month + 1 < 10) startDate += 0;
      startDate += month + 1 + "-";
      if (slotDate.length == 1) startDate += 0;
      startDate += slotDate;
      displaySlots(duration, new Date(startDate));
    });
  });
};

manipulate();

preNexIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    month = icon.id === "calendar-prev" ? month - 1 : month + 1;

    if (month < 0 || month > 11) {
      date = new Date(year, month, new Date().getDate());
      year = date.getFullYear();
      month = date.getMonth();
    } else {
      date = new Date();
    }
    manipulate();
  });
});
