const callAPI = async (endpoint, body, method) => {
  let data = await fetch(
    endpoint,
    method != "GET"
      ? {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body,
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
