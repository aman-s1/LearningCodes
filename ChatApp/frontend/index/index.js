const msgList = document.querySelector('#msg');
const oldermsgList = document.querySelector('#oldermsg');
const msgBox = document.querySelector('#messageInput');
const errorBox = document.querySelector('#error-box');
const loadOlderChatsBtn = document.getElementById('loadOlderChatsBtn');

const LIMIT = 5;

loadOlderChatsBtn.addEventListener('click', loadOlderChats);

function loadOlderChats() {
    try {
        const token = localStorage.getItem('token');
        let firstmessageid = getFirstMessageId();
        firstmessageid === null ? 0 : firstmessageid;

        axios.get(`http://localhost:3000/message/getoldmessage?firstmsgid=${firstmessageid}`, { headers: { "Authorization": token } })
            .then((response) => {
                if (response.status === 200) {
                    const serverMessages = response.data.messages;
                    const parentElement = document.getElementById('oldermsg');
                    serverMessages.forEach((msg) => {
                        addMessageToUI(msg,parentElement);
                    });
                } else {
                    throw new Error('Failed to get messages');
                }
            })
            .catch((err) => {
                showError(err);
            });
    } catch (err) {
        showError(err);
    }
}

async function userJoindMessage() {
    try {
        const token = localStorage.getItem('token');

        const msg = {
            message: 'joined the chat'
        };

        const response = await axios.post('http://localhost:3000/message/sendmessage', msg, { headers: { "Authorization": token } });

        if (response.status === 201) {
            const parentElement = document.getElementById('msg');
            addMessageToUI(response.data.msg,parentElement);
        } else {
            throw new Error('Failed To Join Chat');
        }
    } catch (err) {
        console.log(err);
        showError(err);
    }
}
async function sendmsg(e) {
    try {
        e.preventDefault();
        const msgVal = msgBox.value;
        const msg = {
            message: `${msgVal}`
        };
        const token = localStorage.getItem('token');
        
        const hasFunctionExecuted = localStorage.getItem('hasFunctionExecuted');

        if (hasFunctionExecuted === 'false') {
            await userJoindMessage();
            localStorage.setItem('hasFunctionExecuted', 'true');
        }
        const response = await axios.post('http://localhost:3000/message/sendmessage', msg, { headers: { "Authorization": token } });

        if (response.status === 201) {
            const parentElement = document.getElementById('msg');
            addMessageToUI(response.data.msg,parentElement);
            msgBox.value = '';
        } else {
            throw new Error('Failed To send Message');
        }
    } catch (err) {
        if (err.response && err.response.data && err.response.data.err === 'No message to send') {
            errorBox.innerHTML = '';
            errorBox.innerHTML += 'No message to send';
        } else {
            showError(err);
        }
        console.log(err);
    }
};

function getFirstMessageId() {
    const localMessages = JSON.parse(localStorage.getItem('storedmsg')) || [];
    return localMessages.length > 0 ? localMessages[0].id : null;
}

function getLastMessageId() {
    const localMessages = JSON.parse(localStorage.getItem('storedmsg')) || [];
    return localMessages.length > 0 ? localMessages[localMessages.length - 1].id : null;
}

function fetchAndDisplayMessages() {
    const token = localStorage.getItem('token');
    let lastmessageid = getLastMessageId();
    lastmessageid === null ? -1 : lastmessageid;

    axios.get(`http://localhost:3000/message/getmessage?lastmsgid=${lastmessageid}`, { headers: { "Authorization": token } })
        .then((response) => {
            if (response.status === 200) {
                const serverMessages = response.data.messages;

                // Retrieve locally stored messages
                const localMessages = JSON.parse(localStorage.getItem('storedmsg')) || [];
                // Combine messages from the server and local storage
                const allMessages = [...localMessages, ...serverMessages];
                const parentElement = document.getElementById('msg');
                allMessages.forEach((msg) => {
                    addMessageToUI(msg,parentElement);
                });
            } else {
                throw new Error('Failed to get messages');
            }
        })
        .catch((err) => {
            showError(err);
        });
}

fetchAndDisplayMessages();

setInterval(fetchAndDisplayMessages, 2000);


function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

async function addMessageToUI(msg , parentElement) {

    const msgElemId = `msg-${msg.id}`;

    let storedmsg = JSON.parse(localStorage.getItem('storedmsg')) || [];
    
    // Push the new message to the array
    storedmsg.push(msg);

    if (storedmsg.length > LIMIT) {
        storedmsg = storedmsg.slice(storedmsg.length - LIMIT);
    }
    // Save the updated array back to localStorage
    localStorage.setItem('storedmsg', JSON.stringify(storedmsg));

    const token = localStorage.getItem('token');
    const decodedToken = parseJwt(token);
    const senderName = msg.user.name == decodedToken.name ? 'You' : msg.user.name;
    if (document.getElementById(`msg-${msg.id}`)) {
        return;
    }
    let messageContent = msg.message;
    if (messageContent === 'joined the chat') {
        parentElement.innerHTML += `
            <li id=${msgElemId} style="padding: 5px;">
                <em>${msg.user.name} joined the chat</em>
            </li>`;
    } else {
        parentElement.innerHTML += `
            <li id=${msgElemId} style="padding: 5px;">
                <strong>${senderName}:</strong> ${msg.message}
            </li>`;
    }
}


function showError(err) {
    console.error(err);

    if (errorBox.innerHTML !== '') {
        errorBox.innerHTML = '';
    }

    if (err.response && err.response.data && err.response.data.err) {
        errorBox.innerHTML += err.response.data.err;
    } else if (err.message) {
        errorBox.innerHTML += err.message;
    } else {
        errorBox.innerHTML += 'An error occurred.';
    }
};