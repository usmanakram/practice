// Named export, import ... from '';
// import { Teacher } from "./teacher";

// Default export, import ... from '';
// import Teacher from "./teacher";

// We can export one or more objects from a given module.
import Teacher, { promote } from "./teacher";

const teacher = new Teacher("Usman", "MSc");
teacher.teach();
