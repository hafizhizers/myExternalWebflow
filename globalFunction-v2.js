window.onload = function() {
    const token = getSavedData("authToken");
    if (token == null) {
        alert('You are not logged in. Please log in and try again');
        location.href = "https://atfals-site.webflow.io"
    } 
}

function clearSession(event) {
    event.preventDefault();
    window.localStorage.removeItem('authToken');
    // window.location.reload();
    location.href = "https://atfals-site.webflow.io";
}

const logout = document.getElementById('navlink-log-out');
logout.addEventListener('click', clearSession);


function generateUniqueID() {
  // Generate a long, unique number using the current time
  const timestamp = Date.now();

  // Convert the timestamp to a string
  const timestampString = timestamp.toString();

  // Generate a random number between 0 and 1
  const randomNumber = Math.random();

  // Convert the number to a string and return the first 7 characters
  const randomString = randomNumber.toString().substring(0, 7);

  // Concatenate the timestamp string and the random string
  return timestampString + randomString;
}

