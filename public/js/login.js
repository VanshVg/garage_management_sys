function checkInputs(element) {
    var eClass = "." + element;
    var eid = "#" + element;
    var name = document.querySelector(eid);
    if (name.value == "") {
      if (document.getElementById("span" + element) == null) {
        createDiv(element);
      }

      return false;
    } else {
      if (document.getElementById("span" + element) != null) {
        removeDiv(eClass);
      }
      return true;
    }
  }

  function createDiv(element) {
    var eClass = "." + element;
    var eid = "#" + element;
    var name = document.querySelector(eid);
    var div = document.createElement("span");
    var text = document.createTextNode("Please provide a valid " + element);
    div.appendChild(text);
    div.style.color = "red";
    div.setAttribute("id", "span" + element);

    document.querySelector(eClass).appendChild(div);
  }
  // function to remove an element
  function removeDiv(eClass) {
    var element = document.querySelector(eClass);
    element.removeChild(element.lastChild);
  }
  var form = document.getElementById("form")
  form.addEventListener('submit', function (event) {
    if ((checkInputs("username") == false) || (checkInputs("password") == false)) {      
      event.preventDefault()
      event.stopPropagation()      
      return
    }
    
    form.classList.add('was-validated')
  }, false)