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
        <button class="btn-cancel" onclick="cancelBooking(${b.id})">Cancel</button>
      `;

      ul.appendChild(li);
    });

    container.innerHTML = "";
    container.appendChild(ul);
  });

document.getElementById("back-button").addEventListener("click", () => {
  window.location.href = "movies.html";
});

function cancelBooking(id) {
  if (!confirm("Cancel this booking?")) return;

  fetch("/Backend/controller/delete_booking.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ booking_id: id }),
  })
    .then((res) => res.json())
    .then((data) => {
      alert("booking canceled.");
      location.reload();
    });
}
