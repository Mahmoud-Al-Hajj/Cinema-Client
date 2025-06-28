document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(this);

  fetch("/Backend/controller/user.php", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      localStorage.setItem("userId", data.user_id);
      localStorage.setItem("userName", data.user_name);
      window.location.href = "/Frontend/Pages/movies.html";
    });
});
