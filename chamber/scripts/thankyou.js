const params = new URLSearchParams(window.location.search);
const results = document.querySelector("#Results");

function populateResults(form, target) {

  const list = document.createElement("ul");
  list.classList.add("form-results");

  const entries = [
    { label: "Name", value: `${form.get("first-name")} ${form.get("last-name")}` },
    { label: "Organization Name", value: form.get("organization-title") },
    { label: "Email", value: form.get("email") },
    { label: "Phone", value: form.get("phone") },
    { label: "Membership", value: form.get("membership") },
    { label: "Description", value: form.get("description") },
    { label: "Joined", value: form.get("timestamp") }
  ];

  for (const entry of entries) {
    const item = document.createElement("li");
    item.textContent = `${entry.label}: ${entry.value}`;
    list.appendChild(item);
  }

  target.appendChild(list);
}

populateResults(params, results);