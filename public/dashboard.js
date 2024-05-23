const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('username');


document.querySelector("#username-display").textContent = username


