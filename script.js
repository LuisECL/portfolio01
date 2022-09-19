// Show Navigation ---------------------|
const hambBtn = document.querySelector("nav > a");
const mobileNavBar = document.querySelector(".nav-modal-container");
console.log(hambBtn.firstElementChild);

function showNavModal () {
  console.log(mobileNavBar);
  if (mobileNavBar.classList.contains("show")){
    mobileNavBar.classList.remove("show");
    mobileNavBar.classList.add("hide");
    setTimeout(()=> {
      mobileNavBar.classList.remove("hide");
    }, 1000)
  } else {
    mobileNavBar.classList.add("show")
  }
};

hambBtn.addEventListener("click", (e)=> {
  e.preventDefault();
  showNavModal();
});