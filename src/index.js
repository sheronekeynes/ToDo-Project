import "./style.css";
import homePage from "./modules/HomePage.js";
import chooseLogo from "./modules/chooseLogoPage.js";
import projectDetailsSection from "./modules/ProjectDetailsPage";

// get the html div container
const htmlCont = document.getElementById("app");

// create the main container
const mainContainer = document.createElement("div");

// create choose Logo container
const chooseLogoCont = chooseLogo(() => {
  // if continue button is clicked trigger render home page function
  renderHomePage();
}, true);

// append child
mainContainer.appendChild(chooseLogoCont);

// append to html container
htmlCont.appendChild(mainContainer);

function renderHomePage() {
  mainContainer.innerHTML = "";
  const updatedHomePageCont = homePage((projectName) => {
    renderProjectDetailsPage(projectName);
  });

  //append child main
  mainContainer.appendChild(updatedHomePageCont);
}

function renderProjectDetailsPage(projectName) {
  mainContainer.innerHTML = "";

  const updateProjectDetailCont = projectDetailsSection(() => {
    //if back button is clicked
    renderHomePage();
  }, projectName);

  //append child to main
  mainContainer.appendChild(updateProjectDetailCont);
}
