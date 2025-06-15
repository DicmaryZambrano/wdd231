import { isFavorite, toggleFavorite } from './favorites.mjs';
import { fetchRecipeById } from '../api/utils.mjs';

export async function showRecipeDialog(recipe) {
  const dialog = document.getElementById("modal");

  // exit if the dialog doesn't exist
  if (!dialog) {
    console.warn("Dialog element with id 'modal' not found.");
    return;
  }

  const dialogDetails = document.querySelector("#modal div");
  const closeBtn = document.getElementById("modalClose");

  // Clear previous listeners and content
  dialogDetails.innerHTML = "";

  if (closeBtn) {
    closeBtn.onclick = () => {
      dialogDetails.innerHTML = "";
      dialog.close();
    };
  }

  const data = await fetchRecipeById(recipe.idMeal);

  const container = document.createElement("div");
  container.className = "recipe-dialog-content";

  const header = document.createElement("div");
  header.className = "dialog-header";

  const body = document.createElement("div");
  body.className = "dialog-body";

  const aside = document.createElement("aside");
  aside.className = "dialog-sidebar";

  const content = document.createElement("article");
  content.className = "dialog-main";

  // Title
  const title = document.createElement("h2");
  title.textContent = data.strMeal;
  header.appendChild(title);

  // Image
  const img = document.createElement("img");
  img.src = data.strMealThumb;
  img.alt = data.strMeal;

  // Category & Area
  const category = document.createElement("p");
  category.innerHTML = `<strong>Category:</strong> ${data.strCategory}`;

  const area = document.createElement("p");
  area.innerHTML = `<strong>Area:</strong> ${data.strArea}`;

  // Ingredients
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

  // Instructions
  const instructionsTitle = document.createElement("h3");
  instructionsTitle.textContent = "Instructions";

  const instructions = document.createElement("p");
  instructions.innerHTML = data.strInstructions;

  // Video
  const video = document.createElement("iframe");
  video.src = data.strYoutube.replace("watch?v=", "embed/");
  video.width = "100%";
  video.height = "200";
  video.allowFullscreen = true;

  // Favorite Button
  const favButton = document.createElement("button");
  favButton.textContent = isFavorite(data.idMeal) ? "💔 Remove" : "❤️ Add";
  favButton.ariaLabel = "Toggle favorite";
  favButton.className = "favorite-button";
  favButton.addEventListener("click", () => {
    toggleFavorite(data.idMeal);
    favButton.textContent = isFavorite(data.idMeal) ? "💔 Remove" : "❤️ Add";
  });

  // Assemble content
  aside.appendChild(img);
  aside.appendChild(video);

  content.append(category, area, ingredientsTitle, ingredientsList, instructionsTitle, instructions,);

  body.append(aside, content);
  container.append(header, body, favButton);

  // Render
  dialogDetails.appendChild(container);
  dialog.showModal();
}