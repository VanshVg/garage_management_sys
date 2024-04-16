const handleUpdateForm = async () => {
  let formData = document.getElementById("updateOwner");
  let details = new FormData(formData);
  const params = new URLSearchParams(details);
  let data = await fetch("/owner/profile/update", {
    method: "PUT",
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    body: params
  })
  let result = await data.json();
  alert(result.message);
  myFetch();
}

const myFetch = async () => {
  const userDetails = await fetch('/userDetails');
  const userJson = await userDetails.json();
  const user = userJson.user;
  document.getElementById('nameInput').value = user.name;
  const state = document.getElementById('state');
  const states = await fetch('/states');
  const json = await states.json();
  state.innerHTML = "";
  json.states.forEach(s => {
    const option = document.createElement('option');
    option.setAttribute('value', s.id);
    option.innerText = s.state_name;
    state.appendChild(option);
  });
  state.addEventListener('change', async (e) => {
    const cities = await fetch('/cities/' + e.target.value);
    const json = await cities.json();
    const city = document.getElementById('city');
    city.innerHTML = "";
    json.cities.forEach(c => {
      const option = document.createElement('option');
      option.setAttribute('value', c.city_name);
      option.innerText = c.city_name;
      city.appendChild(option);
    });
  });
}

myFetch();