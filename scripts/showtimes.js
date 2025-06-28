document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("showtime-list");
  const movieId = new URLSearchParams(window.location.search).get("movie_id");

  if (!movieId) {
    container.textContent = "Movie ID missing.";
    return;
  }

  fetch(`/Backend/controller/showtimes.php?movie_id=${movieId}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.length === 0) {
        container.textContent = "No showtimes available.";
        return;
      }

      data.forEach((show) => {
        const div = document.createElement("div");
        div.className = "showtime-card"; // card container

        div.innerHTML = `
          <div class="showtime-info">${new Date(
            show.showtime
          ).toLocaleString()}</div>
          <div class="auditorium">${show.auditorium}</div>
          <a href="seats.html?showtime_id=${
            show.id
          }" class="button">Book Seats</a>
        `;

        container.appendChild(div);
      });
    })
    .catch(() => (container.textContent = "Failed to load showtimes."));
});
