const hamburguerElement = document.querySelector('#myButton');
const navElement = document.querySelector('#myList');

hamburguerElement.addEventListener('click', () => { 
    navElement.classList.toggle('open');
    hamburguerElement.classList.toggle('open');
});