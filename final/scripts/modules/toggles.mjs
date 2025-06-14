export function initThemeToggle(toggleButtonId) {
  const toggleButton = document.getElementById(toggleButtonId);
  if (!toggleButton) {
    console.error(`Toggle button with ID '${toggleButtonId}' not found.`);
    return;
  }

  toggleButton.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });

  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
}

export function initMenuToggle(menuId, buttonId) {
  const menu = document.getElementById(menuId);
  const button = document.getElementById(buttonId);

  button.addEventListener("click", () => {
    menu.classList.toggle("open");
    button.classList.toggle("open");
  });
}
