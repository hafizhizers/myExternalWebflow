function fetchAPI(url) {
  // Use the fetch() function to make a request to the API
  return fetch(url)
    // When the request is complete, convert the response to JSON
    .then(response => response.json())
    // If the request was successful, return the JSON data
    .then(data => data)
    // If the request failed, throw an error
    .catch(error => {
      throw error;
    });
}
