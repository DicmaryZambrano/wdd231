import { initThemeToggle, initMenuToggle } from './modules/toggles.mjs';
import { populateDates } from './modules/populate-dates.mjs';

initThemeToggle("PageToggle");
initMenuToggle("Menu", "HamMenu");
populateDates("Date", "LastModified");

const params = new URLSearchParams(window.location.search);
const results = document.querySelector("#Results");

function populateResults(form, target) {
  const list = document.createElement("ul");
  list.classList.add("form-results");

  const entries = [
    { label: "Name", value: `${form.get("first-name") || ""} ${form.get("last-name") || ""}`.trim() },
    { label: "Birthday", value: form.get("birthday") || "N/A" },
    { label: "Email", value: form.get("email") || "N/A" },
    { label: "Phone", value: form.get("phone") || "N/A" },
    { label: "Favorite Foods", value: form.get("food-preferences") || "N/A" },
    { label: "Food Allergies", value: form.get("food-allergies") || "None" },
    { label: "Diet", value: form.get("diet") || "N/A" },
    { label: "Discovery", value: form.get("blog-discovery") || "N/A" },
    { label: "Bio", value: form.get("bio") || "N/A" },
    {
      label: "Submitted At",
      value: form.get("timestamp")
        ? new Date(form.get("timestamp")).toLocaleString('en-US', {
          dateStyle: "long",
          timeStyle: "short"
        })
        : "N/A"
    }
  ];

  for (const entry of entries) {
    const item = document.createElement("li");
    item.textContent = `${entry.label}: ${entry.value}`;
    list.appendChild(item);
  }

  target.appendChild(list);
}

populateResults(params, results);