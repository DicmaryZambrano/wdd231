document.addEventListener("DOMContentLoaded", () => {
  const gridToggle = document.getElementById("gridToggle");
  const listToggle = document.getElementById("listToggle");
  const cards = document.getElementById("Cards");

  gridToggle.addEventListener("click", () => {
    cards.classList.add("grid");
    cards.classList.remove("list");
    gridToggle.classList.add("tg-active");
    listToggle.classList.remove("tg-active");
  });

  listToggle.addEventListener("click", () => {
    cards.classList.remove("grid");
    cards.classList.add("list");
    listToggle.classList.add("tg-active");
    gridToggle.classList.remove("tg-active");
  });
});


const hamburger = document.querySelector("#HamMenu");
const menu = document.querySelector("#Menu");
const toggle = document.querySelector("#pageToggle");
const directory = document.querySelector("#Directory-page");

hamburger.addEventListener("click", function () {
  menu.classList.toggle("active");
  hamburger.classList.toggle("active");
});

toggle.addEventListener("click", function () {
  toggle.classList.toggle("dark");
  directory.classList.toggle("dark");
});