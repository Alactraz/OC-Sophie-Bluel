const baseApiUrl = "http://localhost:5678/api/";
// Elements
let worksData;
let categories;

// Fetch \\
window.onload = () => {
  fetch(`${baseApiUrl}works`)
    .then((response) => response.json())
    .then((data) => {
      worksData = data;
      listOfUniqueCategories();
      displayGallery(worksData);
      filter = document.querySelector(".filter");
      categoryFilter(categories, filter);
      adminMode(filter);
    });
};


// Gallerie 1.1 \\

// Elements
let gallery;

function displayGallery(data) {
  gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";
  data.forEach((i) => {
    const workCard = document.createElement("figure");
    const workImage = document.createElement("img");
    const workTitle = document.createElement("figcaption");
    workImage.src = i.imageUrl;
    workImage.alt = i.title;
    workTitle.innerText = i.title;
    workCard.dataset.category = i.category.name;
    workCard.className = "workCard";
    workCard.append(workImage, workTitle);
    gallery.appendChild(workCard);
  });
};

// Filtre 1.2 \\

// Elements
let filter;

function listOfUniqueCategories() {
  let listOfCategories = new Set();
  worksData.forEach((work) => {
    listOfCategories.add(JSON.stringify(work.category));
  });

  const arrayOfStrings = [...listOfCategories];
  categories = arrayOfStrings.map((s) => JSON.parse(s));
};
function categoryFilter(categories, filter) {
  const button = document.createElement("button");
  button.innerText = "Tous";
  button.className = "filterButton";
  button.dataset.category = "Tous";
  filter.appendChild(button);
  filterButtons(categories, filter);
  functionFilter();
};

function filterButtons(categories, filter) {
  categories.forEach((categorie) => {
    createButtonFilter(categorie, filter);
  });
};

function createButtonFilter(categorie, filter) {
  const button = document.createElement("button");
  button.innerText = categorie.name;
  button.className = "filterButton";
  button.dataset.category = categorie.name;
  filter.appendChild(button);
};

function functionFilter() {
  const filterButtons = document.querySelectorAll(".filterButton");
  filterButtons.forEach((i) => {
    i.addEventListener("click", function () {
      toggleProjects(i.dataset.category);
    });
  });
};

function toggleProjects(datasetCategory) {
  const figures = document.querySelectorAll(".workCard");
  if ("Tous" === datasetCategory) {
    figures.forEach((figure) => {
      figure.style.display = "block";
    });
  } else {
    figures.forEach((figure) => {
      figure.dataset.category === datasetCategory
        ? (figure.style.display = "block")
        : (figure.style.display = "none");
    });
  }
};

// Login 2.1 \\
function displayLogin(login) {
  const content = document.getElementById("Content");
  const loginSection = document.getElementById("login1")
  content.style.display = "none"
  loginSection.style.display = "block"
};
function displayMainPage(mainPage) {
  const content = document.getElementById("Content");
  const loginSection = document.getElementById("login1")
  content.style.display = "block"
  loginSection.style.display = "none"
};

document.addEventListener("DOMContentLoaded", () => {
  const loginSection = document.getElementById("login1");
  const loginHeader = document.createElement("h2");
  loginHeader.textContent = "Log In";
  const loginForm = document.createElement("form");
  const emailLabel = document.createElement("label");
  emailLabel.htmlFor = "email";
  emailLabel.textContent = "Email";
  const emailInput = document.createElement("input");
  emailInput.type = "email";
  emailInput.name = "email";
  emailInput.id = "email";
  const passwordLabel = document.createElement("label");
  passwordLabel.htmlFor = "password";
  passwordLabel.textContent = "Mot de passe";
  const passwordInput = document.createElement("input");
  passwordInput.type = "password";
  passwordInput.name = "password";
  passwordInput.id = "password";
  const loginButton = document.createElement("input");
  loginButton.type = "submit";
  loginButton.value = "Se connecter";
  loginButton.id = "loginBtn";
  const forgotPasswordLink = document.createElement("p");
  const forgotPasswordAnchor = document.createElement("a");
  forgotPasswordAnchor.href = "#";
  forgotPasswordAnchor.textContent = "Mot de passe oublié";
  forgotPasswordLink.appendChild(forgotPasswordAnchor);
  loginForm.appendChild(emailLabel);
  loginForm.appendChild(emailInput);
  loginForm.appendChild(passwordLabel);
  loginForm.appendChild(passwordInput);
  loginForm.appendChild(loginButton);
  loginSection.appendChild(loginHeader);
  loginSection.appendChild(loginForm);
  loginSection.appendChild(forgotPasswordLink);
});

