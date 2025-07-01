document.addEventListener("DOMContentLoaded", function () {
  if (localStorage.getItem("role") === "admin") {
    document.getElementById("admin-link").style.display = "inline";
  } else {
    document.getElementById("admin-link").style.display = "none";
  }
});
