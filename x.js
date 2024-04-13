// JavaScript file for both navigation and chat functionality

// Navigation functionality
function goToPage2() {
  window.location.href = "page2.html";
}
// Chat functionality
// Selectors
const abdiSelectorBtn = document.querySelector('#abdiid');
const yasminSelectorBtn = document.querySelector('#yasminid');
const chatHeader = document.querySelector('.chat-header');
const chatMessages = document.querySelector('.container2');
const chatInputForm = document.querySelector('.chat-input-form');
const chatInput = document.querySelector('.chat-input');
const clearChatBtn = document.querySelector('.clear-chat');
const apiUrl = 'http://chatapp.com/api';

// Function to create chat message element
const createChatMessageElement = (message) => `
<div class="message ${message.sender === 'Abdi' ? 'message1' : 'message2'}">
  <div class="message-send">${message.sender}</div>
  <div class="message-text">${message.text}</div>
  <div class="message-timestamp">${message.timestamp}</div>
</div>
`;

// Function to update message sender
const updateMessageSender = (name) => {
  chatHeader.innerText = `${name} chatting...`;
  chatInput.placeholder = `Type here, ${name}...`;
};

// Event listeners for sender buttons
abdiSelectorBtn.onclick = () => updateMessageSender('Abdi');
yasminSelectorBtn.onclick = () => updateMessageSender('Yasmin');

// Function to handle sending messages
const sendMessage = (e) => {
  e.preventDefault();

  const timestamp = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  const message = {
    sender: chatHeader.innerText.split(' ')[0], // Extract sender from chat header
    text: chatInput.value,
    timestamp,
  };

  // Add the new message to the DOM
  chatMessages.innerHTML += createChatMessageElement(message);

  // Clear the input field
  chatInput.value = '';

  // Save the message to the server using API
  saveMessageToServer(message);

  // Auto-focus the input field
  chatInput.focus();
};

// Function to save message to the server using API
const saveMessageToServer = (message) => {
  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to save message to the server');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
};

// Event listener for sending messages
chatInputForm.addEventListener('submit', sendMessage);