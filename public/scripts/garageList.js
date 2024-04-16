const getData = async (page = 1) => {
  const jsonData = await fetch(
    "http://localhost:3000/owner/slots/getAllslots?page=" + page
  );
  var data = await jsonData.json();
  console.log(data.count);
  return [data.result, data.startIndex, data.endIndex,data.count,data.totalPage];
};
const populateData = async (pageNumber = 1) => {
  var data = await getData(pageNumber);
  const tableNode = document.getElementById("table");
  while (tableNode.childNodes.length != 2) {
    tableNode.removeChild(tableNode.lastChild);
  }
  data[0].forEach((element) => {
    var tr = document.createElement("tr");
    tr.classList.add("tr-class");
    tr.classList.add("font-family");
    let i = 0;
    Object.keys(element).forEach((ele) => {
      var td = document.createElement("td");
      td.classList.add("font-family");

      if (ele == "availability_status") {
        td.classList.add("flex-status")
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
      } else if (i == 2) {
        var td2 = document.createElement("td");
        td2.classList.add("font-family");
        var date = element[ele];
        td2.innerText = date.split(" ")[0];
        tr.appendChild(td2);
        td.innerText = date.split(" ")[1];
        tr.appendChild(td);
      } else if (i == 3) {
        var time = element[ele];
        td.innerText = time.split(" ")[1];
        tr.appendChild(td);
      } else {
        tr.appendChild(td);
        td.innerText = element[ele];
      }
      i++;
    });
    var td = document.createElement("td");
    td.appendChild(createEditAndDelete());
    tr.appendChild(td);
    var table = document.getElementById("table");
    table.appendChild(tr);
  });
  var text = document.querySelector(".pagination-text");
  var max = data[1] + 1;

  text.innerText = "Showing " + max + " to " + data[2] + " of "+ data[3] +" entries ";
  return[data[4]]
};

populateData();

function createEditAndDelete() {
  var hmMenu = document.createElement("div");
  hmMenu.classList.add("hm-menu");
  var threeDots = document.createElement("img");
  threeDots.src = "/icons/threedots.svg";
  var listCs = document.createElement("div");
  listCs.classList.add("list-cs");
  var listCsData1 = document.createElement("div");
  listCsData1.classList.add("list-cs-data");
  var edit = document.createElement("p");
  edit.innerText = "Edit";
  var editIcon = document.createElement("img");
  editIcon.src = "/icons/edit.svg";
  listCsData1.appendChild(editIcon);
  listCsData1.appendChild(edit);
  listCs.appendChild(listCsData1);
  var listCsData2 = document.createElement("div");
  listCsData2.classList.add("list-cs-data");
  var edit = document.createElement("p");
  edit.innerText = "Delete";
  var editIcon = document.createElement("img");
  editIcon.src = "/icons/delete.svg";
  listCsData2.appendChild(editIcon);
  listCsData2.appendChild(edit);
  listCs.appendChild(listCsData2);
  hmMenu.appendChild(threeDots);
  hmMenu.appendChild(listCs);
  return hmMenu;
}

var next = document.querySelector("#next");
var prev = document.querySelector("#prev");
next.addEventListener("click", async () => {
  var pid = parseInt(document.querySelector(".current").innerText);
  const pageNumber = pid + 1;
  const pageCount =  await populateData(pageNumber);

  document.querySelector(".current").innerText = pid + 1;

  if (pid+1 == pageCount) {
    next.disabled = true;
  } else {
    prev.disabled = false;
  }
});

prev.addEventListener("click", async () => {
  var pid = parseInt(document.querySelector(".current").innerText);
  document.querySelector(".current").innerText = pid - 1;
  const pageNumber = pid - 1;
  populateData(pageNumber);

  if (pid - 1 == 1) {
    prev.disabled = true;
  } else {
    next.disabled = false;
  }
});
