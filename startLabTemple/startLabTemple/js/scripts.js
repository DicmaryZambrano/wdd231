import { temples, url } from '../data/temples.js'

const templeContainer = document.querySelector("#showHere")
const templeDialog = document.querySelector("#mydialog")
const templeClose = document.querySelector("#mydialog button")
const p = document.querySelector("#mydialog p")
const title = templeDialog.querySelector("h2")

function populateDialog(temple) {
  title.innerText = temple.name
  p.innerText = `Dedicated ${temple.dedicated} by ${temple.person} `
  templeDialog.showModal();
}

function showTemples(temples) {
  temples.forEach((temple) => {
    const button = document.createElement("button")
    button.addEventListener("click", () => {
      populateDialog(temple)
    })
    const templeImage = document.createElement("img");
    templeImage.src = `${url}${temple.path}`;
    templeImage.alt = `${temple.name}`
    button.appendChild(templeImage)
    templeContainer.appendChild(button)
  })
}

templeClose.addEventListener("click", () => {
  templeDialog.close()
})

showTemples(temples)