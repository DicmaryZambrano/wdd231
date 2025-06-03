const params = new URLSearchParams(window.location.search);
const results = document.querySelector("#Results");

function populateResults(form, target) {
  const list = document.createElement("ul");
  list.classList.add("form-results");

  const entries = [
    { label: "Name", value: `${form.get("first-name") || ""} ${form.get("last-name") || ""}`.trim() },
    { label: "Organization Name", value: form.get("organization-title") || "N/A" },
    { label: "Email", value: form.get("email") || "N/A" },
    { label: "Phone", value: form.get("phone") || "N/A" },
    { label: "Membership", value: form.get("membership") || "N/A" },
    { label: "Description", value: form.get("description") || "N/A" },
    { label: "Website", value: form.get("website") || "N/A" },
    { label: "Job Title", value: form.get("job-title") || "N/A" },
    { label: "Joined", value: form.get("timestamp") || "N/A" }
  ];

  for (const entry of entries) {
    const item = document.createElement("li");
    item.textContent = `${entry.label}: ${entry.value}`;
    list.appendChild(item);
  }

  target.appendChild(list);
}

populateResults(params, results);
