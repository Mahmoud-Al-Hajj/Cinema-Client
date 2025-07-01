fetch("/Backend/controller/movies.php")
  .then((res) => res.json())
  .then((movies) => {
    const movieList = document.getElementById("movie-list");
    movieList.innerHTML = "";

    movies.forEach((movie) => {
      const movieItem = document.createElement("div");
      movieItem.className = "movie-item";
      movieItem.innerHTML = `
                    <div class="movie-info">
                    <h3>${movie.title}</h3>
                    <p>Genre: ${movie.genre}</p>
                    <p>Director: ${movie.director}</p>
                    </div>
                    <button onclick="deleteMovie(${movie.id})" class="btn-delete">Delete</button>
            `;
      movieList.appendChild(movieItem);
    });
  });

function showAddMovieForm() {
  document.getElementById("add-movie-form").style.display = "block";
}

function hideAddMovieForm() {
  document.getElementById("add-movie-form").style.display = "none";
}

function addMovie() {
  const formData = {
    title: document.getElementById("title").value,
    description: document.getElementById("description").value,
    release_date: document.getElementById("release_date").value,
    duration: document.getElementById("duration").value,
    genre: document.getElementById("genre").value,
    director: document.getElementById("director").value,
    poster_url: document.getElementById("poster_url").value,
  };

  fetch("/Backend/controller/add_movie.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  })
    .then((res) => res.json())
    .then((data) => {
      alert(data.message);
      if (data.success) {
        location.reload();
      }
    });
}

function cancelBooking(id) {
  if (!confirm("Cancel this booking?")) return;

  fetch("/Backend/controller/delete_booking.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ booking_id: id }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        alert("Booking canceled.");
        location.reload();
      } else {
        alert("Error: " + data.message);
      }
    })
    .catch((error) => {
      alert("An error occurred while deleting the booking.");
      console.error(error);
    });
}

function deleteMovie(id) {
  if (!confirm("Are you sure you want to delete this movie?")) return;

  fetch("/Backend/controller/delete_movie.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ movie_id: id }),
  })
    .then((res) => res.json())
    .then((data) => {
      location.reload();
    });
}
