const baseApiUrl = "http://localhost:5678/api/";
// Elements
let worksData;
let categories;

// Fetch \\ 
window.onload = () => {
  fetchWorks()
    .then(() => fetchCategories());
};

// Fetch works API
function fetchWorks() {
  return fetch(`${baseApiUrl}works`)
    .then((response) => response.json())
    .then((data) => {
      worksData = data;
      displayGallery(worksData);
    })
    .catch((error) => console.error('Error fetching works:', error));
}

// Fetch categories API
function fetchCategories() {
  return fetch(`${baseApiUrl}categories`)
    .then((response) => response.json())
    .then((data) => {
      categories = data;
      const filter = document.querySelector(".filter");
      if (filter) {
        categoryFilter(categories, filter);
        adminMode(filter);
      }
    })
    .catch((error) => console.error('Error fetching categories:', error));
}
// event listener boutons PRojet log et logout\\

document.addEventListener('DOMContentLoaded', function () {
  const proBtn = document.getElementById('proBtn');
  const logoutBtn = document.getElementById('logoutBtn');
  const logBtn = document.getElementById('logBtn');

  if (proBtn) {
      proBtn.addEventListener('click', function() {
          displayMainPage();
      });
  }

  if (logoutBtn) {
      logoutBtn.addEventListener('click', function() {
          logout();
      });
  }

  if (logBtn) {
      logBtn.addEventListener('click', function() {
          displayLogin();
      });
  }
});

// Gallerie 1.1 \\ 
function displayGallery(data) {
  const gallery = document.querySelector(".gallery");
  if (!gallery) return;
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
}

// Filtre 1.2 \\ 
function categoryFilter(categories, filter) {
  filter.innerHTML = ""; 

  // Créer le bouton "Tous" et le définir comme actif
  const allButton = document.createElement("button");
  allButton.innerText = "Tous";
  allButton.className = "filterButton active"; // Ajout de la classe active ici
  allButton.dataset.category = "Tous";
  filter.appendChild(allButton);

  // Créer les autres boutons de filtre
  filterButtons(categories, filter);

  // Initialiser les écouteurs d'événements pour les filtres
  functionFilter();
}

function filterButtons(categories, filter) {
  categories.forEach((categorie) => {
    createButtonFilter(categorie, filter);
  });
}

function createButtonFilter(categorie, filter) {
  const button = document.createElement("button");
  button.innerText = categorie.name;
  button.className = "filterButton";
  button.dataset.category = categorie.name;
  filter.appendChild(button);
}

function functionFilter() {
  const filterButtons = document.querySelectorAll(".filterButton");
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Retirer la classe active de tous les boutons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Ajouter la classe active au bouton cliqué
      button.classList.add('active');
      
      // Appliquer le filtre sur les projets
      toggleProjects(button.dataset.category);
    });
  });
}

function toggleProjects(datasetCategory) {
  const figures = document.querySelectorAll(".workCard");
  if (datasetCategory === "Tous") {
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
}

// ajout du CSS active et stockage de l'info \\
document.addEventListener('DOMContentLoaded', function () {
  const filterButtons = document.querySelectorAll(".filterButton");
  const allButton = document.querySelector('.filterButtonAll');
  
  // Définir la catégorie active par défaut sur "Tous" si rien n'est stocké dans localStorage
  const activeCategory = localStorage.getItem('activeCategory') || "Tous";
  
  // Appliquer l'état actif uniquement au bouton correspondant
  filterButtons.forEach(button => {
      if (button.dataset.category === activeCategory) {
          button.classList.add('active');
      } else {
          button.classList.remove('active');
      }
  });

  // Assurez-vous que le bouton "Tous" est toujours actif au chargement
  if (activeCategory === "Tous") {
      allButton.classList.add('active');
  }

  toggleProjects(activeCategory); // Appliquer le filtre dès le chargement de la page
  functionFilter();
});

function functionFilter() {
  const filterButtons = document.querySelectorAll(".filterButton");
  filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
          // Retirer l'état actif de tous les boutons
          filterButtons.forEach(btn => btn.classList.remove('active'));
          // Ajouter l'état actif au bouton cliqué
          button.classList.add('active');

          // Sauvegarder l'état actif dans localStorage
          localStorage.setItem('activeCategory', button.dataset.category);

          toggleProjects(button.dataset.category);
      });
  });
}

