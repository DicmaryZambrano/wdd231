import { initThemeToggle, initMenuToggle } from './modules/toggles.mjs';
import { populateDates } from './modules/populate-dates.mjs';

initThemeToggle("PageToggle");
initMenuToggle("Menu", "HamMenu");
populateDates("Date", "LastModified");

const formTimestampInput = document.querySelector("input[name='timestamp']");

formTimestampInput.value = new Date().toISOString();
