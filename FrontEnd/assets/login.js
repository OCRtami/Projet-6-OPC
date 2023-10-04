const loginForm = document.querySelector(".login-form");

//Lorsque l'on soumet le formulaire...
loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  //Créer une const qui va recevoir ce qui a été entré dans les champs de saisie (email et password)
  //La constante va les stocker dans un objet...
  const identifiants = {
    email: event.target.querySelector("[name=email]").value,
    password: event.target.querySelector("[name=password]").value
  }

  //Envoie la const à l'api qui va traiter les données
  //Method POST permet de dire qu'on ENVOIE,
  //Header permet de dire quel type de fichier ( JSON)
  //Body convertie la const au format JSON
  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(identifiants)
  })
    //On recupere la reponse
    .then(response => response.json())
    .then(response => {
      // Si la réponse contient une ID et un token...
      if (response.userId && response.token) {
        window.sessionStorage.setItem("myToken", response.token);
        alert("Connexion réussie !");
        window.location.href = "index.html";

      } else {

        alert("Identifiants incorrects. Veuillez réessayer.");
      }
    })
}
);
