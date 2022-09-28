// Show/Hide Mobile NavBar ---------------------|
const hambBtn = document.querySelector("nav > a");
const mobileNavBar = document.querySelector(".nav-modal-container");
const navName = document.querySelector(".nav-title h4");
const navWebDev = document.querySelector(".nav-title p");
const navLogo = document.querySelector("nav img");

function hideNavModal() {
  navName.style.transitionDelay = ".4s";
  navWebDev.style.transitionDelay = "0s";

  mobileNavBar.classList.remove("show");
  mobileNavBar.classList.add("hide");
  navWebDev.classList.remove("show");
  navName.classList.remove("show");
  navLogo.classList.remove("center");

  setTimeout(() => {
    mobileNavBar.classList.remove("hide");
    navName.style.transitionDelay = "0s";
    navWebDev.style.transitionDelay = ".6s";
  }, 800);
}

function showNavModal() {
  navName.style.transitionDelay = "0s";
  navWebDev.style.transitionDelay = ".6s";

  if (mobileNavBar.classList.contains("show")) {
    hideNavModal();
  } else {
    mobileNavBar.classList.add("show");
    navName.classList.add("show");
    navWebDev.classList.add("show");
    navLogo.classList.add("center");
  }
}

hambBtn.addEventListener("click", (e) => {
  e.preventDefault();
  showNavModal();
});

// Scroll with Mobile NavBar buttons -------|
const logoBtn = document.querySelector("nav img");
const navBarBtns = document.querySelectorAll(".nav-modal-container button");
const navBarIcons = document.querySelectorAll(".nav-modal-container ul i");
const pageSections = document.querySelectorAll("section");

function scrollToSection(sectionId) {
  let section = pageSections[sectionId];
  let headerOffset = 60;
  if(window.innerWidth >= 744){
    headerOffset = 100;
  }
  let sectionPosition = section.getBoundingClientRect().top;
  let offsetPosition = sectionPosition + window.pageYOffset - headerOffset;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });
}

function styleMobileNavBtns(index) {
  navBarBtns[index].classList.add("active");
  navBarIcons[index].classList.add("active");

  setTimeout(() => {
    for (let btn of navBarBtns) {
      btn.classList.remove("active");
    }
    for (icon of navBarIcons) {
      icon.classList.remove("active");
    }
  }, 1000);
}

navBarBtns.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    scrollToSection(index + 1);
    hideNavModal();
    styleMobileNavBtns(index);
  });
});

logoBtn.addEventListener("click", () => {
  scrollToSection(0);
  if (mobileNavBar.classList.contains("show")) {
    hideNavModal();
  }
});

// Scroll with fixed NavBar Btns ----|
const fixedNavBarBtns = document.querySelectorAll("nav ul button");
const fixedNavBarIcons = document.querySelectorAll("nav ul i")

fixedNavBarBtns.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    scrollToSection(index + 1);
  });
});

// Style fixed NavBar Btns on scroll |
const pageSectionsExcHome = Array.from(
  pageSections).filter((el, i) => i > 0);

window.addEventListener("scroll", styleNavOnScroll);

function styleOnlyOneBtn(i){
  fixedNavBarBtns.forEach((btn, j) => {
    if (i == j){
      btn.classList.add("active")
    } else {
      btn.classList.remove("active")
    }
  });
  fixedNavBarIcons.forEach((icon, j) => {
    if (i == j){
      icon.classList.add("active")
    } else {
      icon.classList.remove("active")
    }
  });
};

function styleNavOnScroll(){
  for (let i = 0; i < pageSectionsExcHome.length; i++){
    let windowHeight = window.innerHeight;
    let revealTop = pageSectionsExcHome[i].getBoundingClientRect().top
    let revealPoint = 150;

    if (revealTop < windowHeight - revealPoint){
      styleOnlyOneBtn(i)
    } else {
      fixedNavBarBtns[i].classList.remove("active");
      fixedNavBarIcons[i].classList.remove("active");
    }
  }
};

// Show/hide language options -------|
const activeLng = document.getElementById("lang-active");
const languageList = document.querySelector(".languages ul");

activeLng.addEventListener("click", () => {
  if (languageList.classList.contains("active")) {
    languageList.style.animation = "hide-languages 0.5s ease 1";
    setTimeout(() => {
      languageList.classList.remove("active");
    }, 450);
  } else {
    languageList.classList.add("active");
    languageList.style.animation = "show-languages 0.5s ease 1";
  }
});

// Focus "About me" grid images ---------|
const aboutAnchors = Array.from(document.querySelectorAll(".about-text a"));
const aboutImgs = Array.from(document.querySelectorAll(".about-grid img"));

function focusOnImg(focusedAnchor, focusedImg) {
  for (const img of aboutImgs) {
    img.classList.remove("about-img-active");
  }
  focusedImg.classList.add("about-img-active");

  for (const anchor of aboutAnchors) {
    anchor.classList.remove("active");
  }
  focusedAnchor.classList.add("active");
}

