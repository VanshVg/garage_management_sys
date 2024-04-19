const changeStep = (form, hide, show) => {
  document.querySelectorAll("error").forEach((er) => er.remove());
  document
    .querySelectorAll(
      `#${form} #${hide} input[Validation],#${form} #${hide} select[Validation],#${form} #${hide} textarea[Validation]`
    )
    .forEach((ele) => {
      Validation.isValid(ele);
    });
  if (!document.querySelectorAll("error").length) {
    document.querySelector(`#${form} #${hide}`).classList.add("hidden");
    document.querySelector(`#${form} #${show}`).classList.remove("hidden");
  }
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

///////////////////

const handleGarage = async (e) => {
  e.preventDefault();
  document
    .querySelectorAll(
      `input[Validation],select[Validation],textarea[Validation]`
    )
    .forEach((ele) => {
      Validation.isValid(ele);
    });
  if (!document.querySelectorAll(`#${e.target.id} error`).length) {
    const formData = new FormData(e.target);
    formData.delete("state");

    formData.append(
      "thumbnail",
      document.getElementById(`${e.target.id}-thumbnail`).files[0] || ""
    );
    formData.delete(`${e.target.id}-thumbnail`);
    if (e.target.id == "editGarage")
      formData.append("garageId", e.target.getAttribute("garageId"));
    else formData.append("userId", localStorage.getItem("userId"));

    //call api
    let response = { success: false };
    try {
      response = await callApiWithFormData(
        e.target.id == "addGarage"
          ? { endpoint: `/owner/garages/add`, body: formData }
          : {
              endpoint: `/owner/garages/update`,
              body: formData,
              method: "PUT",
            }
      );
    } catch (error) {
      response = error;
    } finally {
      //show response
      toast.show(response.success ? "success" : "error", response.message);
      if (response.success)
        setTimeout(() => {
          location.href = "/owner/garages";
        }, 3000);
    }
  }
};
