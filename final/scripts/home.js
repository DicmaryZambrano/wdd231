import { initThemeToggle, initMenuToggle } from './modules/toggles.mjs';
import { populateDates } from './modules/populate-dates.mjs';


initThemeToggle("PageToggle");
initMenuToggle("Menu", "HamMenu");
populateDates("Date", "LastModified");

const closeButton = document.getElementById("CloseAdd");	

closeButton.addEventListener("click", () => {
  const ad = document.getElementById("AdBox");
  ad.remove();
});