for (const anchor of aboutAnchors) {
  anchor.addEventListener("click", (e) => {
    e.preventDefault();
    const imgID = `img-${anchor.id}`;
    const focusedImg = aboutImgs.find((img) => img.id == imgID);

    focusOnImg(anchor, focusedImg);
  });
}

for (const img of aboutImgs) {
  img.addEventListener("click", () => {
    const anchorID = img.id.split("-")[1];
    const focusedAnchor = aboutAnchors.find((anchor) => anchor.id == anchorID);

    focusOnImg(focusedAnchor, img);
  });
}

// Toggle Skills cards and icon ---------- |
const skillsHeader = document.querySelector(".skills-header");
const skillsCards = document.querySelectorAll(".card");
const frontEndIcon = `fa-brands fa-react`;
const backEndIcon = `fa-brands fa-node-js`;
const languagesIcon = `fa-regular fa-earth-americas`;
const softSkillsIcon = `fa-regular fa-handshake-angle`;
const skillsIcons = {
  frontEndIcon,
  backEndIcon,
  languagesIcon,
  softSkillsIcon,
};

function flipCard(focusedCard) {
  const focusedCardIcon = focusedCard.id + "Icon";
  for (const card of skillsCards) {
    card.classList.remove("card-active");
  }
  focusedCard.classList.add("card-active");
  skillsHeader.innerHTML = `<h2>Skills</h2>
  <i class="${skillsIcons[focusedCardIcon]}"></i>`;
}

function resetCards() {
  for (const card of skillsCards) {
    card.classList.remove("card-active");
  }
  skillsHeader.innerHTML = `<h2>Skills</h2>
  <i class="fa-solid fa-pen-to-square"></i>`;
}

for (const card of skillsCards) {
  card.addEventListener("click", () => {
    if (card.classList.contains("card-active")) {
      resetCards();
    } else {
      flipCard(card);
    }
  });
}

// Dynamic Portfolio rendering ---------------|
const portfolioProjectsContainer = document.querySelector(
  ".portfolio-projects-container"
);
let projectContainers
const projectsInfo = {
  cl73: {
    name: "Café Lima 73",
    description: `CL73 is a static website developed in the style of a "brochure web page" for the fictional Coffe place Café Lima 73. Its design is fully responsive and allows for visualization in large monitors, tablets and mobile devices.`,
    image: "img/portfolio/cl73.jpg",
    video: `img/portfolio/cl73.mp4`,
    website: `https://luisecl.github.io/CL73/`,
    repository: `https://github.com/LuisECL/CL73`
  },
  tvPlus: {
    name: "TV Plus",
    description:
      "TV+ is a SPA developed to search for information about movies, tv shows, videogames or music videos. It's responsive design allows you to use it on large screens, tablets and mobile devices.",
    image: "img/portfolio/tv-plus.jpg",
    video: `img/portfolio/tv-plus.mp4`,
    website: `https://tv-plus.herokuapp.com/`,
    repository: `https://github.com/LuisECL/tv_plus`
  },
  kingsLockdown: {
    name: "King's Lockdown",
    description:
      "SPA developed to showcase drummer Oscar Barcelli's album King's Lockdown (2021) for Best Latin Jazz Album consideration for the Latin Grammy Awards.",
    image: "img/portfolio/kings-lockdown.jpg",
    video: `img/portfolio/kings-lockdown.mp4`,
    website: `https://powerful-beyond-84068.herokuapp.com/`,
    repository: `https://github.com/LuisECL/kings_lockdown`
  },
  todoList: {
    name: "Todo list",
    description:
      "Todo list built with React. This project was made following Dev Ed's video Build a Todo App with REACT available on YouTube",
    image: "img/portfolio/todo-list.jpg",
    video: `img/portfolio/todo-list.mp4`,
    website: `https://luisecl.github.io/todo_list_react/`,
    repository: `https://github.com/LuisECL/todo_list_react`
  },
  calculator: {
    name: "Simple Calculator",
    description:
      "This app works as a simple calculator, allowing the user to perform any of the main 4 calculations (add, subtract, multiply, divide), using both whole and decimal numbers.",
    image: "img/portfolio/simple-calculator.jpg",
    video: `img/portfolio/simple-calculator.mp4`,
    website: `https://luisecl.github.io/simple-calculator/`,
    repository: `https://github.com/LuisECL/simple-calculator`
  }
};
const projectsInfoKeys = Object.keys(projectsInfo);
let projectIndex = 0;
projectsInfoKeys.forEach((key) => {
  projectsInfo[key].index = projectIndex;
  projectIndex++;
});

function renderProjects() {
  projectsInfoKeys.forEach((project) => {
    const li = document.createElement("li");
    const img = document.createElement("img");
    const h3 = document.createElement("h3");

    li.classList.add("project-container");
    li.id = project;
    img.src = projectsInfo[project].image;
    img.alt = `${projectsInfo[project].name} image`;
    h3.innerText = projectsInfo[project].name;
    li.appendChild(img);
    li.appendChild(h3);

    portfolioProjectsContainer.appendChild(li);
  });

  projectContainers = document.querySelectorAll(".project-container");
}

