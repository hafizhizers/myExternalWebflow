
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

function signUpformSubmit(event) {
  	event.preventDefault();
  	event.stopPropagation();
		postSignUp()
}

const signUpform = document.getElementById('wf-form-Sign-up-Form-9');
signUpform.addEventListener('submit', signUpformSubmit, true);

// function xanoSignUp() {
// 		const xano_input = 
//     {
//         Customer_Name: document.getElementById('Form-9-Name-2').value,
//         Customer_Email: document.getElementById('Form-9-Email-2').value,
//         Customer_Password: document.getElementById('Form-9-Password-3').value
//         // You can add other inputs here if you want
//     };
//     fetch("https://x8ki-letl-twmt.n7.xano.io/api:bQZrLIyT/auth/signup", {
//         method: 'POST',
//         headers: {
//         'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(xano_input),
//         })
// 				// handle response
//         .then(res => res.json())
//         .then(json => {
//         	const xanoResponse = json;
//         	const hasKey = Object.keys(xanoResponse).includes("authToken");
//           if (hasKey === false) {
//           	alert("User already exists.")}
//             else {
//               // const authToken = xanoResponse.authToken;
//               // localStorage.setItem('authToken', authToken);
//               alert("Your account was created successfully. Please login to access the website");
//               //location.href = "[WHERE TO REDIRECT THE USER AFTER SIGNUP]";
//               // console.log('authToken',authToken)
//               };}
//         );
// }

function postSignUp() {
  
    // Generate a unique ID for a new user
    const userID = generateUniqueID();
	
    const options = {
      body: JSON.stringify({
        Customer_Name: document.getElementById('Form-9-Name-2').value,
        Customer_Email: document.getElementById('Form-9-Email-2').value,
        Customer_Password: document.getElementById('Form-9-Password-3').value,
	Customer_Id: userID
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

function postLogin() {
  
    const options = {
      body: JSON.stringify({
        Customer_Email: document.getElementById('Log-in-9-Email-2').value,
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
              location.href = "https://atfals-site.webflow.io/singleitem";
            }
        })
        .catch(error => {
          
        });
  
}

// function xanoLogin() {
// 	const xano_input = 
//     {
//         Customer_Email: document.getElementById('Log-in-9-Email-2').value,
//         Customer_Password: document.getElementById('Log-in-9-Password-2').value,
//         // You can add other inputs here if you want
//     };
    
//     fetch("https://x8ki-letl-twmt.n7.xano.io/api:bQZrLIyT/auth/login", {
//         method: 'POST',
//         headers: {
//         'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(xano_input),
//         })
// 				// handle response
//         .then(res => res.json())
//         .then(json => {
//         	const xanoResponse = json;
//         	// console.log(xanoResponse);
//         	const hasKey = Object.keys(xanoResponse).includes("authToken");
//           // console.log(hasKey);
//           if (hasKey === false) {
//           	alert("Invalid email or password.")}
//             else {
//             	// alert("We have an authToken!");
//               const authToken = xanoResponse.authToken;
//               //localStorage.setItem('authToken', authToken);
//               saveData('authToken', authToken);
//               location.href = "https://atfals-site.webflow.io/singleitem";
//               };}
//         );
// }

function loginformSubmit(event) {
  	event.preventDefault();
  	event.stopPropagation();
		postLogin()
}

const loginForm = document.getElementById('wf-form-Log-in-Form-9');
loginForm.addEventListener('submit', loginformSubmit, true);
