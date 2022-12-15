
function generateUniqueID() {
  // Generate a long, unique number using the current time
  const timestamp = Date.now();

  // Convert the timestamp to a string
  const timestampString = timestamp.toString();

  // Generate a random number between 0 and 1
  const randomNumber = Math.random();

  // Round down the random number to the nearest integer
  const randomInteger = Math.floor(randomNumber);

  // Convert the integer to a string and return the first 7 characters
  const randomString = randomInteger.toString().substring(0, 7);

  // Concatenate the timestamp string and the random string
  return timestampString + randomString;
}


function signUpformSubmit(event) {
  	event.preventDefault();
  	event.stopPropagation();
	postSignUp()
}

const signUpform = document.getElementById('wf-form-Sign-up-Form-9');
signUpform.addEventListener('submit', signUpformSubmit, true);

function postSignUp() {
  
    // Generate a unique ID for a new user
    const userID = generateUniqueID();
    const options = {
      body: JSON.stringify({
        name: document.getElementById('Form-9-Name-2').value,
        email: document.getElementById('Form-9-Email-2').value,
        Customer_Password: document.getElementById('Form-9-Password-3').value,
	unique_id: userID
      }),
    };
    const token = getSavedData("authToken");
    fetchAPI("https://x8ki-letl-twmt.n7.xano.io/api:bQZrLIyT/auth/signup", 'POST', token, options)
        .then(data => {
            const hasKey = Object.keys(data).includes("authToken");
            if (hasKey === false) {
              alert("User already exists.")
	    }
            else {
              alert("Your account was created successfully. Please login to access the website");
            }
        })
        .catch(error => {
          
        });
  
}

function storeUserAccountData(token) {
  
    fetchAPI("https://x8ki-letl-twmt.n7.xano.io/api:bQZrLIyT/auth/me", 'GET', token)
        .then(data => {
            saveData('userData', data);
	    location.href = "https://atfals-site.webflow.io/singleitem";
        })
        .catch(error => {
          
        });
  
}

function postLogin() {
  
    const options = {
      body: JSON.stringify({
        email: document.getElementById('Log-in-9-Email-2').value,
        Customer_Password: document.getElementById('Log-in-9-Password-2').value,
      }),
    };

    const token = getSavedData("authToken");
    fetchAPI("https://x8ki-letl-twmt.n7.xano.io/api:bQZrLIyT/auth/login", 'POST', token, options)
        .then(data => {
            const hasKey = Object.keys(data).includes("authToken");
            if (hasKey === false) {
          	alert("Invalid email or password.")
	    }
            else {
              const authToken = data.authToken;
              saveData('authToken', authToken);
	      storeUserAccountData(authToken);
            }
        })
        .catch(error => {
          
        });
  
}


function loginformSubmit(event) {
  	event.preventDefault();
  	event.stopPropagation();
	postLogin()
}

const loginForm = document.getElementById('wf-form-Log-in-Form-9');
loginForm.addEventListener('submit', loginformSubmit, true);
