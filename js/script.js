"use strict";
const container = document.getElementById("container");
const form = document.getElementById("form");
//listLinks instance de liste filtree et triee
const listLinks = new FilteredSortedLinks(
  container,
  defaultList,
  selectCategory.value,
  selectSort.value
);
listLinks.init();

console.log(listLinks);

// quand l'événement "submit" pour le formulaire est déclanché
form.addEventListener("submit", (event) => {
  /* le code dans la linge ci-dessous previent le formulaire d'envoyer des données, 
  on remplace le comportement par détaut par notre js */
  event.preventDefault();
  // méthode pushEl
  listLinks.pushEl({
    title: form.elements.title.value.trim(),
    url: form.elements.url.value.trim(), // @todo : de la même façon on peut récupérer la valeur d'url depuis le formulaire
    description: form.elements.description.value.trim(), // @todo : et la valeur de description depuis le formulaire,
    category: form.elements.category.value, // @todo : et la valeur de category depuis le formulaire,
  });
  // la ligne ci-dessous fait un reset du formulaire (les champs redeviennent vides)
  form.reset();
});

//event listener sur element select tri
selectSort.addEventListener("change", () => {
  listLinks.sortOption = selectSort.value;
  listLinks.refresh();
});

//function pour remplir les options categories a filtrer et eventListener
function activateFilterCategory() {
  const optionsCategory = document.querySelectorAll("#category option");
  const categories = [];
  for (let option of optionsCategory) {
    categories.push(option.value);
  }
  //categories.sort();
  console.log(categories);
  for (let category of categories) {
    const option = document.createElement("option");
    option.value = category;
    option.classList.add("bg-secondary", "text-white");
    option.textContent = category;
    selectCategory.append(option);
  }
  selectCategory.addEventListener("change", () => {
    //filterCategory = selectCategory.value;
    listLinks.categoryOption = selectCategory.value;
    listLinks.refresh();
  });
}
activateFilterCategory();
