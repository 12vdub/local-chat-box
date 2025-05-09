// Select DOM elements
const messagesContainer = document.getElementById('messages');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

// Add dark mode toggle functionality
const darkModeToggle = document.createElement('button');
darkModeToggle.id = 'dark-mode-toggle';
darkModeToggle.textContent = 'Toggle Dark Mode';
document.body.prepend(darkModeToggle);

// Load messages from the URL hash
function loadMessages() {
    const hash = decodeURIComponent(window.location.hash.slice(1));
    const messages = hash ? JSON.parse(hash) : [];
    messagesContainer.innerHTML = ''; // Clear existing messages
    messages.forEach(displayMessage);
}

// Save messages to the URL hash
function saveMessages(messages) {
    window.location.hash = encodeURIComponent(JSON.stringify(messages));
}

// Display a message in the chat box
function displayMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.textContent = message;
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight; // Auto-scroll
}

// Handle sending a message
function sendMessage() {
    const message = messageInput.value.trim();
    if (message) {
        const hash = decodeURIComponent(window.location.hash.slice(1));
        const messages = hash ? JSON.parse(hash) : [];
        messages.push(message);
        saveMessages(messages);
        displayMessage(message);
        messageInput.value = ''; // Clear input
    }
}

// Apply the saved theme on load
function applyTheme(theme) {
    document.body.className = theme;
    darkModeToggle.textContent = theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode';
}

// Toggle between light and dark mode
function toggleDarkMode() {
    const currentTheme = document.body.className === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', currentTheme);
    applyTheme(currentTheme);
}

// Load the saved theme from localStorage
const savedTheme = localStorage.getItem('theme') || 'light';
applyTheme(savedTheme);

// Event listener for the dark mode toggle button
darkModeToggle.addEventListener('click', toggleDarkMode);

// Event listeners
sendButton.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

// Poll for new messages every 1 second
function pollMessages() {
    loadMessages();
    setTimeout(pollMessages, 1000);
}

// Initialize chat
loadMessages();
pollMessages();
