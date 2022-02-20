const express = require("express");

const server = express();

server.all("/", (req: any, res: any) => {
  res.send("Bot is running !");
});

function keepAlive() {
  server.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
}

module.exports = keepAlive;
