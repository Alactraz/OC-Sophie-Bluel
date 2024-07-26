const baseApiUrl = "http://localhost:5678/api/";
let worksData;
let categories;

// Elements \\
let filter;
let gallery;

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
      adminUserMode(filter);
    });
};


// Gallerie \\

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
}

// Filtre \\

function listOfUniqueCategories() {
  let listOfCategories = new Set();
  worksData.forEach((work) => {
    listOfCategories.add(JSON.stringify(work.category));
  });

  const arrayOfStrings = [...listOfCategories];
  categories = arrayOfStrings.map((s) => JSON.parse(s));
}
function categoryFilter(categories, filter) {
  const button = document.createElement("button");
  button.innerText = "Tous";
  button.className = "filterButton";
  button.dataset.category = "Tous";
  filter.appendChild(button);
  filterButtons(categories, filter);
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
  filterButtons.forEach((i) => {
    i.addEventListener("click", function () {
      toggleProjects(i.dataset.category);
    });
  });
}

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
}

// Login \\
function displayLogin(login) {
  const content = document.getElementById("Content");
  const loginSection = document.getElementById("login1")
  content.style.display = "none"
  loginSection.style.display = "block"
}
function displayMainPage(mainPage) {
  const content = document.getElementById("Content");
  const loginSection = document.getElementById("login1")
  content.style.display = "block"
  loginSection.style.display = "none"
}

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
}


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
