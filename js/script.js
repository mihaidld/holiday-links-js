"use strict";
const container = document.getElementById("container");
const form = document.getElementById("form");
//listLinks instance de liste filtrée et triée
const listLinks = new FilteredSortedLinks(
  container,
  defaultList,
  selectCategory.value,
  selectSort.value
);
listLinks.init();
console.dir(ListLinks);
console.dir(FilteredSortedLinks);
console.log("instance classe enfant :", listLinks);

// quand l'événement "submit" pour le formulaire est déclanché
form.addEventListener("submit", (event) => {
  /* le code dans la ligne ci-dessous prévient le formulaire d'envoyer des
  données, on remplace le comportement par défaut par notre js */
  event.preventDefault();
  // méthode pushEl en récupérant les valeurs des input depuis le formulaire
  listLinks.pushEl({
    title: form.elements.title.value.trim(),
    url: form.elements.url.value.trim(),
    description: form.elements.description.value.trim(),
    category: form.elements.category.value,
  });
  // la ligne ci-dessous fait un reset du formulaire (les champs redeviennent vides)
  form.reset();
});

//event listener sur element select tri
selectSort.addEventListener("change", () => {
  listLinks.sortOption = selectSort.value;
  listLinks.refresh();
});

/*fonction pour remplir les options catégories à filtrer, récupérées
dynamiquement à partir des options du select catégorie dans formulaire Ajouter
un lien et eventListener dessus*/
function activateFilterCategory() {
  const optionsCategory = document.querySelectorAll("#category option");
  const categories = [];
  for (let option of optionsCategory) {
    categories.push(option.value);
  }
  //categories.sort();
  console.log("liste catégories dans le filtre :", categories);
  for (let category of categories) {
    const option = document.createElement("option");
    option.value = category;
    option.classList.add("bg-secondary", "text-white");
    option.textContent = category;
    selectCategory.append(option);
  }
  selectCategory.addEventListener("change", () => {
    listLinks.categoryOption = selectCategory.value;
    listLinks.refresh();
  });
}
activateFilterCategory();
