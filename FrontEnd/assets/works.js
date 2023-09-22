const worksfetch = await fetch("http://localhost:5678/api/works");
const works = await worksfetch.json();

/* Dynamically creating all the works from the api  */
function genererProjet(works) {
  for (let i = 0; i < works.length; i++) {

    const selectedWorks = works[i];

    const sectionGallery = document.querySelector(".gallery");
    const worksElement = document.createElement("figure");

    const imageElement = document.createElement("img");
    imageElement.src = selectedWorks.imageUrl;
    imageElement.alt = selectedWorks.title;

    const figcaptionElement = document.createElement("figcaption");
    figcaptionElement.innerText = selectedWorks.title;

    sectionGallery.appendChild(worksElement);
    worksElement.appendChild(imageElement);
    worksElement.appendChild(figcaptionElement)
  }
}

genererProjet(works);


/* Tous FILTER */
const tousButton = document.querySelector(".btn-tous");

tousButton.addEventListener("click", () => {

  const tousFiltered = works.filter(function (tousFilter) {
    return tousFilter.category.name;
  });
  document.querySelector(".gallery").innerHTML = ""
  genererProjet(tousFiltered);
})

/* Objets FILTER */
const objetsButton = document.querySelector(".btn-objets");

objetsButton.addEventListener("click", () => {

  const objectFiltered = works.filter(function (objectFilter) {
    if (objectFilter.category.name == "Objets") {
      return objectFilter;
    }
  });
  // Deleting work and regenerating only corresponding works
  document.querySelector(".gallery").innerHTML = "";
  genererProjet(objectFiltered)
})

/* Appartements FILTER */
const appartementsButton = document.querySelector(".btn-appartements");

appartementsButton.addEventListener("click", () => {

  const appartementsFiltered = works.filter(function (appartementsFilter) {

    if (appartementsFilter.category.name == "Appartements") {
      return appartementsFilter;
    }
  });
  // Deleting work and regenerating only corresponding works
  document.querySelector(".gallery").innerHTML = "";
  genererProjet(appartementsFiltered)
})

/* Hotel & restaurant FILTER */
const hotelrestaurantButton = document.querySelector(".btn-hotelrestaurant");

hotelrestaurantButton.addEventListener("click", () => {

  const hotelrestaurantFiltered = works.filter(function (hotelrestaurantFilter) {

    if (hotelrestaurantFilter.category.name == "Hotels & restaurants") {
      return hotelrestaurantFilter;
    }
  });
  // Deleting work and regenerating only corresponding works
  document.querySelector(".gallery").innerHTML = "";
  genererProjet(hotelrestaurantFiltered)
})