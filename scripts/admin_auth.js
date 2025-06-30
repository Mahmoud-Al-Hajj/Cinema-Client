// fetch("/Backend/controller/showProfile.php")
//   .then((res) => res.json())
//   .then((data) => {
//     if (!data.success || data.role !== "admin") {
//       window.location.href = "/Frontend/Pages/login.html";
//     }
//   })
//   .catch(() => {
//     window.location.href = "/Frontend/Pages/login.html";
//   });

const user = JSON.parse(localStorage.getItem("user"));
if (!user || user.role !== "admin") {
  alert("You are not admin");
  window.location.href = "/Frontend/Pages/movies.html";
}
