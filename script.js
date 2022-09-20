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