import { initThemeToggle, initMenuToggle } from './modules/toggles.mjs';
import { populateDates } from './modules/populate-dates.mjs';
import { getQueryParams, updateQueryParams, fetchData, capitalize } from "./api/utils.mjs";
import { renderRecipeCards } from "./modules/renderCards.mjs";

export async function fetchAndRenderRecipes({ search, category, area, sort }) {
  let meals = [];

  if (search) {
    // Get all matches by name
    const res = await fetchData(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
    meals = res?.meals || [];

    // Filter by category if needed
    if (category) {
      meals = meals.filter(meal => meal?.strCategory === category);
    }
  } else if (category) {
    // Get meals by category
    const res = await fetchData(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${capitalize(category)}`);
    meals = res?.meals || [];
  }

  // If area is specified, fetch full data and filter
  if (area && meals.length > 0) {
    const fullMeals = await Promise.all(
      meals.map(async meal => {
        const id = meal.idMeal;
        const fullData = await fetchData(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
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
    category: capitalize(formData.get("c")),
    area: capitalize(formData.get("a")),
    sort: formData.get("s")
  };

  updateQueryParams(filters);
  await fetchAndRenderRecipes(filters);
});

window.addEventListener("DOMContentLoaded", () => {
  const filters = getQueryParams();

  document.querySelector('[name="search"]').value = filters.search;
  document.querySelector('[name="c"]').value = filters.category.toLowerCase();
  document.querySelector('[name="a"]').value = filters.area.toLowerCase();
  document.querySelector(`[name="s"][value="${filters.sort}"]`).checked = true;

  fetchAndRenderRecipes(filters);
});

initThemeToggle("PageToggle");
initMenuToggle("Menu", "HamMenu");
populateDates("Date", "LastModified");