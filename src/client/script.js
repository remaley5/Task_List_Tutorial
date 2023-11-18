const loginSection = document.getElementById("loginSection");
const homeSection = document.getElementById("homeSection");


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
        throw new Error();
    }

    return result.json();
}

/////////////// LOG IN ///////////////

if(document.cookie.includes("session_token")) {
    loginSection.classList.add("hidden");
    homeSection.classList.remove("hidden");
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