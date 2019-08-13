const container = document.querySelector(".container");
const errorContainer = document.querySelector(".err");
let url = "./partials/home.html";
const links = document.querySelectorAll("nav a");
ajaxHandle(url);

function handleEvent(ev) {

    for (let i = 0; i < links.length; i++) {
        if (links[i].hasAttribute("id")) {
            links[i].removeAttribute("id");
            console.log(links[i]);
        }
    }

    let currentItem = ev.currentTarget;
    currentItem.setAttribute("id", "active");
}

for (let link of links) {
    link.addEventListener("click", handleEvent);
}

function handleLinkClick(ev) {
    ev.preventDefault();
    let currentLink = ev.target;
    let url = currentLink.href;
    ajaxHandle(url);
}

for (let link of links) {
    link.addEventListener("click", handleLinkClick);
}

function ajaxHandle(urlParam) {
    fetch(urlParam)
        .then(function (response) {
            if (response.statusText === "OK") {
                return response.text();
            }

            throw new Error(response.statusText)
        })
        .then(function (data) {

            container.innerHTML = data;
        })
        .catch(function (err) {
            errorContainer.textContent = `${err.name}: ${err.message}`;
        });
}
