const debug = require("debug")("app:startup");
const config = require("config");
const morgan = require("morgan");
const helmet = require("helmet");
const Joi = require("joi");
const logger = require("./middleware/logger");
const courses = require("./routes/courses");
const home = require("./routes/home");
const express = require("express");
const app = express();

/**
 * Setting view engine for application
 * By setting engine, express automatically load it. That's why, no need to require.
 */
app.set("view engine", "pug");
// Setting directory to load views
app.set("views", "./views"); // default

/**
 * req.body.name
 * In order for this line to work, we need to enable parsing of json objects in the body of the request.
 * Because, by defautl this feature is not enabled in express.
 *
 * For that we are going to add a piece of middleware.
 */
app.use(express.json());

// This middleware function parses incoming requrest with urlencoded payload.
app.use(express.urlencoded({ extended: true }));

/**
 * With this middleware, we can server static content.
 * http://localhost:3000/readme.txt
 */
app.use(express.static("public"));
app.use(helmet());
app.use("/api/courses", courses);
app.use("/", home);

// Configuration
console.log("Application Name: " + config.get("name"));
console.log("Mail Server: " + config.get("mail.host"));
console.log("Mail Password: " + config.get("mail.password"));

if (app.get("env") === "development") {
  // logging http requests in console
  app.use(morgan("tiny"));
  debug("Morgan enabled...");
}

// Custom middleware
app.use(logger);

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
