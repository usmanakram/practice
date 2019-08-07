/*
import React from "react";
import ReactDOM from "react-dom";

// jsx expression
const element = <h1>Hello World</h1>;
console.log(element);

ReactDOM.render(element, document.getElementById("root"));
*/

// Named export, import ... from '';
// import { Teacher } from "./teacher";

// Default export, import ... from '';
// import Teacher from "./teacher";

// We can export one or more objects from a given module.
import Teacher, { promote } from "./teacher";

const teacher = new Teacher("Usman", "MSc");
teacher.teach();
