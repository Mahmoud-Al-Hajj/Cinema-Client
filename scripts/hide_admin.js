document.addEventListener("DOMContentLoaded", function () {
  var adminLink = document.getElementById("admin-link");
  if (!adminLink) return;
  if (localStorage.getItem("role") === "admin") {
    adminLink.style.display = "inline";
  } else {
    adminLink.style.display = "none";
  }
});
