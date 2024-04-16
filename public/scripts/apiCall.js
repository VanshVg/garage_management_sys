const callAPI = async (endpoint, body = {}, method = "GET") => {
  let data = await fetch(
    endpoint,
    method != "GET"
      ? {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      : {}
  );
  try {
    let jsonData = data.json();
    return jsonData;
  } catch (error) {
    return error;
  }
};
