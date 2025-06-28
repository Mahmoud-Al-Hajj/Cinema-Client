let allMovies = [];

fetch("/Backend/controller/movies.php")
  .then((res) => res.json())
  .then((movies) => {
    allMovies = movies;
    renderMovies(allMovies);
  });

function renderMovies(movies) {
  const container = document.getElementById("movies-container");
  container.innerHTML = "";

  if (!movies.length) {
    return;
  }

  movies.forEach((movie) => {
    const div = document.createElement("div");
    div.className = "movie";
    div.innerHTML = `<h2>${movie.title}</h2>
<a href="movies_info.html?id=${movie.id}" class="view-details-link">View Details</a>
      <p><strong>Genre:</strong> ${movie.genre}</p>
      <img src="${movie.poster_url}" alt="Poster" />
      
    `;
    container.appendChild(div);
  });
}

document.getElementById("searchBtn").addEventListener("click", () => {
  const term = document.getElementById("searchInput").value.toLowerCase();
  const filtered = allMovies.filter((m) =>
    m.title.toLowerCase().includes(term)
  );
  renderMovies(filtered);
});