// 2.2 
document.addEventListener("submit", (e) => {
  e.preventDefault();
  let form = {
    email: document.getElementById("email"),
    password: document.getElementById("password"),
  };

  fetch(`${baseApiUrl}users/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: form.email.value,
      password: form.password.value,
    }),
  }).then((response) => {
    if (response.status !== 200) {
      alert("Email ou mot de passe erronés");
    } else {
      response.json().then((data) => {
        sessionStorage.setItem("token", data.token);
        window.location.replace("index.html");
      });
    }
  });
});

// Mode administrateur \\

//```
//email: sophie.bluel@test.tld
//
//password: S0phie 
//```
//Lien pour voir la
//[documentation Swagger](http://localhost:5678/api-docs/)

function adminMode() {
  if (sessionStorage.getItem("token")?.length == 143) {
    document.querySelector(".filter").style.display = "none";
    document.getElementById("logBtn").innerText = "logout";
    const body = document.querySelector("body");
    const topMenu = document.createElement("div");
    const publishBtn = document.createElement("button");
    const edMode = document.createElement("p");

    topMenu.className = "topMenu";
    edMode.innerHTML = `<i class="fa-regular fa-pen-to-square"></i>Mode édition`;
    publishBtn.innerText = "Publier les changements";
    body.insertAdjacentElement("afterbegin", topMenu);
    topMenu.append(edMode, publishBtn);
    const edBtn = `<p class="edBtn"><i class="fa-regular fa-pen-to-square"></i>Modifier</p>`;
    document.querySelector("#introduction img").insertAdjacentHTML("afterend", edBtn);
    document.querySelector("#introduction article").insertAdjacentHTML("afterbegin", edBtn);
    document.querySelector("#portfolio h2").insertAdjacentHTML("afterend", edBtn);
    document.querySelector("#portfolio p").addEventListener("click", ouvModal);
  }
};

// MODAL 3.1 \\

// Elements
let modal;
let etapeModal = null;

// Ouverture modal si token présent ET si longueur correct 
const ouvModal = function () {
  if (sessionStorage.getItem("token")?.length == 143) {
    modal = document.querySelector(".modal");
    modal.style.display = "flex"
    document.querySelector("#ajoutImg").style.display = "none";
    document.querryselector("#editionGal").style.display = "flex";
    gallerieModal(worksData)
    etapeModal = 0;
    //Fermeture modal addEventListener
    modal.addEventListener("click", fermModal)
    //
    //Bouton Supr 
    document.addEventListener("click", suprBtn)
    document.addEventListener("click", ouvFormNouvTrav)
    //
  }
};

// Fermer la modale 
const fermModal = function (e) {
  if (
    e.target == document.querryselector(".modal") || e.target == document.getElementsByClassName("fa-xmark")[etapeModal]
  ) {
    document.querySelector(".modal").style.display = "none";
    document.removeEventListener("click", fermModal);
    document.removeEventListener("click", suprBtn);
    etapeModal = null;
  }
};

// Supression des travaux 3.2 \\
function gallerieModal(data) {
  const contenuModal = document.querryselector(".Modalcontenu");
  contenuModal.innerhtml = "";
  data.forEach((i) => {
    const miniWork = document.createElement("figure");
    const workImage = document.createElement("img");
    const edit = document.createElement("figcaption");
    const poubelle = document.createElement("i");
    poubelle.id = i.id;
    poubelle.classList.add("fa-solid", "fa-trash-can");
    workImage.src = i.imageUrl;
    workImage.alt = i.title;
    edit.innertext = "editer";
    miniWork.classname = "miniwork";
    contenuModal.appendchild(miniWork);
    miniWork.append(workImage, edit, poubelle);
  })
};
const suprBtn = function (e) {
  e.preventDefault();
  if (e.target.matches(".fa-trash-can")) { suprTravaux(e.target.id); }
};
function suprTravaux(i) {
  let token = sessionStorage.getItem("token");
  fetch(baseApiUrl + "works/" + i, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.ok) {
        alert("projet supprimer avec succés")
        worksData = worksData.filter((work) => work.id != i);
        displayGallery(worksData);
        gallerieModal(worksData);
      } else {
        alert("erreur");
        fermModal;
      }
    });
}

// Ajout travaux \\

const ouvFormNouvTrav = function (e) {
  if (e.target == document.querySelector("btnAjoutImg")) {
    etapeModal = 1;
    document.querryselector("#ajoutImg").style.display = "flex";
    document.querryselector("#editionGal").style.display = "none";
    document.querryselector("#labelPhoto").style.display = "flex";
    document.querySelector("#imgPreview").style.display = "none";
    document.querySelector("#valider");
    document.getElementById("formAjoutImg").reset();
    formSelectCategorie();
    pictureInput = document.querySelector("#photo");
    pictureInput.onchange = imgPreview;
    document.querryselector("#formAjoutImg").onchange = changCoulBtn
    document.addEventListener("click", fermModal)
    document.querryselector(".modalheader .fa-arrow-left").addEventListener("click", ouvModal);
    document.removeEventListener("click", ouvFormNouvTrav);
    document.removeEventListener("click", suprBtn);
    document.addEventListener("click", ouvFormNouvTrav);
  };
};
const formSelectCategorie = function () {
  document.querryselector("selectCategorie").innerHTML = "";
  option = document.createElement("option");
  document.querySelector("#selectCategorie").appendChild(option);
  categories.forEach((categorie) => {
    option = document.createElement("option");
    option.value = categorie.name;
    option.innerText = categorie.name;
    option.id = categorie.id;
    document.querySelector("#selectCategorie").appendChild(option);
  });
};
const ajoutNouvTravData = function(data, categoryName) {
  newWork = {};
  newWork.title = data.title;
  newWork.id = data.id;
  newWork.category = {"id" : data.categoryId, "name" : categoryName};
  newWork.imageUrl = data.imageUrl;
  worksData.push(newWork);
}
function envNouvData(token, formData, title, categoryName) {
  fetch(`${baseApiUrl}works`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
    },
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        alert("Nouveau fichier envoyer avec succés : ");
        return response.json();
      } else {
        console.error("Erreur:");
      }
    })
    .then ((data) => {
      addToWorksData(data, categoryName);
      displayGallery(worksData);
      document.querySelector(".modal").style.display = "none";
      document.removeEventListener("click", fermModalModal);
      modalStep = null;
    })
    .catch((error) => console.error("Erreur:"));
};