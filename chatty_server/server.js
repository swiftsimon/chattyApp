const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });


// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

//wss is the connection
wss.on('connection', (ws) => {
  console.log('Client connected');
  console.log('OPEN SIZE', wss.clients.size)


  let countObj = {}
  countObj.countUsers = wss.clients.size;
  countObj.type = "userUpdate";
  let sendCount = JSON.stringify(countObj);

  wss.clients.forEach(function each(client) {
  if (client.readyState === ws.OPEN) {
        client.send(sendCount);
      }
    });


    //ws refers to the connected client
  ws.on('message', function incoming(data) {

    let newId = uuidv4();
    let parsedData = JSON.parse(data)

    switch(parsedData.type) {
        case "postMessage":
          parsedData.id = newId
          parsedData.type = "incomingMessage"
          let sendableData = JSON.stringify(parsedData)
          console.log("sending message from server", sendableData)
          wss.clients.forEach(function each(client) {
            if (client.readyState === ws.OPEN) {
              client.send(sendableData);
              }
            });
            break;

        case "postNotification":
          parsedData.id = newId
          parsedData.type = "incomingNotification"
          let sendNotification = JSON.stringify(parsedData)

          wss.clients.forEach(function each(client) {
            if (client.readyState === ws.OPEN) {
              client.send(sendNotification);
              }
            });

          break;

        default:
          throw new Error("Unknown type at server " + data.type);
      }

  });


  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {

    let countDownObj = {}
  countDownObj.countUsers = wss.clients.size;
  countDownObj.type = "userUpdate";
  let sendDownCount = JSON.stringify(countDownObj);

  wss.clients.forEach(function each(client) {
  if (client.readyState === ws.OPEN) {
        client.send(sendDownCount);
      }
    });


    console.log('Client disconnected');
    console.log('CLOSED #', wss.clients.size)
    })
});





