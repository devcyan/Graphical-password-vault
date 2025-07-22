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
let securityQuestion = localStorage.getItem('securityQuestion') || "What was your first pet's name?";
let securityAnswer = localStorage.getItem('securityAnswer') || "Fluffy";

// DOM Elements
const grid = document.getElementById('change-pattern-grid');
const patternDisplay = document.getElementById('new-pattern-display');
const patternIndicator = document.getElementById('change-pattern-indicator');
const savePatternBtn = document.getElementById('save-pattern-btn');
const cancelChangeBtn = document.getElementById('cancel-change-btn');
const securityQuestionSelect = document.getElementById('security-question');
const customQuestionContainer = document.getElementById('custom-question-container');
const customQuestionInput = document.getElementById('custom-question');
const securityAnswerInput = document.getElementById('security-answer');

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
        patternDisplay.textContent = 'New Pattern Sequence: Not set yet';
        patternIndicator.textContent = 'Selected: None';
    } else {
        const patternNames = selectedDots.map(index => imageData.names[index]);
        patternDisplay.textContent = `New Pattern Sequence: ${patternNames.join(' → ')}`;
        patternIndicator.textContent = `Selected: ${patternNames.join(', ')}`;
    }
}

// Save new pattern
function saveNewPattern() {
    const newPattern = selectedDots;
    
    // Validate pattern
    if (newPattern.length < 4) {
        alert('Pattern must include at least 4 images');
        return;
    }
    
    // Validate security answer
    const answer = securityAnswerInput.value.trim();
    if (!answer) {
        alert('Please provide an answer to the security question');
        return;
    }
    
    // Update security question if custom
    if (securityQuestionSelect.value === 'custom') {
        const customQuestion = customQuestionInput.value.trim();
        if (!customQuestion) {
            alert('Please enter a custom security question');
            return;
        }
        securityQuestion = customQuestion;
    } else {
        securityQuestion = securityQuestionSelect.value;
    }
    
    // Update security answer
    securityAnswer = answer;
    
    // Save to localStorage
    localStorage.setItem('graphicalPassword', JSON.stringify(newPattern));
    localStorage.setItem('securityQuestion', securityQuestion);
    localStorage.setItem('securityAnswer', securityAnswer);
    
    // Show success message
    alert('Pattern successfully updated!');
    
    // Return to vault
    window.location.href = 'vault.html';
}

// Initialize the application
initializeGrid();
setupGrid();

// Set current security question
securityQuestionSelect.value = securityQuestion;

// Security question dropdown
securityQuestionSelect.addEventListener('change', function() {
    if (this.value === 'custom') {
        customQuestionContainer.style.display = 'block';
    } else {
        customQuestionContainer.style.display = 'none';
    }
});

// Button event listeners
savePatternBtn.addEventListener('click', saveNewPattern);
cancelChangeBtn.addEventListener('click', () => {
    window.location.href = 'vault.html';
});