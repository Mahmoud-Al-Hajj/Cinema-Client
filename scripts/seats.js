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

    const userId = localStorage.getItem("userId");
    if (!userId) {
      window.location.href = "/Frontend/Pages/login.html";
      return;
    }

    fetch(`/Backend/controller/book_seats.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: userId,
        showtime_id: showtimeId,
        seat_ids: Array.from(selected),
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        window.location.href = "/Frontend/Pages/booking_history.html";
      });
  });
});
