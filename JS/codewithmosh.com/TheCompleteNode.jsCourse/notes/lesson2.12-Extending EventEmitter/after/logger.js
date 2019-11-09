const EventEmitter = require("events");

class Logger extends EventEmitter {
  log(message) {
    // Send an HTTP request
    console.log(message);

    // Raise an event
    this.emit("messageLogged", { id: 1, url: "http://" });
  }
}

// module.exports.log = log;
// OR
module.exports = Logger;
