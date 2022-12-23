function errorHandler(code, message) {
  if (code === 'ERROR_CODE_UNAUTHORIZED') {
    alert('Your session has expired. Please log in again to continue.');
    localStorage.clear();
    sessionStorage.clear();
    window.location.replace('/signup');
  } else {
    alert('Code: ' + code + '\nMessage: ' + message);
  }
}



function fetchAPI(url, method, token, options = {}, headers = {
  'Content-Type': 'application/json',
}) {
  // Use the fetch() function to make a request to the API
  // Pass in the options object as the fifth argument
  return fetch(url, {
    method: method, // Set the HTTP method using the parameter
    headers: {
      ...headers, // Spread the headers object to include any additional headers
      'Authorization': `Bearer ${token}`, // Set the authorization header using the token parameter
    },
    ...options, // Spread the options object to include any additional options
  })
    // When the request is complete, convert the response to JSON
    .then(response => response.json())
    // If the request was successful, return the JSON data
    .then(data => {
      if(data?.code){
        errorHandler(data.code,data.message)
      }else {
        return data
      }      
    })
    // If the request failed, throw an error
    .catch(error => {
      throw error;
    });
}
/*
// Use the default headers, no token, and default options
fetchAPI('https://example.com/api/endpoint', 'POST')
  .then(data => {
    // Do something with the data here
  })
  .catch(error => {
    // Handle any errors here
  });

// Provide custom a token, headers, and custom options

const token = 'abc123';

const headers = {
  'Content-Type': 'application/x-www-form-urlencoded', // Set the request headers
};

const options = {
  body: JSON.stringify({
    key: 'value',
  }),
};

fetchAPI('https://example.com/api/endpoint', 'POST', token, options, headers)
  .then(data => {
    // Do something with the data here
  })
  .catch(error => {
    // Handle any errors here
  });
*/
