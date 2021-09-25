const express = require("express");
var http = require("http");
const app = express();
const port = process.env.port || 8000;
var server = http.createServer(app);
var io = require("socket.io")(server);

// Middlewre
app.use(express.json());
var clients={};


//socket io
io.on("connection",(socket)=>{
    console.log("connected");
    console.log(socket.id,"has joined")
    socket.on("signin", (id)=>{
        console.log(id);
        clients[id]=socket;
        console.log(clients);
    })
    socket.on("msg",(msg)=>{
        console.log(msg);
        let targetid = msg.targetid;
        if (clients[targetid])
        clients[targetid].emit("msg",msg);

    });
});
app.route("/check").get((req,res)=>{
    return res.json("Your App Is OK");
});

server.listen(port,"0.0.0.0",()=>{
    console.log("server started");
});