function toggleProjects(datasetCategory) {
  const figures = document.querySelectorAll(".workCard");
  if (datasetCategory === "Tous") {
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
}

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
    
    const logBtn = document.getElementById("logBtn");
    const logoutBtn = document.getElementById("logoutBtn");
    const token = sessionStorage.getItem("token");
    if (token) {
      logBtn.style.display = "none";
      logoutBtn.style.display = "block";
    } else {
      logBtn.style.display = "block";
      logoutBtn.style.display = "none";
    }

    const body = document.querySelector("body");
    const topMenu = document.createElement("div");
    const editMode = document.createElement("p");
    topMenu.className = "topMenu";
    editMode.innerHTML = `<i class="fa-regular fa-pen-to-square"></i>Mode édition`;
    body.insertAdjacentElement("afterbegin", topMenu);
    topMenu.append(editMode); 
    const editBtn = `<p class="editBtn"><i class="fa-regular fa-pen-to-square"></i>Modifier</p>`;
    document.querySelector("#portfolio h2").insertAdjacentHTML("afterend", editBtn);
    document.querySelector("#portfolio p").addEventListener("click", openModal);
  };
};

// Logout
function logout() {
  sessionStorage.removeItem("token");
  adminMode();
  displayMainPage(); 
  window.parent.location.reload();
}
// Modale \\

const openModal = function () {
  if (sessionStorage.getItem("token")?.length == 143) {
    modal = document.querySelector(".modal");
    modal.style.display = "flex";
    document.querySelector("#addPicture").style.display = "none";
    document.querySelector("#editGallery").style.display = "flex";
    modalGallery(worksData);
    modalStep = 0;

    modal.addEventListener("click", closeModal);
 
    document.addEventListener("click", deleteBtn);
    document.addEventListener("click", openNewWorkForm);
  }
};

const closeModal = function (e) {
  if (
    e.target === document.querySelector(".modal") ||
    e.target === document.getElementsByClassName("fa-xmark")[modalStep]
  ) {
    document.querySelector(".modal").style.display = "none";
    document.removeEventListener("click", closeModal);
    document.removeEventListener("click", deleteBtn);
    modalStep = null;
  }
}

// Supr \\

function modalGallery(data) {
  const modalContent = document.querySelector(".modalContent");
  modalContent.innerHTML = "";
  data.forEach((i) => {
    const miniWork = document.createElement("figure");
    const workImage = document.createElement("img");
    const edit = document.createElement("figcaption");
    const trashCan = document.createElement("i");
    trashCan.id = i.id;
    trashCan.classList.add("fa-solid", "fa-trash-can");
    workImage.src = i.imageUrl;
    workImage.alt = i.title;
    edit.innerText = "éditer";
    miniWork.className = "miniWork";
    modalContent.appendChild(miniWork);
    miniWork.append(workImage, edit, trashCan);
  });
}

const deleteBtn = function (e) {
  e.preventDefault();
  if (e.target.matches(".fa-trash-can")) {
    deleteWork(e.target.id);
  }
};

function deleteWork(i) {
  let token = sessionStorage.getItem("token");
  fetch(baseApiUrl + "works/" + i, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    if (response.ok) {
      alert("Projet supprimer avec succés")
      worksData = worksData.filter((work) => work.id != i);
      displayGallery(worksData);
      modalGallery(worksData);
    } else {
      alert("Erreur");
      closeModal;
    }
  });
}

