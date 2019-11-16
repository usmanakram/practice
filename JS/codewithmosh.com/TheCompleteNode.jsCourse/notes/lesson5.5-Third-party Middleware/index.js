const morgan = require("morgan");
const Joi = require("joi");
const logger = require("./logger");
const express = require("express");
const app = express();

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

// logging http requests in console
app.use(morgan("tiny"));

// Custom middleware
app.use(logger);

// Custom middleware
app.use(function(req, res, next) {
  console.log("Authenticating...");
  // console.log(Object.keys(req));
  // console.log(req.body);
  next();
});

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" }
];

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.post("/api/courses", (req, res) => {
  /**
   * validatoin without Joi package
   */
  /* if (!req.body.name || req.body.name.length < 3) {
    // 400 Bad Request
    res
      .status(400)
      .send("Name is required and should be minimum 3 characters.");
    return;
  } */

  /**
   * validation with Joi package
   */
  /* const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };

  const result = Joi.validate(req.body, schema);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  } */

  // some better solution
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
  // Look up the course
  // if not existing, return 404
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with given ID was not found");

  // Validate
  // If invalid, return 400 - Bad Request
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Update course
  course.name = req.body.name;
  // Return the updated course
  res.send(course);
});

function validateCourse(course) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };

  return Joi.validate(course, schema);
}

app.delete("/api/courses/:id", (req, res) => {
  // Look up the course
  // Not existing, return 404
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with given ID was not found");

  // Delete
  const index = courses.indexOf(course);
  courses.splice(index, 1);

  // Return the same course
  res.send(course);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with given ID was not found");
  res.send(course);
});

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
