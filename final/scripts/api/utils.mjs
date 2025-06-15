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

export function capitalize(str) {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : "";
}

export function getQueryParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    search: params.get("search") || "",
    category: capitalize(params.get("c") || "breakfast"),
    area: capitalize(params.get("a") || ""),
    sort: params.get("s") || "",
  };
}

export function updateQueryParams({ search, category, area, sort }) {
  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (category) params.set("c", category.toLowerCase());
  if (area) params.set("a", area.toLowerCase());
  if (sort) params.set("s", sort);
  history.pushState({}, "", `${location.pathname}?${params.toString()}`);
}