renderProjects();

// Show Portfolio modal and navigate ---------|
const portfolioModal = document.querySelector(".portfolio-modal-container");

function findNextProject(index) {
  let nextIndex = index + 1;
  let nextProject = "";
  for (project in projectsInfo) {
    if (projectsInfo[project].index == nextIndex) {
      nextProject = project;
    }
  }
  return nextProject;
}

function findPreviousProject(index) {
  let prevIndex = index - 1;
  let prevProject = "";
  for (project in projectsInfo) {
    if (projectsInfo[project].index == prevIndex) {
      prevProject = project;
    }
  }
  return prevProject;
}

function showProjectInfo(project) {
  portfolioModal.style.display = "block";
  portfolioModal.innerHTML = `
  <div class="portfolio-modal-bg">
      <h3>${projectsInfo[project].name}</h3>
      <i class="fa-solid fa-circle-xmark"></i>
      <div class="project-text">
        <p>${projectsInfo[project].description}</p>
      </div>
      <video src="${projectsInfo[project].video}" autoplay loop>
        Your browser does not support the video tag
      </video>
      <div class="portfolio-nav">
        <div class="prev-project">
          <i class="fa-solid fa-circle-chevron-left"></i>
          <p>Prev</p>
        </div>
        <div class="next-project">
          <i class="fa-solid fa-circle-chevron-right"></i>
          <p>Next</p>
        </div>
      </div>
      <div class="project-links">
        <a href="${projectsInfo[project].website}" target="blank">Website</a>
        <a href="${projectsInfo[project].repository}" target="blank">Repository</a>
      </div>
    </div>`;

  let closePortfolioBtn = document.querySelector(".portfolio-modal-bg i");
  closePortfolioBtn.addEventListener("click", () => {
    portfolioModal.style.display = "none";
  });

  let prevBtn = document.querySelector(".prev-project");
  let nextBtn = document.querySelector(".next-project");
  let projectIndex = projectsInfo[project].index;
  let nextProject = findNextProject(projectIndex);
  let prevProject = findPreviousProject(projectIndex);

  if (projectIndex == 0) {
    prevBtn.style.opacity = "0";
    nextBtn.addEventListener("click", () => {
      showProjectInfo(nextProject);
    });
  } else if (projectIndex == projectsInfoKeys.length - 1) {
    nextBtn.style.opacity = "0";
    prevBtn.addEventListener("click", () => {
      showProjectInfo(prevProject);
    });
  } else {
    prevBtn.addEventListener("click", () => {
      showProjectInfo(prevProject);
    });
    nextBtn.addEventListener("click", () => {
      showProjectInfo(nextProject);
    });
  }
}

projectContainers.forEach((project, index) => {
  project.addEventListener("click", () => {
    showProjectInfo(project.id);
  });
});

// Validate Contact form...
const contactForm = document.querySelector(".contact-container form");
const emailInput = document.getElementById("email");
// const subjectInput = document.getElementById("subject");
const emailMessage = document.getElementById("email-message");

// ...email input
emailInput.addEventListener("focus", () => {
  emailInput.classList.remove("invalid");
  emailInput.classList.remove("valid");
  emailInput.classList.add("focus");
});
emailInput.addEventListener("blur", () => {
  if (emailInput.value.includes("@") && emailInput.value.includes(".com")) {
    emailInput.classList.remove("invalid");
    emailInput.classList.add("valid");
  } else {
    emailInput.classList.remove("valid");
    emailInput.classList.add("invalid");
    alert("Please inform a valid email");
  }
});

// ...subject input
// subjectInput.addEventListener("focus", ()=> {
//   subjectInput.classList.remove("valid");
//   subjectInput.classList.add("focus");
// });
// subjectInput.addEventListener("focusout", ()=> {
//   subjectInput.classList.remove("focus");
// });
// subjectInput.addEventListener("blur", ()=> {
//   if (subjectInput.value != ""){
//     subjectInput.classList.add("valid");
//   } else {
//     subjectInput.classList.remove("valid");
//   }
// });

// ...email message
emailMessage.addEventListener("focus", () => {
  emailMessage.classList.remove("valid");
  emailMessage.classList.add("focus");
});
emailMessage.addEventListener("focusout", () => {
  emailMessage.classList.remove("focus");
});
emailMessage.addEventListener("blur", () => {
  if (emailMessage.value != "") {
    emailMessage.classList.add("valid");
  } else {
    emailMessage.classList.remove("valid");
  }
});

contactForm.addEventListener("submit", (e) => {
  if (emailInput.value == "" && emailMessage.value == "") {
    e.preventDefault();
    alert("Don't forget to fill up the form");
    return;
  } else if (emailInput.value == "") {
    e.preventDefault();
    alert("Don't forget to write your email address");
  } else if (emailMessage.value == "") {
    e.preventDefault();
    alert("Don't forget to write your message");
  } else {
    return;
  }
});
