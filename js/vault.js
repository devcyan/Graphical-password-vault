
// Lock vault button
document.getElementById('lock-vault').addEventListener('click', () => {
    window.location.href = 'index.html';
});

// Change pattern button
document.getElementById('change-pattern').addEventListener('click', () => {
    window.location.href = 'change-password.html';
});

// Save vault data
document.getElementById('save-vault-btn').addEventListener('click', () => {
    const data = {
        accessCodes: document.getElementById('access-codes').value,
        documents: document.getElementById('documents').value,
        wallets: document.getElementById('wallets').value,
        notes: document.getElementById('notes').value
    };
    localStorage.setItem('userVaultData', JSON.stringify(data));
    alert('✅ Vault data saved!');
});

// Load vault data on startup
window.addEventListener('DOMContentLoaded', () => {
    const saved = JSON.parse(localStorage.getItem('userVaultData'));
    if (saved) {
        document.getElementById('access-codes').value = saved.accessCodes || '';
        document.getElementById('documents').value = saved.documents || '';
        document.getElementById('wallets').value = saved.wallets || '';
        document.getElementById('notes').value = saved.notes || '';
    }
});