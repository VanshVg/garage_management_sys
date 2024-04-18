const changeStep = (hide, show) => {
  document.querySelectorAll("error").forEach((er) => er.remove());
  document
    .querySelectorAll(
      `#${hide} input[Validation],#${hide} select[Validation],#${hide} textarea[Validation]`
    )
    .forEach((ele) => {
      Validation.isValid(ele);
    });
  if (!document.querySelectorAll("#garageAdd error").length) {
    document.getElementById(hide).classList.add("hidden");
    document.getElementById(show).classList.remove("hidden");
  } else console.log(Validation.allValid);
};

const handleGarage = async (e) => {
  e.preventDefault();
  document
    .querySelectorAll(
      `input[Validation],select[Validation],textarea[Validation]`
    )
    .forEach((ele) => {
      Validation.isValid(ele);
    });
  if (!document.querySelectorAll("#garageAdd error").length) {
    const formData = new FormData();
    let fileds = [
      "garageName",
      "email",
      "cityId",
      "area",
      "pincode",
      "contactNumber",
      "openTime",
      "closeTime",
      "latitude",
      "longitude",
      "description",
    ];
    fileds.forEach((filed) => {
      formData.append(
        filed,
        document.querySelector(`#garageAdd #${filed}`).value
      );
    });
    formData.append(
      "thumbnail",
      document.querySelector("#garageAdd #thumbnail").files[0]
    );
    formData.append("userId", localStorage.getItem("userId"));
    let response = await fetch(`/owner/garages/add`, {
      method: "POST",
      body: formData,
    });
    response = await response.json();
    console.log(response);
    toast.show(response.success ? "success" : "error", response.message);
    if (response.success)
      setTimeout(() => {
        location.href = "/owner/garages";
      }, 3000);
  }
};
const addGarageDetails = async () => {
  let formData = document.getElementById("garageAdd");
  let details = new FormData(formData);
  const params = new URLSearchParams(details);
  const garageData = await new Response(params).text();
  let data = await fetch("/owner/garage/add", {
    method: "POST",
    headers: {
      "Content-type": "application/x-www-form-urlencoded",
    },
    body: garageData,
  });
  let result = await data.json();
  document.getElementById("message").innerText = result.message;
};

const updateGarage = async () => {
  let formData = document.getElementById("garageAdd");
  let details = new FormData(formData);
  const params = new URLSearchParams(details);
  const garageData = await new Response(params).text();
  let data = await fetch("/owner/garage/update", {
    method: "POST",
    headers: {
      "Content-type": "application/x-www-form-urlencoded",
    },
    body: garageData,
  });
  let result = await data.json();
  document.getElementById("message").innerText = result.message;
};
