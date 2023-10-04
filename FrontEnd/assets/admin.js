let myToken = window.sessionStorage.getItem("myToken");

if (myToken) {
  const filter = document.querySelector(".filter");
  filter.style.display = "none";

  /* LOGGOUT btn*/
  {
  const loggout = document.querySelector(".login");
  loggout.innerText = "logout";
  loggout.href = "./index.html"
  loggout.addEventListener("click", () => {
    window.sessionStorage.removeItem("myToken");
  })
  }
  /*  Modal Header  */
  {
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
  }
  /*  Edit-Work button  */
  { 
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
  }
}

function modalOverAll() {
  
  //Empeche l'ouverture de plusieurs boite modale
  if ( document.querySelector(".modal-frame") != null)return console.log("Boite Modale ouverte !");

  // Creating the HTML tag
  const portfolioSection = document.querySelector("#portfolio");
  const modalOverAll = document.createElement("aside");
  modalOverAll.classList.add("modal")
  modalOverAll.setAttribute("id", "modal1");
  modalOverAll.setAttribute("aria-hidden", "true")
  modalOverAll.setAttribute("role", "dialog")
  modalOverAll.setAttribute("style", "display:none;")
  portfolioSection.appendChild(modalOverAll);

  modalFrame();
  editWorksInterface();
  openModal();

}

function modalFrame() {
  const modalOverAll = document.getElementById("modal1")
  const modalFrame = document.createElement("div");
  modalFrame.classList.add("modal-frame", "js-modal-stop");
  modalOverAll.appendChild(modalFrame);
}

const openModal = function () {
  const target = document.getElementById("modal1");
  //Cette ligne va permettre à "display: none" de devenir null, ce qui aura...
  //...pour effet de laisser le CSS prendre le relais sur l'affichage de "modal1"...
  //... qui donc aura comme valeur "flex"...
  target.style.display = null;
  target.removeAttribute("aria-hidden");
  target.setAttribute("aria-modal", "true");
  
  //Cette partie la, permet de définir les actions qui vont fermer la fenetre modale...
  //...la première ligne permet de fermer en cliquant dans la zone extérieur...
  //...de la fenetre, c'est à dire en cliquand sur l'élement "const target"...
  target.addEventListener("click", closeModal);
  //...la deuxième ligne permet de fermer en cliquant sur l'élement qui a comme classe...
  //..."js-modal", c'est à dire le bouton "X" dans la fenetre...
  target.querySelector(".js-modal-close").addEventListener("click", closeModal);
  // ???
  target.querySelector(".js-modal-stop").addEventListener("click", stopPropagation);
}

const closeModal = function () {
  document.getElementById("modal1").remove();
}

/*            Contenu Fenetre modale : Modifier Galerie          */
async function editWorksInterface(){

  const modalFrame = document.querySelector(".modal-frame");
  modalExitButton();
  modalTitle("Galerie Photo");
  //Creation de la galerie
  const galery = document.createElement("div")
  galery.classList.add("modal-galery")
  modalFrame.appendChild(galery)
  //Récuperation des projets sur l'api
  const fetchWork = await fetch("http://localhost:5678/api/works")
  const works = await fetchWork.json();
  //Charge les projets puis les affiches par elements présent dans l'api
  for (let i = 0; i < works.length; i++){
    const modalWorks = document.querySelector(".modal-galery");
    const workElement = document.createElement("div");
    workElement.style = "position:relative;"
    const workImg = document.createElement("img");
    workImg.src = works[i].imageUrl;
    workImg.alt = works[i].title;
    modalWorks.appendChild(workElement)
    workElement.appendChild(workImg)

    //Créer un bouton delete pour chaque projet chargé
    const deleteWorkButton = document.createElement("div")
    deleteWorkButton.classList.add("btn-delete")
    const deleteWorkIcon = document.createElement("i")
    deleteWorkIcon.classList.add("fa-solid", "fa-trash-can", "delete-icon")
    deleteWorkButton.appendChild(deleteWorkIcon)
    workElement.appendChild(deleteWorkButton)

    //EventListener sur les boutons delete qui permet de supprimer les projets de l'api

    deleteWorkButton.addEventListener("click", async (e)=>
    {
      e.preventDefault();
      await fetch(`http://localhost:5678/api/works/${works[i].id}`,{
        method:"DELETE",
        headers: {"Authorization": `Bearer ${window.sessionStorage.getItem("myToken")}`}
      })
      refreshEditGallery();
      refreshGallery();
    })
    
  }

  line()
  // Le bouton "Ajout de photo"
  const addButton = document.createElement("button")
  addButton.classList.add("addButton")
  addButton.innerText="Ajouter une photo"
  modalFrame.appendChild(addButton)
  
  //Son eventListener qui va permettre de changer de page
  addButton.addEventListener("click",()=>{
    modalFrame.innerHTML="";
    submitNewWorksInterface();
  })
} 

