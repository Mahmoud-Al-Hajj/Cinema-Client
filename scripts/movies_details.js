document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("movie-details");
  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get("id");

  if (!movieId) {
    container.textContent = "No movie ID specified.";
    return;
  }

  fetch(`/Backend/controller/movies_detail.php?id=${movieId}`)
    .then((res) => res.json())
    .then((movie) => {
      console.log("Movie JSON:", movie); // Add this line

      container.innerHTML = `
                <div class="movie-container">
                    <img src="${movie.poster_url}" alt="${movie.title}" class="poster" />
                    <div class="info">
                        <h1>${movie.title}</h1>
                        <p><strong>Genre:</strong> ${movie.genre}</p>
                        <p><strong>Director:</strong> ${movie.director}</p>
                        <p><strong>Duration:</strong> ${movie.duration} mins</p>
                        <p><strong>Release Date:</strong> ${movie.release_date}</p>
                        <p>${movie.description}</p>
                        <a class="showtimes-button" href="showtimes.html?movie_id=${movie.id}">View Showtimes</a>
                    </div>
                </div>
            `;
    })
    .catch(() => {
      container.textContent = "Failed to load movie details.";
    });
});
