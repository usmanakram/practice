const mongoose = require("mongoose");
// const express = require("express");
// const app = express();

mongoose
  .connect("mongodb://localhost/mongo-exercises")
  .then(() => console.log("Connected to MongoDB"))
  .catch(error => console.log("Could not connect to MongoDB...", error));

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
    // match: /pattern/
  },
  category: {
    type: String,
    require: true,
    enum: ["web", "mobile", "network"],
    lowercase: true,
    // uppercase: true,
    trim: true
  },
  author: String,
  tags: {
    type: Array,
    validate: {
      isAsync: true,
      validator: function(v, callback) {
        setTimeout(() => {
          /**
           * Do some async work and when the result is ready, call "callback" with the result
           */
          const result = v && v.length > 0;
          callback(result);
        }, 4000);
      },
      message: "A course should have at least one tag."
    }
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function() {
      return this.isPublished;
    },
    min: 10,
    max: 200,
    get: v => Math.round(v),
    set: v => Math.round(v)
  }
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Angular Course",
    category: "-",
    author: "Usman",
    // tags: ["angular", "frontend"],
    // tags: [],
    tags: null,
    isPublished: true,
    price: 15
  });

  try {
    const result = await course.save();
    console.log(result);
  } catch (ex) {
    // console.log(ex.message);
    // OR
    for (field in ex.errors) {
      // For complete error object
      console.log(ex.errors[field]);
      // For only error message (property)
      console.log(ex.errors[field].message);
    }
  }
}

async function getCourses() {
  const courses = await Course.find({ isPublished: true, tags: "backend" })
    // .sort({ name: 1 })
    .sort("name")
    // .select({ name: 1, author: 1 })
    .select("name author");

  console.log(courses);
  return courses;
}

async function updateCourse(id) {}

async function removeCourse(id) {}

createCourse();

/* app.use("/courses", (req, res) => {
  console.log("good to see you");
  const courses = getCourses();
  res.send(courses);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`)); */
