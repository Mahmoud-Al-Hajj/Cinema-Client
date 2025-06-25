const apiKey = "63f2a122";
const movieGrid = document.getElementById("movie-grid");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (!query) return;

  fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`)
    .then((res) => res.json())
    .then((data) => {
      movieGrid.innerHTML = "";
      data.Search.forEach((movie) => {
        const card = document.createElement("div");
        card.className = "movie-card";
        card.innerHTML = `
          <img src="${
            movie.Poster !== "N/A"
              ? movie.Poster
              : "https://via.placeholder.com/300x450?text=No+Image"
          }" alt="${movie.Title}" />
          <h3>${movie.Title} (${movie.Year})</h3>
        `;
        movieGrid.appendChild(card);
      });
    });
});
