import cartoon from "../asserts/eating.png";
import courier from "../asserts/courier.png";
import donatello from "../asserts/donatello.png";
import set from "../asserts/set.png";
import spaceman from "../asserts/space-man.png";

function chooseLogo(onContinue,resetLocalStorage=false) {
  
  if (resetLocalStorage){
      localStorage.removeItem("selectedIcon")
      localStorage.removeItem("character")
  }  
  

  //parent container for choose logo


  const introMainContainer = document.createElement("div");


  const chooseLogoCont = document.createElement("div");
  const buttonCont = document.createElement("div");

  const headingEl = document.createElement("h2");

  headingEl.innerHTML = "Choose Your Character!!!";
  //headingEl.style.fontFamily='Caveat Brush'

  //icon container
  const iconCont = document.createElement("div");

  // continue button
  const continueBtn = document.createElement("button");

  // create a img list or icon list

  const iconList = [cartoon, courier, donatello, set, spaceman];

  const stringIconList = ['cartoon', 'courier', 'donatello', 'set', 'spaceman'];

  //temp
  let selectedIcon = null;
  let selectedChar = null;
  iconList.forEach((icon,index) => {
    const img = document.createElement("img"); 
    img.src = icon;
    iconCont.appendChild(img);
  
    img.addEventListener("click", () => {
      
      //check if any icon is selected already
      if (selectedIcon) {
        selectedIcon.classList.remove("active");
      }

      if (selectedIcon !== img) {
        img.classList.add("active");
        selectedIcon = img;
        //selectedChar = stringIconList[index]
  
      } else {
        selectedIcon = null;
      }

      selectedChar=stringIconList[index]

    });

    //add style class to each icon
    img.classList.add("icon_img");
  });

  continueBtn.innerHTML = "Continue";


  continueBtn.addEventListener('click',()=>{

    if (!selectedIcon){
      
      // if an icon is not selected and continue is clicked
      alert('Please select an icon to continue!!!')
      return;
    }

    localStorage.setItem("selectedIcon",selectedIcon.src)
    localStorage.setItem("character", selectedChar)

    console.log('from choose:',localStorage.getItem('selectedIcon'))

    introMainContainer.innerHTML="";
    // call the call back function
    onContinue();
    
  })

  // append child
  chooseLogoCont.appendChild(headingEl);
  chooseLogoCont.appendChild(iconCont);
  buttonCont.appendChild(continueBtn);

  //append to parent
  introMainContainer.appendChild(chooseLogoCont);
  introMainContainer.appendChild(buttonCont);

  // add class style
  chooseLogoCont.classList.add("choose_logo_main_container");
  headingEl.classList.add("logo_head");
  iconCont.classList.add("icon_container");
  buttonCont.classList.add("btn_container");
  continueBtn.classList.add("continue_btn");

  // return the main container
  return introMainContainer;
}

export default chooseLogo;
