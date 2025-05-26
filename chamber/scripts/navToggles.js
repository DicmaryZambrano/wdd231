const hamburger = document.querySelector("#HamMenu");
const menu = document.querySelector("#Menu");
const toggle = document.querySelector("#pageToggle");
const bodyDark = document.querySelector("#BodyDark");

hamburger.addEventListener("click", function () {
  menu.classList.toggle("active");
  hamburger.classList.toggle("active");
});

toggle.addEventListener("click", function () {
  toggle.classList.toggle("dark");
  bodyDark.classList.toggle("dark");
});