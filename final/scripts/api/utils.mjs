export async function fetchRecipeById(idMeal) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
  const data = await response.json();
  return data.meals ? data.meals[0] : null;
}

export function getQueryParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    search: params.get("search") || "",
    category: params.get("category") || "Breakfast",
    area: params.get("area") || "",
    sort: params.get("sort") || "",
  };
}

export function updateQueryParams({ search, category, area, sort }) {
  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (category) params.set("category", category);
  if (area) params.set("area", area);
  if (sort) params.set("sort", sort);
  history.pushState({}, "", `${location.pathname}?${params.toString()}`);
}