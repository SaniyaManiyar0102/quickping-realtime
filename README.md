# 💬 QuickPing Realtime Chat

> A beautiful real-time chat application where you can create rooms and chat with friends instantly!

<div align="center">

![Node.js](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)
![Socket.IO](https://img.shields.io/badge/Socket.IO-4.8.1-black)

[✨ Features](#-features) • [🚀 Quick Start](#-quick-start) • [📖 How to Use](#-how-to-use) • [🛠️ Tech Stack](#️-tech-stack)

</div>

---

## ✨ Features

🎯 **What Can You Do?**

- 💬 **Chat in Real-Time** - Messages appear instantly for everyone
- 🚪 **Create & Join Rooms** - Have separate conversations in different rooms
- 👥 **See Who's Online** - Live list of users in your room
- ⌨️ **Typing Indicators** - Know when someone is typing
- 📱 **Works Everywhere** - Desktop, tablet, and mobile
- 🎨 **Beautiful Design** - Modern, clean interface with smooth animations
- 💾 **Remembers You** - Saves your name for next time

## 🚀 Quick Start

### Step 1: Install Node.js

First, make sure you have Node.js installed:
- Download from [nodejs.org](https://nodejs.org/)
- Choose the LTS (Long Term Support) version
- Follow the installation wizard

### Step 2: Get the Code

```bash
# Download this project
git clone https://github.com/SaniyaManiyar0102/quickping-realtime

# Go into the project folder
cd quickping-realtime
```

### Step 3: Install & Run

```bash
# Install everything needed
npm install

# Start the chat app
npm start
```

### Step 4: Open in Browser

Open your web browser and go to:
```
http://localhost:3000
```

**That's it! You're ready to chat! 🎉**

---

## 📖 How to Use

### Starting Your First Chat

1. **Enter Your Name**
   - Type your name in the welcome screen
   
2. **Pick a Room**
   - Choose from popular rooms (general, random, tech, gaming)
   - Or create your own by typing a name!

3. **Start Chatting**
   - Type your message
   - Hit Enter or click "Send"
   - See your messages appear instantly!

### Testing with Friends

#### 🏠 Same Computer
1. Open multiple browser tabs
2. Use different names in each tab
3. Join the same room
4. Watch messages appear in all tabs instantly!

#### 📱 Different Devices (Same WiFi)

**On Your Computer:**
```bash
# Find your IP address (Mac/Linux)
ifconfig | grep "inet " | grep -v 127.0.0.1

# Or on Windows
ipconfig
```

**On Your Phone:**
- Connect to the same WiFi
- Open browser and go to: `http://YOUR_IP:3000`
- Join the same room as your computer
- Chat across devices!

### Cool Features to Try

- 🔄 **Change Room** - Click "Change Room" to switch rooms
- 🚪 **Leave Room** - Exit current room and join a new one
- 👥 **User List** - Check the sidebar to see who's online
- ⌨️ **Typing Status** - Start typing and others will see "... is typing"

---

## 🛠️ Tech Stack

**Built With:**
- **Node.js** - Server-side JavaScript
- **Express.js** - Web framework
- **Socket.IO** - Real-time communication
- **HTML/CSS/JavaScript** - Frontend

---

## 📁 Project Structure

```
quickping-realtime/
├── 📄 server.js          # Server code (handles rooms & messages)
├── 📁 public/
│   └── 📄 index.html     # The chat interface you see
├── 📦 package.json       # Project info & dependencies
└── 📖 README.md          # You are here!
```

---

## ⚙️ Configuration

### Change the Port

By default, the app runs on port 3000. To change it:

```bash
PORT=8080 npm start
```

### Run in Development Mode

Auto-restarts when you make changes:

```bash
npm run dev
```

---

<div align="center">

### ⭐ If you found this helpful, give it a star!

**Happy Chatting! 💬✨**

Made with 💜 for real-time communication

</div>
