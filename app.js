// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require('dotenv/config');
const express = require('express');
const socket = require("socket.io")
// ℹ️ Connects to the database
require('./db');
const app = express();
require('./config')(app);
const PORT = process.env.PORT || 5005;

const server = app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express


// ℹ️ This function is getting exported from the config folder. It runs most middlewares
// 👇 Start handling routes here
// Contrary to the views version, all routes are controled from the routes/index.js
const allRoutes = require('./routes');
app.use('/api', allRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app);

io = socket(server);

io.on("connection", (socket) => {
    console.log(socket.id);

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log("User jooined room:" + data)
    });

    socket.on("send_message", (data) => {
        console.log(data);
        socket.to(data.room).emit("recieve_message", data.content)
    });

    socket.on("disconnect", () => {
        console.log("User disconnected")
    })

})


module.exports = app;
