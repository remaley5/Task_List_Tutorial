const landingSection = document.getElementById("landingSection");
const loginSection = document.getElementById("loginSection");
const homeSection = document.getElementById("homeSection");

/////////////// LOADING HOME SECTION ///////////////

if(document.cookie.includes("session_token")) {
    landingSection.classList.add("hidden");
    homeSection.classList.remove("hidden");
    reloadItems();
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
        reloadItems();
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
        reloadItems();
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
        document.getElementById("newItemTitle").value = "";
        reloadItems(); 
    }).catch((e) => {
        errorHandler.textContent = "Error Creating Item!";
    });
});

/////////////// LOAD ITEMS ///////////////

function reloadItems() {
    callApi("/item/foruser", "GET").then((data) => {
        const itemList = document.getElementById("itemList");

        const createItem = (title, id) => {
            const itemElem = document.createElement("li");
            const itemBtn = document.createElement("button");

            itemElem.classList.add("itemRow", "centeredText", "subheader_text");
            itemBtn.textContent = title;
            
            itemBtn.addEventListener("click", function(e) {
                e.preventDefault();
                document.getElementById("itemDialog").showModal();
            });
            
            itemElem.append(itemBtn);
            itemList.appendChild(itemElem);
        }

        if(data.length === 0) {
            document.getElementById("#noItems").classList.remove("hidden");
        } else {
            itemList.innerHTML = "";
            itemList.classList.remove("hidden");
            for(const item of data) {
                createItem(item.title, item.id);
            };
        }
    }).catch((e) => {
        console.log('Error getting items: ', e);
    });
}


/////////////// ITEM POPUP ///////////////

function closeItemDialog() {
    document.getElementById("itemDialog").close();
}

document.getElementById("itemDialogEdit").addEventListener("click", function(e) {
    e.preventDefault();
    closeItemDialog();
});


document.getElementById("itemDialogDelete").addEventListener("click", function(e) {
    e.preventDefault();
    closeItemDialog
});

document.getElementById("itemDialogClose").addEventListener("click", function(e) {
    console.log('clicking close');
    e.preventDefault();
    closeItemDialog();
});