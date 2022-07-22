//Welcome to the chat. Type below to begin a conversation...
const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 7071 });

const clients = new Map();
const cs = [];

wss.on("connection", (ws, a) => {
  console.log("connected");
  const id = uuidv4();
  const color = Math.floor(Math.random() * 360);
  cs.push(ws);

  ws.on("message", (messageAsString) => {
    console.log("got msg");
    console.log(messageAsString.toString());
    cs.forEach((ws) => {
      ws.send(messageAsString.toString());
    });
  });
});

wss.on("close", () => {
  clients.delete(ws);
});

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

console.log("wss on");