/*               Contenu Fenetre modale : Ajout de Photo          */
function submitNewWorksInterface(){
  const modalFrame = document.querySelector(".modal-frame");

  modalExitButton();
  returnArrow();
  modalTitle("Ajout Photo")

  // Création contenu HTML/CSS de la modal ajout photo
  const form = document.createElement("form");
  form.classList.add("addpicture-wrap")
  modalFrame.appendChild(form)
  //Element qui enveloppera la parti du form qui aura l'option d'Ajouter une photo
  const chooseImgWrap = document.createElement("div")
  chooseImgWrap.classList.add("chooseImg-wrap")
  //Logo
  const chooseImgLogo = document.createElement("i")
  chooseImgLogo.classList.add("fa-regular","fa-image")


  form.appendChild(chooseImgWrap)
  chooseImgWrap.appendChild(chooseImgLogo)

}

//Exit button
function modalExitButton(){
  const modalFrame = document.querySelector(".modal-frame");
  const modalExitButton = document.createElement("div");
  modalExitButton.classList.add("js-modal-close");
  modalExitButton.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
  modalFrame.appendChild(modalExitButton);
  modalExitButton.addEventListener("click", closeModal);
}

//Function that create the "returnArrow" button
function returnArrow(){

  const modalReturnArrow = document.createElement("div");
  modalReturnArrow.classList.add("js-modal-return");
  modalReturnArrow.innerHTML=`<i class="fa-solid fa-arrow-left"></i>`;  
  document.querySelector(".modal-frame").appendChild(modalReturnArrow);
  modalReturnArrow.addEventListener("click", () =>{
    document.querySelector(".modal-frame").innerHTML=""
    editWorksInterface();
  })
}

//Function that create the title of the window (titleSTring = Title InnerText)
function modalTitle(titleString){
  const modalFrame = document.querySelector(".modal-frame");
  const modalTitle = document.createElement("h3")
  modalTitle.innerText= titleString;
  modalFrame.appendChild(modalTitle);
}

//Function that draw the line in the modal window to separate elements
function line(){
  const modalFrame = document.querySelector(".modal-frame")
  const line = document.createElement("div")
  line.classList.add("line")
  modalFrame.appendChild(line)
}

const stopPropagation = function (e) {
  e.stopPropagation()
}


async function refreshGallery() {
  const workFetch = await fetch ("http://localhost:5678/api/works");
  const works = await workFetch.json();

  document.querySelector(".gallery").innerHTML = "";

  for (let i=0; i < works.length ; i++){
    const selectedWorks = works[i];
    const sectionGallery = document.querySelector(".gallery");
    // Creating the HTML tag
    const worksElement = document.createElement("figure");
    const imageElement = document.createElement("img");
    const figcaptionElement = document.createElement("figcaption");
    // Setting img src and alt text and the caption text
    imageElement.src = selectedWorks.imageUrl;
    imageElement.alt = selectedWorks.title;
    figcaptionElement.innerText = selectedWorks.title;
    // Appending elements to the DOM
    sectionGallery.appendChild(worksElement);
    worksElement.appendChild(imageElement);
    worksElement.appendChild(figcaptionElement)
  }
}

async function refreshEditGallery() {
  const workFetch = await fetch ("http://localhost:5678/api/works");
  const works = await workFetch.json();

  document.querySelector(".modal-galery").innerHTML = "";

  for (let i = 0; i < works.length; i++){
    const modalWorks = document.querySelector(".modal-galery");
    const workElement = document.createElement("div");
    workElement.style = "position:relative;"
    const workImg = document.createElement("img");
    workImg.src = works[i].imageUrl;
    workImg.alt = works[i].title;
    modalWorks.appendChild(workElement)
    workElement.appendChild(workImg)

    //Créer un bouton delete pour chaque projet chargé
    const deleteWorkButton = document.createElement("div")
    deleteWorkButton.classList.add("btn-delete")
    const deleteWorkIcon = document.createElement("i")
    deleteWorkIcon.classList.add("fa-solid", "fa-trash-can", "delete-icon")
    deleteWorkButton.appendChild(deleteWorkIcon)
    workElement.appendChild(deleteWorkButton)

    //EventListener sur les boutons delete qui permet de supprimer les projets de l'api
    deleteWorkButton.addEventListener("click", async (e)=>
    {
      e.preventDefault();
      await fetch(`http://localhost:5678/api/works/${works[i].id}`,{
        method:"DELETE",
        headers: {"Authorization": `Bearer ${window.sessionStorage.getItem("myToken")}`}
      })
      refreshEditGallery();
      refreshGallery();

    })
    
  }
}

window.addEventListener("keydown", function (e) {

  console.log()
  if (e.key === "Escape" || e.key === "Esc") {
    closeModal(e)
  }
})