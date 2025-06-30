document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(this);

  fetch("/Backend/controller/user.php", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        localStorage.setItem("userId", data.user_id);
        window.location.href = "/Frontend/Pages/movies.html";
      } else {
        alert("Incorrect email or password.");
        window.location.href = "/Frontend/Pages/login.html";
      }
    });
});
