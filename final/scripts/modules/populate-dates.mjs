export function populateDates(dateId, lastModifiedId) {
  const date = document.getElementById(dateId);
  const lastModified = document.getElementById(lastModifiedId);

  date.textContent = `©${new Date().toLocaleDateString('en-US', {
    year: 'numeric'
  })} `

  lastModified.textContent = `Last Modified: ${new Date(document.lastModified).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })} `
}