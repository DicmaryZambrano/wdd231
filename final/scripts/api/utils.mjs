export async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}

export async function fetchRecipeById(idMeal) {
  const data = await fetchData(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
  return data?.meals ? data.meals[0] : null;
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