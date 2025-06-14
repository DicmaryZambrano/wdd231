import { isFavorite, toggleFavorite } from './favorites.mjs';
import { fetchRecipeById } from '../api/utils.mjs';

const dialog = document.getElementById("modal");
const dialogDetails = document.querySelector("#modal div");
const closeBtn = document.getElementById("modalClose");

closeBtn.addEventListener("click", () => dialog.close());

export async function showRecipeDialog(recipe) {
  const data = await fetchRecipeById(recipe.idMeal)

  dialogDetails.innerHTML = "";

  const title = document.createElement("h2");
  title.textContent = data.strMeal;

  const img = document.createElement("img");
  img.src = data.strMealThumb;
  img.alt = data.strMeal;
  img.width = 300;
  img.height = 300;

  const category = document.createElement("p");
  category.textContent = `Category: ${data.strCategory}`;

  const area = document.createElement("p");
  area.textContent = `Area: ${data.strArea}`;

  const instructions = document.createElement("p");
  instructions.textContent = data.strInstructions;

  const ingredientsList = document.createElement("ul");
  for (let i = 1; i <= 20; i++) {
    const ingredient = data[`strIngredient${i}`];
    const measure = data[`strMeasure${i}`];

    if (ingredient && ingredient.trim()) {
      const li = document.createElement("li");
      li.textContent = `${measure} ${ingredient}`;
      ingredientsList.appendChild(li);
    }
  }

  const video = document.createElement("iframe");
  video.width = "300";
  video.height = "200";
  video.src = data.strYoutube.replace("watch?v=", "embed/");
  video.allowFullscreen = true;

  const favButton = document.createElement("button");
  favButton.textContent = isFavorite(data.idMeal) ? "💔" : "❤️";
  favButton.addEventListener("click", () => {
    toggleFavorite(data.idMeal);
    favButton.textContent = isFavorite(data.idMeal) ? "💔" : "❤️";
  });

  dialogDetails.append(title, img, category, area, instructions, ingredientsList, video, favButton);
  dialog.showModal();
}
