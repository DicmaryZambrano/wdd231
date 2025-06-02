const courses = [
  {
    subject: 'CSE',
    number: 110,
    title: 'Introduction to Programming',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
    technology: [
      'Python'
    ],
    completed: true
  },
  {
    subject: 'WDD',
    number: 130,
    title: 'Web Fundamentals',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
    technology: [
      'HTML',
      'CSS'
    ],
    completed: true
  },
  {
    subject: 'CSE',
    number: 111,
    title: 'Programming with Functions',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
    technology: [
      'Python'
    ],
    completed: true
  },
  {
    subject: 'CSE',
    number: 210,
    title: 'Programming with Classes',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
    technology: [
      'C#'
    ],
    completed: true
  },
  {
    subject: 'WDD',
    number: 131,
    title: 'Dynamic Web Fundamentals',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
    technology: [
      'HTML',
      'CSS',
      'JavaScript'
    ],
    completed: true
  },
  {
    subject: 'WDD',
    number: 231,
    title: 'Frontend Web Development I',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
    technology: [
      'HTML',
      'CSS',
      'JavaScript'
    ],
    completed: false
  }
]

function populateDialog(course) {
  dialogDetails.innerHTML = '';


  const courseTitle = document.createElement("h2");
  courseTitle.textContent = course.title;

  const courseCredit = document.createElement("p");
  courseCredit.textContent = `Credits: ${course.credits}`;

  const certificate = document.createElement("p");
  certificate.textContent = `Certificate: ${course.certificate}`;

  const description = document.createElement("p");
  description.textContent = course.description;

  const techUl = document.createElement("ul");
  if (Array.isArray(course.technology)) {
    course.technology.forEach((item) => {
      const techLi = document.createElement("li");
      techLi.textContent = item;
      techUl.appendChild(techLi);
    });
  }

  const techLabel = document.createElement("p");
  techLabel.textContent = "Technologies Covered:";

  dialogDetails.append(courseTitle, courseCredit, certificate, description, techLabel, techUl);
  courseDialog.showModal();
}

function displayCourses(filter, courses) {
  courseContainer.innerHTML = '';

  const filteredCourses = filter ? courses.filter(course => course.subject === filter) : courses;

  filteredCourses.forEach((course) => {
    const button = document.createElement("button");
    button.addEventListener("click", () => populateDialog(course));

    const courseItem = document.createElement("li");
    courseItem.classList.add("course-item");
    if (course.completed) {
      courseItem.classList.add("completed");
    }

    courseItem.textContent = `${course.subject} ${course.number}`;
    button.appendChild(courseItem);
    courseContainer.appendChild(button);
  });
}

function updateTotalCredits() {
  const visibleCourses = Array.from(document.querySelectorAll('.course-item'));
  const totalCredits = visibleCourses.reduce((sum, item) => {
    const course = courses.find(course => `${course.subject} ${course.number}` === item.textContent);
    return sum + (course ? course.credits : 0);
  }, 0);

  document.querySelector("#total-credits").textContent = `Total Credits: ${totalCredits}`;
}


document.querySelector("#AllButton").addEventListener("click", () => displayCourses("", courses));
document.querySelector("#CseButton").addEventListener("click", () => displayCourses("CSE", courses));
document.querySelector("#WddButton").addEventListener("click", () => displayCourses("WDD", courses));

const courseContainer = document.querySelector(".course-list");
const courseDialog = document.querySelector("#courseDetails");
const dialogDetails = document.querySelector("#courseDetails div");
const courseClose = document.querySelector("#courseDetails button");

courseClose.addEventListener("click", () => courseDialog.close());

document.querySelectorAll("button[data-subject='filter']").forEach(button => {
  button.addEventListener("click", () => setTimeout(updateTotalCredits, 100));
});

// Display all courses on page load
displayCourses("", courses);
updateTotalCredits();
