const worksfetch = await fetch("http://localhost:5678/api/works");
const works = await worksfetch.json();

/* Dynamically creating all the works from the api  */
function genererProjet(works) {
  for (let i = 0; i < works.length; i++) {
    const selectedWorks = works[i];
    const sectionGallery = document.querySelector(".gallery");
    const worksElement = document.createElement("figure");
    const imageElement = document.createElement("img");
    const figcaptionElement = document.createElement("figcaption");
    imageElement.src = selectedWorks.imageUrl;
    imageElement.alt = selectedWorks.title;
    figcaptionElement.innerText = selectedWorks.title;
    sectionGallery.appendChild(worksElement);
    worksElement.appendChild(imageElement);
    worksElement.appendChild(figcaptionElement)
  }
}

genererProjet(works);

//        Categories fetching for filter button
const categoriesFetch = await fetch("http://localhost:5678/api/categories");
const categories = await categoriesFetch.json();

/*                    Creating the buttons and their classes                    */

// No filter-button + his eventlistener
const sectionFilter = document.querySelector(".filter");
const noFilterButton = document.createElement("button");
noFilterButton.classList.add("btn-nofilter");
noFilterButton.classList.add("--selected")
noFilterButton.innerText = "Tous";
sectionFilter.appendChild(noFilterButton);

noFilterButton.addEventListener("click", () => {
  document.querySelector(".gallery").innerHTML = "";
  removeSelectedClass();
  noFilterButton.classList.add("--selected")
  genererProjet(works);
})

//  filter-button 
for (let i = 0; i < categories.length; i++) {
  const button = document.createElement("button");
  button.classList.add("btn-filter");
  button.innerText = categories[i].name;
  sectionFilter.appendChild(button);
}


const filterList = document.querySelectorAll(".btn-filter");



// their eventlistener

for (let i = 0; i < filterList.length; i++) {
  filterList[i].addEventListener("click", () => {
    removeAllSelectedClass();
    filterList[i].classList.add("--selected")

    const worksFiltered = works.filter(function (worksFiltering) {
      if (worksFiltering.category.name == categories[i].name) {
        return worksFiltering;
      }
    });
    // Deleting all works and regenerating only corresponding works
    document.querySelector(".gallery").innerHTML = "";
    genererProjet(worksFiltered);
  })
};

// function that allow to remove "--selected" class on everyitem but the selected one
function removeAllSelectedClass() {
  const buttonList = document.querySelectorAll(".btn-filter, .btn-nofilter")
  for (let i = 0; i < buttonList.length; i++) {
    buttonList[i].classList.remove("--selected");
  }
}