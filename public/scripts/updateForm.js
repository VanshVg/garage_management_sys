const handleUpdateForm = async () => {

    let formData = document.getElementById("updateOwner");
    let details = new FormData(formData);
    const params = new URLSearchParams(details);
    const garageData = await new Response(params).text();
    // console.log(garageData);
    let data = await fetch("http://localhost:3000/owner/profile/1", {
      method: "PUT",
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
      body: garageData
  
    })
    let result = await data.json();
    // console.log(result);
    // document.getElementById("message").innerText = result.message;
  }