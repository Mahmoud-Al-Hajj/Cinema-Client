fetch("/Backend/controller/movies.php")
  .then((res) => res.json())
  .then((movies) => {
    const movieSelect = document.getElementById("movieSelect");
    movies.forEach((movie) => {
      const opt = document.createElement("option");
      opt.value = movie.id;
      opt.textContent = movie.title;
      movieSelect.appendChild(opt);
    });
  });

//showtimes
// change is used when selecting <select>
document.getElementById("movieSelect").addEventListener("change", function () {
  const movieId = this.value;
  const showtimeSelect = document.getElementById("showtimeSelect");
  showtimeSelect.innerHTML = '<option value=""> Select Showtime </option>';
  document.getElementById("seatsArea").innerHTML = "";
  if (!movieId) return;
  fetch(`/Backend/controller/showtimes.php?movie_id=${movieId}`)
    .then((res) => res.json())
    .then((showtimes) => {
      showtimes.forEach((st) => {
        const opt = document.createElement("option");
        opt.value = st.id;
        opt.textContent =
          (st.showtime ? st.showtime : st.id) +
          (st.auditorium ? " - " + st.auditorium : "");
        showtimeSelect.appendChild(opt);
      });
    });
});

//seats when showtime is selected
document
  .getElementById("showtimeSelect")
  .addEventListener("change", function () {
    const showtimeId = this.value;
    const seatsArea = document.getElementById("seatsArea");
    seatsArea.innerHTML = "";
    if (!showtimeId) return;
    fetch(`/Backend/controller/seats.php?showtime_id=${showtimeId}`)
      .then((res) => res.json())
      .then((seats) => {
        const seatGrid = document.createElement("div");
        seats.forEach((seat) => {
          const btn = document.createElement("button");
          btn.textContent = seat.seat_row + seat.seat_number;
          btn.className =
            "seat-btn " + (seat.is_booked ? "booked" : "available");
          btn.disabled = seat.is_booked == 1;
          seatGrid.appendChild(btn);
        });
        seatsArea.appendChild(seatGrid);
      });
  });

// Add showtime
document
  .getElementById("addShowtimeForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const movieId = document.getElementById("movieSelect").value;
    const showtime = document.getElementById("newShowtime").value;
    const auditorium = document.getElementById("newAuditorium").value;
    if (!movieId || !showtime || !auditorium) return;
    fetch("/Backend/controller/showtimes.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ movie_id: movieId, showtime, auditorium }),
    })
      .then((res) => res.json())
      .then((data) => {
        document.getElementById("showtimeMsg").textContent = data.success
          ? "Showtime added!"
          : data.message || "Failed to add showtime";
        document
          .getElementById("movieSelect")
          .dispatchEvent(new Event("change"));
      });
  });

// Add seat
document.getElementById("addSeatForm").addEventListener("submit", function (e) {
  const showtimeId = document.getElementById("showtimeSelect").value;
  if (!showtimeId) {
    e.preventDefault();
    document.getElementById("seatMsg").textContent =
      "Please select a showtime before adding a seat.";
    return;
  }
  const seat_row = document.getElementById("seatRow").value;
  const seat_number = document.getElementById("seatNumber").value;
  if (!showtimeId || !seat_row || !seat_number) return;
  fetch("/Backend/controller/seats.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      showtime_id: showtimeId,
      seat_row,
      seat_number,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("seatMsg").textContent = data.success
        ? "Seat added!"
        : data.message || "Failed to add seat";
      document
        .getElementById("showtimeSelect")
        .dispatchEvent(new Event("change"));
    });
});
