import { modalOverAll } from "./function.js";
import { closeModal } from "./function.js";

let myToken = window.sessionStorage.getItem("myToken");

if (myToken) {
  const filter = document.querySelector(".filter");
  filter.style.display = "none";

  /* LOGGOUT */
  {
  const loggout = document.querySelector(".login");
  loggout.innerText = "logout";
  loggout.href = "./index.html"
  loggout.addEventListener("click", () => {
    window.sessionStorage.removeItem("myToken");
  })
  }

  /*         Generating logged interface        */
  //Plutot que de passer par des display:none=>display:x je prefere generé les élements en JS...
  //... Ca permettra d'avoir un minimum de "sécurité" et par la, j'entend: ne pas permettre...
  //... à n'importe quel utilisateur de pouvoir changer le CSS et accèder à des options...
  //... uniquement disponible pour "l'admin".

  /*               Modal Header                 */
  
    const body = document.querySelector("body");
    const editModeHeader = document.createElement("div");
    editModeHeader.classList.add("editModeHeader")
    body.insertBefore(editModeHeader, body.firstChild);
    //Logo
    const headerEditIcon = document.createElement("i")
    headerEditIcon.classList.add("fa-regular", "fa-pen-to-square")
    editModeHeader.appendChild(headerEditIcon);
    //Text
    const headerEditModeText = document.createElement("p");
    headerEditModeText.innerText = "Mode édition";
    headerEditModeText.classList.add("headerEditText");
    editModeHeader.appendChild(headerEditModeText);
  

  /*                   Edit Work Button                   */
  //Link
  const worksTitleSection = document.querySelector("#portfolio .title");
  const modalbutton = document.createElement("a");
  modalbutton.classList.add("js-modal");
  modalbutton.href = "#modal1";
  worksTitleSection.appendChild(modalbutton);
  //Logo
  const worksModifyIcon = document.createElement("i")
  worksModifyIcon.classList.add("fa-regular", "fa-pen-to-square");
  modalbutton.appendChild(worksModifyIcon);
  //Text
  const worksModifyText = document.createElement("p");
  worksModifyText.innerText = "modifier";
  modalbutton.appendChild(worksModifyText);
  document.querySelector('.js-modal').addEventListener("click",modalOverAll)


  //QUESTION : Faut il passer plutot par le HTML et CSS pour faire la boite modale ? C'est bcp + simple, mais...
  //Rien qu'avec l'inspecteur on peut changer les options comme bon nous sembles et ainsi accéder à tout.
  
  /*                    Modale window                     */


window.addEventListener("keydown", function (e) {
  if (e.key === "Escape" || e.key === "Esc") {
    closeModal(e)
  }
})

}