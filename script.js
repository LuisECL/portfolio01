// Show/Hide Mobile NavBar ---------------------|
const hambBtn = document.querySelector("nav > a");
const mobileNavBar = document.querySelector(".nav-modal-container");

function hideNavModal() {
  mobileNavBar.classList.remove("show");
  mobileNavBar.classList.add("hide");
  setTimeout(()=> {
    mobileNavBar.classList.remove("hide");
  }, 1000);
}

function showNavModal () {
  if (mobileNavBar.classList.contains("show")){
    hideNavModal();
  } else {
    mobileNavBar.classList.add("show")
  }
};

hambBtn.addEventListener("click", (e)=> {
  e.preventDefault();
  showNavModal();
});

// Scroll with Mobile NavBar buttons -------|
const logoBtn = document.querySelector("nav img")
const navBarBtns = document.querySelectorAll(".nav-modal-container button");
const navBarIcons = document.querySelectorAll(".nav-modal-container ul i");
const pageSections = document.querySelectorAll("section");

function scrollToSection(sectionId) {
  let section = pageSections[sectionId];
  let headerOffset = 60;
  let sectionPosition = section.getBoundingClientRect().top;
  let offsetPosition = sectionPosition + window.pageYOffset - headerOffset;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth"
  })
};

function styleMobileNavBtns(index){
  navBarBtns[index].classList.add("active");
  navBarIcons[index].classList.add("active");

  setTimeout(()=> {
    for (let btn of navBarBtns){
      btn.classList.remove("active")
    }
    for (icon of navBarIcons){
      icon.classList.remove("active")
    }
  }, 1000)
}

navBarBtns.forEach((btn, index) => {
  btn.addEventListener("click", ()=> {
    scrollToSection(index + 1);
    hideNavModal();
    styleMobileNavBtns(index);
  })
});

logoBtn.addEventListener("click", ()=> {
  scrollToSection(0)
  if (mobileNavBar.classList.contains("show")){
    hideNavModal();
  }
});

// Show/hide language options -------|
const activeLng = document.getElementById("lang-active");
const languageList = document.querySelector(".languages ul");

activeLng.addEventListener("click", ()=> {
  if (languageList.classList.contains("active")){
    languageList.style.animation = "hide-languages 0.5s ease 1"
    setTimeout(()=> {
      languageList.classList.remove("active")
    }, 450)
  } else {
    languageList.classList.add("active")
    languageList.style.animation = "show-languages 0.5s ease 1"
  }
});

// Focus "About me" grid images ---------|
const aboutAnchors = Array.from(document.querySelectorAll(".about-text a"));
const aboutImgs = Array.from(document.querySelectorAll(".about-grid img"));

function focusOnImg(focusedAnchor, focusedImg){
  for (const img of aboutImgs){
    img.classList.remove("about-img-active")
  }
  focusedImg.classList.add("about-img-active");

  for (const anchor of aboutAnchors){
    anchor.classList.remove("active");
  }
  focusedAnchor.classList.add("active")
};

for (const anchor of aboutAnchors){
  anchor.addEventListener("click", (e)=> {
    e.preventDefault();
    const imgID = `img-${anchor.id}`
    const focusedImg = aboutImgs.find(img => img.id == imgID)

    focusOnImg(anchor, focusedImg);
  })
};

for (const img of aboutImgs){
  img.addEventListener("click", ()=> {
    const anchorID = img.id.split("-")[1]
    const focusedAnchor = aboutAnchors.find(anchor => anchor.id == anchorID)

    focusOnImg(focusedAnchor, img)
  })
};

// Toggle Skills cards and icon ---------- |
const skillsHeader = document.querySelector(".skills-header");
const skillsCards = Array.from(document.querySelectorAll(".card"));
const frontEndIcon = `fa-brands fa-react`
const backEndIcon = `fa-brands fa-node-js`
const languagesIcon = `fa-regular fa-earth-americas`
const softSkillsIcon = `fa-regular fa-handshake-angle`
const skillsIcons = {frontEndIcon, backEndIcon, languagesIcon, softSkillsIcon}

function flipCard(focusedCard){
  const focusedCardIcon = focusedCard.id + "Icon"
  for (const card of skillsCards){
    card.classList.remove("card-active");
  }
  focusedCard.classList.add("card-active");
  skillsHeader.innerHTML =
  `<h2>Skills</h2>
  <i class="${skillsIcons[focusedCardIcon]}"></i>`
};

function resetCards(){
  for (const card of skillsCards){
    card.classList.remove("card-active");
  }
  skillsHeader.innerHTML =
  `<h2>Skills</h2>
  <i class="fa-solid fa-pen-to-square"></i>`
};

for (const card of skillsCards) {
  card.addEventListener("click", ()=> {
    if(card.classList.contains("card-active")){
      resetCards();
    } else {
      flipCard(card);
    }
  })
};