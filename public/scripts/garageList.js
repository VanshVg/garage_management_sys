const getData = async () => {
  const jsonData = await fetch(
    "http://localhost:3000/owner/garage/getGarageList"
  );
  var data = await jsonData.json();
  return data.result;
};
const populateData = async () => {
  var data = await getData();
  data.forEach((element) => {
    var tr = document.createElement("tr");
    tr.classList.add("tr-class");
    tr.classList.add("font-family");
    Object.keys(element).forEach((ele) => {
      var td = document.createElement("td");
      if (ele == "status") {
        var div = document.createElement("div");
        if (element[ele] == "1") {
          div.classList.add("active");
          div.innerText = "Active";
        } else {
          div.classList.add("deactive");
          div.innerText = "Deactive";
        }
        td.appendChild(div);
        tr.appendChild(td);
      } else {
          tr.appendChild(td);
          td.innerText = element[ele];
      }
    });
    var td = document.createElement("td");
    td.appendChild(createEditAndDelete())
    tr.appendChild(td)
    var table = document.getElementById("table");
    table.appendChild(tr);
  });
};

populateData();

function createEditAndDelete() {
    var hmMenu = document.createElement("div")
    hmMenu.classList.add("hm-menu")
    var threeDots = document.createElement("img")
    threeDots.src = "/icons/threedots.svg"
    var listCs = document.createElement("div")
    listCs.classList.add("list-cs")
    var listCsData1 = document.createElement("div")
    listCsData1.classList.add("list-cs-data")
    var edit = document.createElement("p")
    edit.innerText = "Edit"
    var editIcon = document.createElement("img")
    editIcon.src = "/icons/edit.svg"
    listCsData1.appendChild(editIcon)
    listCsData1.appendChild(edit)
    listCs.appendChild(listCsData1)
    var listCsData2 = document.createElement("div")
    listCsData2.classList.add("list-cs-data")
    var edit = document.createElement("p")
    edit.innerText = "Delete"
    var editIcon = document.createElement("img")
    editIcon.src = "/icons/delete.svg"
    listCsData2.appendChild(editIcon)
    listCsData2.appendChild(edit)
    listCs.appendChild(listCsData2)
    hmMenu.appendChild(threeDots)
    hmMenu.appendChild(listCs)
    return hmMenu
}
