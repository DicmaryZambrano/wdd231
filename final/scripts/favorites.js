import { initThemeToggle, initMenuToggle } from './modules/toggles.mjs';
import { populateDates } from './modules/populate-dates.mjs';
import { getFavorites } from "./modules/favorites.mjs";
import { fetchRecipeById } from "./api/utils.mjs";
import { renderRecipeCards } from "./modules/renderCards.mjs";

initThemeToggle("PageToggle");
initMenuToggle("Menu", "HamMenu");
populateDates("Date", "LastModified");

const favoritesContainer = document.querySelector("#favoritesCards");

async function loadFavorites() {
  const ids = getFavorites();
  const results = await Promise.all(ids.map(fetchRecipeById));
  renderRecipeCards(results.filter(Boolean), favoritesContainer);
}

loadFavorites();