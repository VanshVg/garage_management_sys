let tabs = document.getElementsByClassName("tab");
let currentTab = 0;


const showTabs = (n) => {
  tabs[n].style.display = 'block';
}
const nextPage = () => {
  tabs[0].style.display = 'none';
  tabs[1].style.display = 'block';
}
const prevPage = () => {
  tabs[0].style.display = 'block';
  tabs[1].style.display = 'none';
}
showTabs(currentTab);
