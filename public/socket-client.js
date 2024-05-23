const socket = io({ query: `username=${username}` });

socket.on("connect", () => {
    console.log(socket.id);
    document.querySelector("#socket-id-display").textContent = socket.id
});


socket.on("onlineUserList", (data) => {
    console.log("getting online users list", data)
    for (const [key, value] of Object.entries(data)) {
        if (key == username) {
            document.querySelector("#online-users-list").innerHTML += `
            <tr>
                <td style="color:green">You</td>
                <td>${value}</td>
            </tr>
    `
        } else {
            document.querySelector("#online-users-list").innerHTML += `
            <tr>
                <td>${key}</td>
                <td>${value}</td>
            </tr>
    `}
    }
})