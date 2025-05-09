// Select DOM elements
const messagesContainer = document.getElementById('messages');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

// Add dark mode toggle functionality
const darkModeToggle = document.createElement('button');
darkModeToggle.id = 'dark-mode-toggle';
darkModeToggle.textContent = 'Toggle Dark Mode';
document.body.prepend(darkModeToggle);

// Load messages from localStorage
function loadMessages() {
    const messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
    messages.forEach(displayMessage);
}

// Save a message to localStorage
function saveMessage(message) {
    const messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
    messages.push(message);
    localStorage.setItem('chatMessages', JSON.stringify(messages));
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
        displayMessage(message);
        saveMessage(message);
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

// Initialize chat
loadMessages();
