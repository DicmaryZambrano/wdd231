const FAVORITES_KEY = "favoriteRecipes";

export function getFavorites() {
  const data = localStorage.getItem(FAVORITES_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveFavorites(favorites) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export function toggleFavorite(idMeal) {
  let favorites = getFavorites();
  if (favorites.includes(idMeal)) {
    favorites = favorites.filter(id => id !== idMeal);
  } else {
    favorites.push(idMeal);
  }
  saveFavorites(favorites);
}

export function isFavorite(idMeal) {
  return getFavorites().includes(idMeal);
}
