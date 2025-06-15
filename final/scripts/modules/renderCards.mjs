import { showRecipeDialog } from "./dialog.mjs";

export function renderRecipeCards(data, container, showButton = true) {
  container.innerHTML = "";

  if (!data || !Array.isArray(data) || data.length === 0) {
    const message = document.createElement("p");
    message.textContent = "No recipes found.";
    container.appendChild(message);
    return;
  }

  data.forEach((recipe) => {
    const card = document.createElement("div");
    card.classList.add("recipe-card");

    const title = document.createElement("h3");
    title.textContent = recipe.strMeal;

    const img = document.createElement("img");
    img.src = `${recipe.strMealThumb}/small`;
    img.alt = recipe.strMeal;
    img.width = 150;
    img.height = 150;
    img.loading = "lazy"

    card.append(img, title);

    if (showButton) {
      const viewBtn = document.createElement("button");
      viewBtn.textContent = "View Details";
      viewBtn.addEventListener("click", () => showRecipeDialog(recipe));
      card.appendChild(viewBtn);
    }

    container.appendChild(card);
  });
}