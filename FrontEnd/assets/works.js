const worksfetch = await fetch("http://localhost:5678/api/works");
const works = await worksfetch.json();
//        Categories fetching for filter button
const categoriesFetch = await fetch("http://localhost:5678/api/categories");
const categories = await categoriesFetch.json();

import { genererProjet } from "./function.js";
import { createFilterButton } from "./function.js";
import { removeAllSelectedClass } from "./function.js";

genererProjet(works);

// BUTTON "TOUS"/nofilter btn
const sectionFilter = document.querySelector(".filter");
const noFilterButton = document.createElement("button");
noFilterButton.classList.add("btn-nofilter");
noFilterButton.classList.add("--selected")
noFilterButton.innerText = "Tous";
sectionFilter.appendChild(noFilterButton);
// BUTTON "TOUS" EVENTLISTENER
noFilterButton.addEventListener("click", (event) => {
  removeAllSelectedClass();
  document.querySelector(".gallery").innerHTML = "";
  event.target.classList.add("--selected")
  genererProjet(works);
})

createFilterButton(categories, works);