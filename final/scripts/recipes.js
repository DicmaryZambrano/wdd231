import { initThemeToggle, initMenuToggle } from './modules/toggles.mjs';
import { populateDates } from './modules/populate-dates.mjs';
import { getQueryParams, updateQueryParams, fetchData } from "./api/utils.mjs";
import { renderRecipeCards } from "./modules/renderCards.mjs";

export async function fetchAndRenderRecipes({ search, category, area, sort }) {
  const endpoint = search
    ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
    : `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;

  const res = await fetchData(endpoint);
  let meals = res?.meals || [];

  // Area filtering
  if (area) {
    const fullMeals = await Promise.all(
      meals.map(async meal => {
        const fullData = await fetchData(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`);
        return fullData?.meals?.[0];
      })
    );
    meals = fullMeals.filter(meal => meal?.strArea === area);
  }

  // Sorting
  if (sort === "az") {
    meals.sort((a, b) => a.strMeal.localeCompare(b.strMeal));
  } else if (sort === "za") {
    meals.sort((a, b) => b.strMeal.localeCompare(a.strMeal));
  }

  renderRecipeCards(meals, exploreContainer);
}

const form = document.getElementById("recipeFilterForm");
const exploreContainer = document.getElementById("recipesCards");


form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const filters = {
    search: formData.get("search"),
    category: formData.get("category"),
    area: formData.get("area"),
    sort: formData.get("sort"),
  };

  updateQueryParams(filters);
  await fetchAndRenderRecipes(filters);
});

window.addEventListener("DOMContentLoaded", () => {
  const filters = getQueryParams();

  document.querySelector('[name="search"]').value = filters.search;
  document.querySelector('[name="category"]').value = filters.category;
  document.querySelector('[name="area"]').value = filters.area;
  document.querySelector('[name="sort"]').value = filters.sort;

  fetchAndRenderRecipes(filters);
});

initThemeToggle("PageToggle");
initMenuToggle("Menu", "HamMenu");
populateDates("Date", "LastModified");