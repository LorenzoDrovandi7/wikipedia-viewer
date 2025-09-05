const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const randomBtn = document.getElementById("randomBtn");
const resultsDiv = document.getElementById("results");

async function searchWiki(query) {
  const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${query}&utf8=&format=json&origin=*`;
  const response = await fetch(url);
  const data = await response.json();
  displayResults(data.query.search);
}

function displayResults(results) {
  resultsDiv.innerHTML = "";
  results.forEach((item) => {
    const url = `https://en.wikipedia.org/wiki/${encodeURIComponent(item.title)}`;
    const div = document.createElement("div");
    div.classList.add("result");
    div.innerHTML = `
      <a href="${url}" target="_blank">${item.title}</a>
      <p>${item.snippet}...</p>
    `;
    resultsDiv.appendChild(div);
  });
}

searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query) searchWiki(query);
});

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const query = searchInput.value.trim();
    if (query) searchWiki(query);
  }
});

randomBtn.addEventListener("click", () => {
  window.open("https://en.wikipedia.org/wiki/Special:Random", "_blank");
});
