const loginForm = document.querySelector(".login-form");

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const identifiants = {
    email: event.target.querySelector("[name=email]").value,
    password: event.target.querySelector("[name=password]").value
  }


  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(identifiants)
  })
    .then(response => response.json())
    .then(response => {

      if (response.userId && response.token) {
        window.sessionStorage.setItem("apiToken", response.token);
        window.sessionStorage.setItem("myToken", response.token);

        alert("Connexion réussie !");
        window.location.href = "index.html";

      } else {

        alert("Identifiants incorrects. Veuillez réessayer.");
      }
    })
}
);
