// client connecting to server with own username embedded,its socket id is not yet known
const socket = io({ query: `username=${username}` });


// client receive server's connect success confirmation,
// its socket id is known now
socket.on("connect", () => {
    console.log(socket.id);
    document.querySelector("#socket-id-display").textContent = socket.id
});

// client on receving online user lists,create html to display
socket.on("onlineUserList", (data) => {
    console.log("getting online users list", data)
    document.querySelector("#online-users-list").innerHTML = ""
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
            <tr onclick="createChatbox('${key}')">
                <td>${key}</td>
                <td>${value}</td>
            </tr>
    `}
    }
})

// client receive incoming message
socket.on("message", (data) => {
    console.log("received", data)

    document.querySelector("#messages-display").innerHTML += `<div class="message-container incoming"><div class="message">${data.content}</div></div>`
})


function createChatbox(targetUsername) {

    document.querySelector("#chatbox").innerHTML = `
    <div class="container">
          <div>
            <div id="target-username-display">${targetUsername}</div>
            <div id="messages-display">
               
            </div>
            <div id="input-container">
              <input id="text-input" type="text" placeholder="type your message here" />
              <button onclick="sendMessage('${targetUsername}')">Send</button>
            </div>
          </div>
    </div>
    `
}

function sendMessage(targetUsername) {

    let content = document.querySelector("#text-input").value

    console.log(`sending message ${content} to user ${targetUsername}`)
    socket.emit("message", { content: content, reciver: targetUsername, sender: username })

    document.querySelector("#messages-display").innerHTML += `<div class="message-container outgoing"><div class="message">${content}</div></div>`
}