const container = document.getElementById("booking-list");

fetch(`/Backend/controller/get_booking.php`)
  .then((res) => res.json())
  .then((bookings) => {
    if (!bookings || bookings.length === 0) {
      container.textContent = "No bookings found.";
      return;
    }

    const ul = document.createElement("ul");
    ul.classList.add("booking-list");

    bookings.forEach((b) => {
      const li = document.createElement("li");
      li.classList.add("booking-list-item");

      li.innerHTML = `
        <span class="booking-id">Movie: ${b.movie_title}</span>
        <span class="booking-id">Auditorium: ${b.auditorium}</span>
        <span class="booking-status status-${b.status}">${b.status}</span>
      `;
      ul.appendChild(li);
    });

    container.innerHTML = ""; // clear container first
    container.appendChild(ul);
  });
document.getElementById("back-button").addEventListener("click", () => {
  window.location.href = "movies.html";
});
