// server.js
const path = require("path");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve the static frontend
app.use(express.static(path.join(__dirname, "public")));

// Store room users: { roomName: [{ id, user }, ...] }
const roomUsers = {};

// Helper to get users in a room
function getUsersInRoom(room) {
  return roomUsers[room] || [];
}

// Helper to add user to room
function addUserToRoom(room, socketId, user) {
  if (!roomUsers[room]) {
    roomUsers[room] = [];
  }
  // Remove user if already exists (reconnection case)
  roomUsers[room] = roomUsers[room].filter(u => u.id !== socketId);
  roomUsers[room].push({ id: socketId, user });
  return getUsersInRoom(room);
}

// Helper to remove user from room
function removeUserFromRoom(room, socketId) {
  if (roomUsers[room]) {
    roomUsers[room] = roomUsers[room].filter(u => u.id !== socketId);
    if (roomUsers[room].length === 0) {
      delete roomUsers[room];
    }
  }
  return getUsersInRoom(room);
}

io.on("connection", (socket) => {
  console.log("a user connected:", socket.id);
  
  let currentRoom = null;
  let currentUser = null;

  // Handle room joining
  socket.on("room:join", ({ room, user }) => {
    // Leave previous room if any
    if (currentRoom) {
      socket.leave(currentRoom);
      const remainingUsers = removeUserFromRoom(currentRoom, socket.id);
      socket.to(currentRoom).emit("system", `👋 ${currentUser || socket.id} left the room`);
      io.to(currentRoom).emit("room:users", getUsersInRoom(currentRoom));
    }

    // Join new room
    currentRoom = room;
    currentUser = user;
    socket.join(room);
    
    // Add user to room list
    const roomUsersList = addUserToRoom(room, socket.id, user);
    
    console.log(`${user} (${socket.id}) joined room: ${room}`);
    
    // Notify user they joined
    socket.emit("room:joined", { room, users: roomUsersList });
    
    // Notify others in the room
    socket.to(room).emit("system", `✅ ${user} joined the room`);
    
    // Broadcast updated user list to everyone in the room
    io.to(room).emit("room:users", roomUsersList);
  });

  // Handle leaving room
  socket.on("room:leave", () => {
    if (currentRoom) {
      socket.leave(currentRoom);
      const remainingUsers = removeUserFromRoom(currentRoom, socket.id);
      socket.to(currentRoom).emit("system", `👋 ${currentUser} left the room`);
      io.to(currentRoom).emit("room:users", remainingUsers);
      
      console.log(`${currentUser} (${socket.id}) left room: ${currentRoom}`);
      
      // Notify the user they left
      socket.emit("room:left");
      
      currentRoom = null;
      currentUser = null;
    }
  });

  // Receive chat message from this socket and broadcast to room only
  socket.on("chat:message", (payload) => {
    // payload: { user, text, room }
    if (!currentRoom) {
      socket.emit("system", "❌ Please join a room first");
      return;
    }
    
    const messageData = { 
      id: socket.id, 
      user: payload.user,
      text: payload.text,
      ts: Date.now() 
    };
    
    // Send to everyone in the room (including sender)
    io.to(currentRoom).emit("chat:message", messageData);
  });

  // Optional typing indicator (room-specific)
  socket.on("chat:typing", (user) => {
    if (currentRoom) {
      socket.to(currentRoom).emit("chat:typing", user);
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected:", socket.id);
    if (currentRoom && currentUser) {
      const remainingUsers = removeUserFromRoom(currentRoom, socket.id);
      socket.to(currentRoom).emit("system", `👋 ${currentUser} left the room`);
      io.to(currentRoom).emit("room:users", remainingUsers);
    }
  });
});

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0'; // Listen on all network interfaces

server.listen(PORT, HOST, () => {
  console.log(`QuickPing Realtime server running on:`);
  console.log(`  Local:   http://localhost:${PORT}`);
  console.log(`  Network: http://10.97.122.5:${PORT}`);
});
