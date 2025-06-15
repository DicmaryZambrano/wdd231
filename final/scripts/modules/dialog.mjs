import { isFavorite, toggleFavorite } from './favorites.mjs';
import { fetchRecipeById } from '../api/utils.mjs';

export async function showRecipeDialog(recipe) {
  const dialog = document.getElementById("modal");

  if (!dialog) {
    console.warn("Dialog element with id 'modal' not found.");
    return;
  }

  const dialogDetails = dialog.querySelector(".modal-content");
  const closeBtn = document.getElementById("modalClose");

  // Clear modal content
  dialogDetails.innerHTML = "";

  if (closeBtn) {
    closeBtn.onclick = () => {
      dialogDetails.innerHTML = "";
      dialog.close();
    };
  }

  const data = await fetchRecipeById(recipe.idMeal);

  // Title
  const title = document.createElement("h2");
  title.textContent = data.strMeal;

  // Sidebar (image + video)
  const aside = document.createElement("aside");

  const img = document.createElement("img");
  img.src = data.strMealThumb;
  img.alt = data.strMeal;

  const video = document.createElement("iframe");
  video.src = data.strYoutube.replace("watch?v=", "embed/");
  video.width = "100%";
  video.height = "200";
  video.allowFullscreen = true;

  aside.append(img, video);

  // Main content
  const article = document.createElement("article");

  const category = document.createElement("p");
  category.innerHTML = `<strong>Category:</strong> ${data.strCategory}`;

  const area = document.createElement("p");
  area.innerHTML = `<strong>Area:</strong> ${data.strArea}`;

  const ingredientsTitle = document.createElement("h3");
  ingredientsTitle.textContent = "Ingredients";

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

  const instructionsTitle = document.createElement("h3");
  instructionsTitle.textContent = "Instructions";

  const instructions = document.createElement("p");
  instructions.textContent = data.strInstructions;

  article.append(
    category,
    area,
    ingredientsTitle,
    ingredientsList,
    instructionsTitle,
    instructions
  );

  // Favorite button
  const favButton = document.createElement("button");
  favButton.textContent = isFavorite(data.idMeal) ? "💔 Remove" : "❤️ Add";
  favButton.ariaLabel = "Toggle favorite";
  favButton.className = "favorite-button";
  favButton.addEventListener("click", () => {
    toggleFavorite(data.idMeal);
    favButton.textContent = isFavorite(data.idMeal) ? "💔 Remove" : "❤️ Add";
  });

  dialogDetails.append(title, aside, article, favButton);

  // Render
  dialog.showModal();
}