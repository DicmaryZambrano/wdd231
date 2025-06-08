// Load and display the visit messages

const facts = [
  "Valera is often called the commercial heart of Trujillo.",
  "Trujillo is known as the City of Eternal Spring.",
  "La Morita hosts one of the oldest horse races in the region.",
  "Many local holidays are celebrated with traditional dancing.",
  "The Monumento de la Paz symbolizes hope and unity.",
  "The International Spring Festival has been held for over 60 years!"
];

document.getElementById("fun-fact").textContent =
  facts[Math.floor(Math.random() * facts.length)];

const visitMessage = document.getElementById("visit-message");
const lastVisit = localStorage.getItem("lastVisit");
const now = Date.now();

if (!lastVisit) {
  visitMessage.textContent = "Welcome! Have a look around to the best places in Trujillo.";
} else {
  const daysBetween = Math.floor((now - Number(lastVisit)) / (1000 * 60 * 60 * 24));
  if (daysBetween < 1) {
    visitMessage.textContent = "Back so soon! Awesome!";
  } else {
    visitMessage.textContent = `You last visited ${daysBetween} day${daysBetween === 1 ? "" : "s"} ago.`;
  }
}
localStorage.setItem("lastVisit", now.toString());

// Load and display the cards
const url = "./data/discover.json";
const gallery = document.getElementById("gallery");

function generateItemCard(data, index) {
  const card = document.createElement("div");
  card.classList.add("discover_card");

  const title = document.createElement("h2");
  title.textContent = data.name;
  card.appendChild(title);

  const figure = document.createElement("figure");
  const img = document.createElement("img");
  img.src = data.image;
  img.alt = data.name;
  img.width = 300;
  img.height = 200;

  // Only apply lazy loading for items after the first 6
  if (index >= 6) {
    img.loading = "lazy";
  }

  figure.appendChild(img);
  card.appendChild(figure);

  const address = document.createElement("address");
  address.textContent = data.address;
  card.appendChild(address);

  const description = document.createElement("p");
  description.textContent = data.description;
  card.appendChild(description);

  const button = document.createElement("button");
  button.textContent = "Learn More";
  card.appendChild(button);

  return card;
}

function displayItems(items) {
  items.forEach((item, index) => {
    const card = generateItemCard(item, index);
    gallery.appendChild(card);
  });
}

async function getDiscoverItems(url) {
  const response = await fetch(url);
  if (response.ok) {
    const data = await response.json();
    displayItems(data);
  }
}

getDiscoverItems(url);