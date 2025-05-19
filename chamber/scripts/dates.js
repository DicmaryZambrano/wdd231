document.querySelector("#date").innerHTML = `&#169;${new Date().toLocaleDateString("en-US", {year: "numeric"})}`;

document.querySelector("#lastModified").innerHTML = `Last Modified: ${new Date(document.lastModified).toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit" })}`;