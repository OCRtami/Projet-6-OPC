const worksfetch = await fetch("http://localhost:5678/api/works");
const works = await worksfetch.json();

/* Dynamically creating all the works from the api  */
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