// Image data with local paths
const imageData = {
    urls: [
        'img/mountain.jpg',
        'img/ocean.jpg',
        'img/forest.jpeg',
        'img/desert.jpeg',
        'img/river.jpeg',
        'img/sun.jpeg',
        'img/tree.jpeg',
        'img/star.jpeg',
        'img/cloud.jpeg'
    ],
    names: [
        "Mountain", "Ocean", "Forest", "Desert", 
        "River", "Sun", "Tree", "Star", "Cloud"
    ]
};

// Get stored pattern or use default
let currentPattern = JSON.parse(localStorage.getItem('graphicalPassword')) || [0, 1, 2, 3];
let attemptsLeft = 3;

// DOM Elements
const grid = document.getElementById('pattern-grid');
const patternDisplay = document.getElementById('pattern-display');
const patternIndicator = document.getElementById('pattern-indicator');
const unlockBtn = document.getElementById('unlock-btn');
const resetBtn = document.getElementById('reset-btn');
const authStatus = document.getElementById('auth-status');
const attemptCounter = document.getElementById('attempt-counter');

let selectedDots = [];

// Initialize grid with images
function initializeGrid() {
    grid.innerHTML = '';
    
    for (let i = 0; i < 9; i++) {
        const dot = document.createElement('div');
        dot.className = 'grid-dot';
        dot.dataset.index = i;
        
        const img = document.createElement('img');
        img.src = imageData.urls[i];
        img.alt = imageData.names[i];
        img.onerror = function() {
            this.src = 'https://via.placeholder.com/80?text=Image+Missing';
        };
        
        dot.appendChild(img);
        grid.appendChild(dot);
    }
}

// Add event listeners to grid
function setupGrid() {
    const dots = grid.querySelectorAll('.grid-dot');
    
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.dataset.index);
            
            // If dot is already selected, remove it and all dots after it
            if (selectedDots.includes(index)) {
                const position = selectedDots.indexOf(index);
                selectedDots = selectedDots.slice(0, position);
            } else {
                // Add new dot to selection
                selectedDots.push(index);
            }
            
            // Update UI
            updateGridUI();
            updatePatternDisplay();
        });
    });
}

// Update grid UI (selected dots)
function updateGridUI() {
    const dots = grid.querySelectorAll('.grid-dot');
    
    // Reset all dots
    dots.forEach(dot => {
        dot.classList.remove('selected');
    });
    
    // Set selected dots
    selectedDots.forEach(index => {
        dots[index].classList.add('selected');
    });
}

// Update pattern display
function updatePatternDisplay() {
    if (selectedDots.length === 0) {
        patternDisplay.textContent = 'Pattern Sequence: Not set yet';
        patternIndicator.textContent = 'Selected: None';
    } else {
        const patternNames = selectedDots.map(index => imageData.names[index]);
        patternDisplay.textContent = `Pattern Sequence: ${patternNames.join(' → ')}`;
        patternIndicator.textContent = `Selected: ${patternNames.join(', ')}`;
    }
}

// Reset grid
function resetGrid() {
    selectedDots = [];
    updateGridUI();
    updatePatternDisplay();
    authStatus.className = 'status';
}

// Show status message
function showStatus(type, message) {
    authStatus.textContent = message;
    authStatus.className = `status ${type}`;
    
    // Auto-hide success messages after 3 seconds
    if (type === 'success') {
        setTimeout(() => {
            authStatus.className = 'status';
        }, 3000);
    }
}

// Unlock vault
function unlockVault() {
    // Check if pattern matches
    const isMatch = selectedDots.length === currentPattern.length &&
        selectedDots.every((val, index) => val === currentPattern[index]);
    
    if (isMatch) {
        // Successful authentication
        showStatus('success', 'Authentication successful! Unlocking vault...');
        
        // Redirect to vault page after a short delay
        setTimeout(() => {
            window.location.href = 'vault.html';
        }, 1500);
    } else {
        // Failed authentication
        attemptsLeft--;
        attemptCounter.textContent = `Attempts remaining: ${attemptsLeft}`;
        
        if (attemptsLeft <= 0) {
            show极简主义('error', 'Vault locked! Too many failed attempts. Please try again later.');
            unlockBtn.disabled = true;
            
            // Auto-reset after 30 seconds
            setTimeout(() => {
                attemptsLeft = 3;
                attemptCounter.textContent = `Attempts remaining: ${attemptsLeft}`;
                authStatus.className = 'status';
                unlockBtn.disabled = false;
                resetGrid();
            }, 30000);
        } else {
            showStatus('error', 'Authentication failed. Pattern does not match.');
        }
    }
}

// Initialize the application
initializeGrid();
setupGrid();

// Button event listeners
unlockBtn.addEventListener('click', unlockVault);
resetBtn.addEventListener('click', resetGrid);