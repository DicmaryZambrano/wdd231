import { initThemeToggle, initMenuToggle } from './modules/toggles.mjs';
import { populateDates } from './modules/populate-dates.mjs';
import { fetchData } from "./api/utils.mjs";
import { renderRecipeCards } from "./modules/renderCards.mjs";

async function showFeaturedRecipes() {
  const container = document.getElementById("recipesCards");
  const data = await fetchData(`https://www.themealdb.com/api/json/v1/1/filter.php?c=Breakfast`);

  const shuffled = data.meals.sort(() => 0.5 - Math.random()).slice(0, 8);

  renderRecipeCards(shuffled, container, false)
}

initThemeToggle("PageToggle");
initMenuToggle("Menu", "HamMenu");
populateDates("Date", "LastModified");
showFeaturedRecipes();