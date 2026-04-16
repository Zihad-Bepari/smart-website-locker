# 🔒 Smart Website Locker (Chrome Extension)

## 📌 Overview

Smart Website Locker is a Chrome Extension that adds an extra layer of security to selected websites. Users must enter a password before accessing locked websites.

This extension is useful for:

* Blocking distractions (e.g., social media)
* Adding privacy on shared computers
* Improving productivity

---

## ✨ Features

* 🔐 Password protection for specific websites
* ➕ Add and remove websites بسهولة
* 💾 Uses Chrome local storage
* ⛔ Blocks access until correct password is entered
* ⏱️ Auto re-lock after inactivity (e.g., 30 minutes)

---

## ⚙️ Working Process

1. User adds a website and password using the popup interface
2. The data is stored securely in Chrome local storage
3. When a user visits any website:

   * `content.js` checks if the site is in the locked list
4. If the site is locked:

   * A password prompt is displayed
   * User must enter the correct password
5. If password is correct:

   * Access is granted temporarily
6. If the user becomes inactive (no scrolling, mouse, or keyboard activity):

   * After 30 minutes, the site is automatically locked again
7. If password is incorrect:

   * Access remains blocked

---

## 📁 Project Structure

```
├── manifest.json
├── background.js
├── content.js
├── icon.png
└── popup/
    ├── popup.html
    ├── popup.js
    └── popup.css
```

---

## 📄 File Explanations

### 1. manifest.json

This is the core configuration file of the Chrome extension.

**Why it's needed:**

* Chrome cannot run an extension without this file
* Defines permissions, scripts, and metadata

**What it contains:**

* Extension name and version
* Permissions (e.g., storage, tabs)
* Background script configuration
* Content script configuration
* Popup UI setup

---

### 2. background.js

Runs in the background independently of any webpage.

**Why it's needed:**

* Handles global logic
* Listens to browser events
* Manages extension lifecycle

**In this project:**

* Can be used for tab monitoring
* Useful for future features like syncing and analytics

---

### 3. content.js 🔥 (Core Logic)

Runs inside the actual webpage.

**Why it's needed:**

* Interacts with the DOM
* Controls access to websites

**In this project:**

* Detects if the current website is locked
* Displays password prompt
* Blocks access if password is incorrect
* Tracks user activity (scroll, mouse, keyboard)
* Re-locks the site after inactivity

---

### 4. popup/ (User Interface)

This folder contains the extension UI.

#### popup.html

* Structure of the popup interface

#### popup.js

* Handles user input (add/remove site, password)

#### popup.css

* Styles for better UI

**Why it's needed:**

* Allows users to control the extension easily

---

### 5. icon.png

Extension icon displayed in the Chrome toolbar.

**Why it's needed:**

* Provides visual identity
* Improves user experience

---

## 💾 Storage Used

* Chrome Storage API (`chrome.storage.local`)

**Stores:**

* Website URLs
* Passwords

---

## 🚀 Future Improvements

* 🔐 Encrypt or hash stored passwords
* 📱 Sync data across devices
* 🎨 Improved UI/UX design
* 🔔 Notification system for lock events
* 🌐 Support for multiple browsers

---

## 🛠️ Tech Stack

* JavaScript
* Chrome Extension API
* HTML & CSS

---

## 📦 Installation (Developer Mode)

1. Go to `chrome://extensions/`
2. Enable **Developer Mode**
3. Click **Load unpacked**
4. Select this project folder


---

## 👨‍💻 Author

Zihad Bepari 
