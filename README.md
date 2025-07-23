# Graphical-password-vault
this is vault secure by imaged encryption

A secure digital vault that uses graphical password authentication instead of traditional text-based passwords. Access confidential information by selecting the correct sequence of images to unlock the vault.

Features
🔐 Graphical Password Authentication: Authenticate using a sequence of images instead of text passwords

📦 Secure Digital Vault: Store sensitive information in categorized sections

⚙️ Password Management: Change graphical pattern and set security questions

🔄 Password Recovery: Multiple recovery options (security question, email, SMS)

📱 Responsive Design: Works on desktop and mobile devices

🔒 Security Features: Temporary lockout after failed attempts

How It Works
Authentication:

Select the correct sequence of 4 images to unlock the vault

After 3 failed attempts, the vault temporarily locks for security

Vault Contents:

Store access credentials, confidential documents, crypto wallet recovery phrases, and secure notes

Organized in categorized sections for easy access

Password Management:

Change your graphical password pattern

Set up security questions for recovery

Use multiple recovery methods if you forget your pattern

File Structure
text
graphical-password-vault/
├── css/
│   └── style.css                 # Main stylesheet
├── js/
│   ├── auth.js                   # Authentication logic
│   ├── change-password.js        # Password change functionality
│   ├── forgot-password.js        # Password recovery logic
│   └── vault.js                  # Vault operations
├── img/                          # Image assets for graphical password
│   ├── mountain.jpg
│   ├── ocean.jpg
│   ├── forest.jpg
│   ├── desert.jpg
│   ├── river.jpg
│   ├── sun.jpg
│   ├── tree.jpg
│   ├── star.jpg
│   └── cloud.jpg
├── index.html                    # Login page
├── vault.html                    # Main vault interface
├── change-password.html          # Password change page
└── forgot-password.html          # Password recovery page
Setup Instructions
Clone the repository:

bash
git clone https://github.com/your-username/graphical-password-vault.git
Open the project folder:

bash
cd graphical-password-vault
Open index.html in your web browser to start using the application

Technologies Used
HTML5

CSS3 (Flexbox, Grid, Animations)

JavaScript (LocalStorage for data persistence)

Font Awesome Icons

Usage Notes
The default pattern is the first 4 images (0,1,2,3)

All data is stored locally in your browser using localStorage

For demonstration purposes, security answers are stored in plain text

In a production environment, sensitive data should be encrypted

Contributing
Contributions are welcome! Please fork the repository and create a pull request with your improvements.
