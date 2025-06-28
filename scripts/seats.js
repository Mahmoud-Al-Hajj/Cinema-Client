document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("seats-container");
  const confirmBtn = document.getElementById("confirmBooking");
  const selected = new Set();

  const showtimeId = new URLSearchParams(window.location.search).get(
    "showtime_id"
  );
  if (!showtimeId) return;

  fetch(`/Backend/controller/seats.php?showtime_id=${showtimeId}`)
    .then((res) => res.json())
    .then((seats) => {
      seats.forEach((seat) => {
        const btn = document.createElement("button");
        btn.textContent = seat.seat_row + seat.seat_number;
        btn.disabled = seat.is_booked == 1;
        btn.className = seat.is_booked ? "booked" : "available";

        btn.addEventListener("click", () => {
          if (btn.classList.contains("selected")) {
            selected.delete(seat.id);
            btn.classList.remove("selected");
            btn.classList.add("available");
          } else {
            selected.add(seat.id);
            btn.classList.remove("available");
            btn.classList.add("selected");
          }
        });

        container.appendChild(btn);
      });
    });

  confirmBtn.addEventListener("click", () => {
    if (selected.size === 0) return;

    fetch(`/Backend/controller/book_seats.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        showtime_id: showtimeId,
        seat_ids: Array.from(selected),
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          alert("Booking confirmed! Your booking ID: " + res.booking_id);
          window.location.href = "/Frontend/Pages/booking_history.html"; // redirect to booking history page (to build)
        } else {
          alert("Booking failed: " + (res.error || "Unknown error"));
          confirmBtn.disabled = false;
          confirmBtn.textContent = "Confirm Booking";
        }
      })
      .catch(() => {
        alert("Booking request failed, please try again.");
        confirmBtn.disabled = false;
        confirmBtn.textContent = "Confirm Booking";
      });
  });
});
