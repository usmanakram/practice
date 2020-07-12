const express = require("express");
const app = express();

/**
 * req.body.name
 * In order for this line to work, we need to enable parsing of json objects in the body of the request.
 * Because, by default this feature is not enabled in express.
 *
 * For that we are going to add a piece of middleware.
 *
 */
app.use(express.json());

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
  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course);
});

app.get("/api/courses/:id", (req, res) => {
  // res.send(req.params.id);
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send("The course with given ID was not found");
  res.send(course);
});

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
