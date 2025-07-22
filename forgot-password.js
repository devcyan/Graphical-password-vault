// Get stored security data
const securityQuestion = localStorage.getItem('securityQuestion') || "What was your first pet's name?";
const securityAnswer = localStorage.getItem('securityAnswer') || "Fluffy";

// DOM Elements
const securityQuestionBtn = document.getElementById('security-question-btn');
const emailRecoveryBtn = document.getElementById('email-recovery-btn');
const smsRecoveryBtn = document.getElementById('sms-recovery-btn');

// Security question recovery
securityQuestionBtn.addEventListener('click', () => {
    const answer = prompt(`Security Question: ${securityQuestion}\n\nPlease enter your answer:`);
    
    if (answer && answer.toLowerCase() === securityAnswer.toLowerCase()) {
        alert('Authentication successful! You can now set a new pattern.');
        window.location.href = 'change-password.html';
    } else {
        alert('Incorrect answer. Please try again.');
    }
});

// Email recovery
emailRecoveryBtn.addEventListener('click', () => {
    alert('Recovery email sent! Check your inbox for instructions to reset your pattern.');
});

// SMS recovery
smsRecoveryBtn.addEventListener('click', () => {
    alert('SMS verification code sent! Please check your phone.');
});