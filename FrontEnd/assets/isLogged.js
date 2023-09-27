let myToken = window.sessionStorage.getItem("myToken");
let apiToken = window.sessionStorage.getItem("apiToken");

if (myToken == apiToken) {

  /* LOGGOUT */
  const loggout = document.querySelector(".login");
  loggout.innerText = "logout";
  loggout.href = "./index.html"
  loggout.addEventListener("click", () => {
    window.sessionStorage.removeItem("apiToken");
  })

  /*         Generating logged interface        */

  /*                Header                 */
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

  /*          Works Modify text/icon          */
  const worksTitleSection = document.querySelector("#portfolio .title");
  const modifySection = document.createElement("div");
  modifySection.classList.add("modify");
  worksTitleSection.appendChild(modifySection);

  //Logo
  const worksModifyIcon = document.createElement("i")
  worksModifyIcon.classList.add("fa-regular", "fa-pen-to-square");
  modifySection.appendChild(worksModifyIcon);

  //Text
  const worksModifyText = document.createElement("p");
  worksModifyText.innerText = "modifier";
  modifySection.appendChild(worksModifyText);



  const filter = document.querySelector(".filter");
  filter.style.display = "none";


}