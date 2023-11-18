const landingSection = document.getElementById("landingSection");
const loginSection = document.getElementById("loginSection");
const homeSection = document.getElementById("homeSection");

/////////////// Stay Logged In ///////////////

if(document.cookie.includes("session_token")) {
    landingSection.classList.add("hidden");
    homeSection.classList.remove("hidden");
}

// Api Call Helper
async function callApi(api, method, data) {
    const result = await fetch("/api/" + api, {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!result.ok) {
        console.log('result', result);
        throw new Error();
    }

    return result.json();
}


/////////////// Sign Up ///////////////

document.getElementById("signupForm").addEventListener("submit", (event) => {
    const errorHandler = document.getElementById("signupFormError");
    event.preventDefault();

    const username = document.getElementById("signupUsername").value;
    const password = document.getElementById("signupPassword").value;

    callApi("user/", "POST", {username, password}).then((data) => {
        console.log("success");
        landingSection.classList.add("hidden");
        homeSection.classList.remove("hidden");
    }).catch((e) => {
        console.log("error = ", e);
        errorHandler.textContent = "Error signing up!";
    });
});

/////////////// LOG IN ///////////////

document.getElementById("loginForm").addEventListener("submit", (event) => {
    const errorHandler = document.getElementById("loginFormError");
    event.preventDefault();

    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    callApi("user/login", "POST", {username, password}).then((data) => {
        console.log("success");
        landingSection.classList.add("hidden");
        homeSection.classList.remove("hidden");
    }).catch((e) => {
        console.log("error = ", e);
        errorHandler.textContent = "Error logging in!";
    });
});
 
/////////////// ADD ITEM ///////////////

document.getElementById("createItemForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const errorHandler = document.getElementById("createItemFormError");
    const title = document.getElementById("newItemTitle").value;

    errorHandler.textContent = "";
    callApi("item", "POST", {title}).then(() => {

    }).catch((e) => {
        errorHandler.textContent = "Error Creating Item!";
    });
});