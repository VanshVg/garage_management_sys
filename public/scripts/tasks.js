let zones = document.querySelectorAll(".status");

let tasks = document.querySelectorAll(".task");

tasks.forEach((element) => {
  element.addEventListener("dragstart", () => {
    element.classList.add("is-dragging");
  });
});

zones.forEach((element) => {
  element.addEventListener("dragover", (event) => {
    event.preventDefault();
    element.appendChild(document.querySelector(".is-dragging"));
  });
});

tasks.forEach((element) => {
  element.addEventListener("dragend", (event) => {
    element.classList.remove("is-dragging");
  });
});
