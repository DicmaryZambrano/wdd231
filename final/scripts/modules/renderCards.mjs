import { showRecipeDialog } from "./dialog.mjs";

export function renderRecipeCards(data, container) {
  container.innerHTML = "";

  data.forEach((recipe) => {
    const card = document.createElement("div");
    card.classList.add("recipe-card");

    const title = document.createElement("h3");
    title.textContent = recipe.strMeal;

    const img = document.createElement("img");
    img.src = recipe.strMealThumb;
    img.alt = recipe.strMeal;
    img.width = 200;
    img.height = 200;

    const button = document.createElement("button");
    button.textContent = "View Details";
    button.addEventListener("click", () => showRecipeDialog(recipe));

    card.append(img, title, button);
    container.appendChild(card);
  });
}
