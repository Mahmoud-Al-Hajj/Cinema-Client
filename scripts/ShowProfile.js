const userId = localStorage.getItem("userId");
if (!userId) {
  window.location.href = "/Frontend/Pages/login.html";
}

fetch(`/Backend/controller/showProfile.php?user_id=${userId}`)
  .then((res) => res.json())
  .then((data) => {
    if (!data.success) {
      window.location.href = "/Frontend/Pages/login.html";
      return;
    }
    document.querySelector('input[name="user_id"]').value = data.user_id;
    document.querySelector('input[name="name"]').value = data.name || "";
    document.querySelector('input[name="email"]').value = data.email || "";
    document.querySelector('input[name="phone"]').value = data.phone || "";
    document.querySelector('input[name="favorite_genres"]').value =
      data.favorite_genres || "";
    const roleDiv = document.createElement("div");
    roleDiv.textContent = "Role: " + (data.role || "user");
    document.querySelector(".profile-inner").appendChild(roleDiv);
  })
  .catch(() => {
    window.location.href = "/Frontend/Pages/login.html";
  });

document
  .querySelector(".profile-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    fetch("/Backend/controller/updateProfile.php", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        window.location.href = "/Frontend/Pages/profile.html";
      });
  });