// Ajout Travaux \\
// Fonction pour ouvrir le formulaire d'ajout de travail
const openNewWorkForm = function (e) {
  if (e.target === document.querySelector("#addPictureBtn")) {
    modalStep = 1;
    document.querySelector("#addPicture").style.display = "flex";
    document.querySelector("#editGallery").style.display = "none";
    document.querySelector("#labelPhoto").style.display = "flex";
    document.querySelector("#picturePreview").style.display = "none";
    document.querySelector("#valider").style.backgroundColor = "#A7A7A7";
    document.getElementById("addPictureForm").reset();
    selectCategoryForm();
    pictureInput = document.querySelector("#photo");
    pictureInput.onchange = picturePreview;
    document.querySelector("#addPictureForm").onchange = changeSubmitBtnColor;
    document.addEventListener("click", closeModal);
    document.querySelector(".modalHeader .fa-arrow-left").addEventListener("click", openModal);
    document.removeEventListener("click", openNewWorkForm);
    document.removeEventListener("click", deleteBtn);
    document.addEventListener("click", newWorkFormSubmit);
  }
}

// Fonction pour afficher l'aperçu de l'image
const picturePreview = function() {
  const [file] = pictureInput.files;
  if (file) {
    document.querySelector("#picturePreviewImg").src = URL.createObjectURL(file);
    document.querySelector("#picturePreview").style.display = "flex";
    document.querySelector("#labelPhoto").style.display = "none";
  }
}

// Fonction pour remplir le sélecteur de catégories
const selectCategoryForm = function () {
  document.querySelector("#selectCategory").innerHTML = "";
  let option = document.createElement("option");
  document.querySelector("#selectCategory").appendChild(option);
  categories.forEach((categorie) => {
    option = document.createElement("option");
    option.value = categorie.name;
    option.innerText = categorie.name;
    option.id = categorie.id;
    document.querySelector("#selectCategory").appendChild(option);
  });
};

// Fonction pour envoyer le nouveau travail
const newWorkFormSubmit = function (e) {
  if (e.target === document.querySelector("#valider")) {
    e.preventDefault();
    postNewWork();
  }
};

// Fonction pour valider et poster un nouveau travail
function postNewWork() {
  let token = sessionStorage.getItem("token");
  const select = document.getElementById("selectCategory");
  const title = document.getElementById("title").value;
  const categoryName = select.options[select.selectedIndex].innerText;
  const categoryId = select.options[select.selectedIndex].id;
  const image = document.getElementById("photo").files[0];
  let validity = formValidation(image, title, categoryId);
  if (validity === true) {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("category", categoryId);
    sendNewData(token, formData, title, categoryName);
  }
};

// Fonction pour changer la couleur du bouton de validation
const changeSubmitBtnColor = function() {
  const title = document.getElementById("title").value;
  const photo = document.getElementById("photo").files[0];
  const select = document.getElementById("selectCategory");
  const isValid = title !== "" && photo !== undefined && select.options[select.selectedIndex].id !== "";

  if (isValid) {
    document.querySelector("#valider").style.backgroundColor = "#1D6154";
  } else {
    document.querySelector("#valider").style.backgroundColor = "#A7A7A7";
  }
};

// Ajouter les gestionnaires d'événements lorsque le DOM est prêt
document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("title").addEventListener("input", changeSubmitBtnColor);
  document.getElementById("photo").addEventListener("change", changeSubmitBtnColor);
  document.getElementById("selectCategory").addEventListener("change", changeSubmitBtnColor);
});

const formValidation = function(image, title, categoryId) {
  if (image == undefined){
    alert("Veuillez ajouter une image");
    return false;
  }
  if (title.trim().length == 0){    
    alert("Veuillez ajouter un titre");
    return false;
  }
  if (categoryId == ""){
    alert("Veuillez choisir une catégorie");
    return false;
  }else{
  return true;
  }
}

const addToWorksData = function(data, categoryName) {
  newWork = {};
  newWork.title = data.title;
  newWork.id = data.id;
  newWork.category = {"id" : data.categoryId, "name" : categoryName};
  newWork.imageUrl = data.imageUrl;
  worksData.push(newWork);
}
function sendNewData(token, formData, title, categoryName) {
  fetch(`${baseApiUrl}works`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
    },
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        alert("Nouveau fichier envoyé avec succés : " + title);
        return response.json();
      } else {
        console.error("Erreur:", response.status);
      }
    })
    .then ((data) => {
      addToWorksData(data, categoryName);
      displayGallery(worksData);
      document.querySelector(".modal").style.display = "none";
      document.removeEventListener("click", closeModal);
      modalStep = null;
    })
    .catch((error) => console.error("Erreur:", error));
}
