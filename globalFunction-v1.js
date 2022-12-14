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
