const loginSection = document.getElementById("loginSection");
const homeSection = document.getElementById("homeSection");

if(document.cookie.includes("session_token")) {
    loginSection.classList.add("hidden");
    homeSection.classList.remove("hidden");
}

// Helper method for sign in 
async function callApi(api, method, data) {
    const result = await fetch("/api/" + api, {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!result.ok) {
        throw new Error();
    }

    return result.json();
}


document.getElementById("loginForm").addEventListener("submit", (event) => {
    const errorHandler = document.getElementById("loginFormError");
    event.preventDefault();

    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    callApi("user/login", "POST", {username, password}).then((data) => {
        console.log("success");
        loginSection.classList.add("hidden");
        homeSection.classList.remove("hidden");
    }).catch((e) => {
        console.log("error = ", e);
        errorHandler.textContent = "Error logging in!";
    });
});