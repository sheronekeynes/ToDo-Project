import cartoon from "../asserts/cartoon.png";

function SearchBar(onSearch) {
  const mainSearchContainer = document.createElement("div");
  const searchContainer = document.createElement("div");

  const searchBarText = document.createElement("input");
  const searchIcon = document.createElement("i");

  const projectList = JSON.parse(localStorage.getItem("projectList")) || {};

  searchIcon.classList.add("fa-solid", "fa-magnifying-glass", "search_icon");

  searchBarText.placeholder = "Search project";

  searchIcon.addEventListener("click", () => {
    const itemSearchedValue = searchBarText.value.trim().toLowerCase();

    // Check if projectList is null or undefined
    if (!projectList || typeof projectList !== "object") {
      console.error("projectList is null, undefined, or not an object");
      return mainSearchContainer; // Return an empty container
    }

    if (itemSearchedValue === "") {
      alert("Please enter a project name to search");
      return;
    } else {
      //temp

      const matchingProject = Object.keys(projectList).find((projectName) =>
        projectName.toLowerCase().includes(itemSearchedValue)
      );

      if (Object.keys(projectList).length === 0) {
        alert("No projects found.");
        return;
      }

      if (matchingProject) {
        onSearch(matchingProject);
      } else {
        alert("no match found");
      }
    }
  });

  //append child to search contianer
  searchContainer.appendChild(searchIcon);
  searchContainer.appendChild(searchBarText);
  //append the searchcontainer to main
  mainSearchContainer.appendChild(searchContainer);
  //add styles
  mainSearchContainer.classList.add("main_search_container");
  searchContainer.classList.add("search_container");

  //for search style inside
  searchBarText.classList.add("search_input_text");

  return mainSearchContainer;
}

function ProgressBar() {
  // main container
  const progressBarMainContainer = document.createElement("div");
  const barCont = document.createElement("div");

  const projectList = JSON.parse(localStorage.getItem("projectList")) || {};

  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay() + 1);
  const endOfWeek = new Date(now);
  endOfWeek.setDate(startOfWeek.getDate() + 6); // End on Sunday

  // console.log(startOfWeek)
  // console.log(endOfWeek)

  // Check if projectList is null or undefined
  if (!projectList || typeof projectList !== "object") {
    console.error("projectList is null, undefined, or not an object");
    return progressBarMainContainer; // Return an empty container
  }

  const tasksByDay = {
    Mo: { total: 0, completed: 0 },
    Tu: { total: 0, completed: 0 },
    We: { total: 0, completed: 0 },
    Th: { total: 0, completed: 0 },
    Fr: { total: 0, completed: 0 },
    Sa: { total: 0, completed: 0 },
    Su: { total: 0, completed: 0 },
  };

  Object.keys(projectList).forEach((projectName) => {
    projectList[projectName].forEach((task) => {
      const taskDate = new Date(task.date);

      if (taskDate >= startOfWeek && taskDate <= endOfWeek) {
        const day = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"][
          taskDate.getDay()
        ];

        if (day) {
          tasksByDay[day].total++;

          if (task.complete) {
            tasksByDay[day].completed++;
          }
        }
      }
    });
  });

  const headEl = document.createElement("h2");

  headEl.innerHTML = "Your Progress";

  const daysList = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  //temp
  daysList.forEach((day, index) => {
    const notifierCont = document.createElement("div");
    const graphCont = document.createElement("div");
    const userProgressNotifer = document.createElement("div");
    const paraEl = document.createElement("p");

    paraEl.innerHTML = daysList[index];

    //to calculate the percentage of completed tasks
    const totalTasks = tasksByDay[day].total;
    const completedTasks = tasksByDay[day].completed;
    const percentage =
      totalTasks > 0 ? Math.floor((completedTasks / totalTasks) * 100) : 0;

    //set up the height of progress bar
    userProgressNotifer.style.height = `${percentage}%`;

    graphCont.addEventListener("mouseenter", () => {
      const showPercentageCont = document.createElement("div");

      showPercentageCont.innerHTML = `${percentage}%`;

      graphCont.appendChild(showPercentageCont);

      showPercentageCont.classList.add("show_percentage_container");

      graphCont.addEventListener("mouseleave", () => {
        showPercentageCont.innerHTML = "";
      });
    });

    graphCont.appendChild(userProgressNotifer);

    //append every single graph container to notifer container

    notifierCont.appendChild(graphCont);
    notifierCont.appendChild(paraEl);

    // append the notifier container to bar container
    barCont.appendChild(notifierCont);

    //append to main progress bar
    //progressBarMainContainer.appendChild(barCont)

    //styles
    headEl.classList.add("progress_head");
    barCont.classList.add("bar_container");
    notifierCont.classList.add("notifier_container");
    graphCont.classList.add("graph_container");
    userProgressNotifer.classList.add("user_progress_notifier");
    paraEl.classList.add("progress_para");
  });

  //appendChile
  progressBarMainContainer.appendChild(headEl);
  progressBarMainContainer.appendChild(barCont);

  //add styles
  progressBarMainContainer.classList.add("progress_bar_main_container");

  //return the main
  return progressBarMainContainer;
}

function ProjectSection(onDetail, homePageMainCont) {
  //main container
  const projectMainContainer = document.createElement("div");

  //carousel container
  const carouselCont = document.createElement("div");

  const projectList = JSON.parse(localStorage.getItem("projectList")) || {};

  // Check if projectList is null or undefined
  if (!projectList || typeof projectList !== "object") {
    console.error("projectList is null, undefined, or not an object");
    return projectMainContainer; // Return an empty container
  }
  /*const projectList = {
        Camping: [
            {
                title: "TENT",
                description: "buy a tent for rent",
                priority: "High",
                date: "2025-01-26"
            }
        ],
        CodingGames: [
            {
                title: "Level Editor",
                description: "create a level editor using pygame ",
                priority: "High",
                date: "2025-01-27"
            }
        ]
    }*/
  /* Object.keys(projectList).forEach(projectName=>{

        console.log(`Project Name ${projectName}`)


        projectList[projectName].forEach(task=>{

            console.log(`Title: ${task.title}`)

        })
    })*/

  const projectHeadEl = document.createElement("h2");

  Object.keys(projectList).forEach((projectName) => {
    // project container
    const projectCont = document.createElement("div");

    const projectTitle = document.createElement("h3");
    const totalTaskEl = document.createElement("p");
    const detailButton = document.createElement("button");

    projectTitle.innerHTML = `${projectName}`;

    //get the total task in each project

    totalTaskEl.innerHTML = `${projectList[projectName].length} task`;

    //create the detail button

    detailButton.innerHTML = "Detail";

    //add event listener to detail button
    detailButton.addEventListener("click", () => {
      homePageMainCont.innerHTML = "";
      onDetail(projectName);
    });

    //append each project details to the  project container

    projectCont.appendChild(projectTitle);
    projectCont.appendChild(totalTaskEl);
    projectCont.appendChild(detailButton);

    carouselCont.appendChild(projectCont);

    //add styles to each project container
    projectTitle.classList.add("project_title");
    totalTaskEl.classList.add("total_task");
    detailButton.classList.add("detail_btn");

    projectCont.classList.add("project_container");
  });

  //add text to the head
  projectHeadEl.innerHTML = "Projects";

  //append to the main
  projectMainContainer.appendChild(projectHeadEl);
  projectMainContainer.appendChild(carouselCont);

  //add styles
  carouselCont.classList.add("carousel_container");
  projectHeadEl.classList.add("project_main_head");
  projectMainContainer.classList.add("project_main_container");

  //return the main
  return projectMainContainer;
}

function addNewProject(projectName) {
  let projects = JSON.parse(localStorage.getItem("projectList")) || {};

  // Check if projects is null or undefined
  if (!projects || typeof projects !== "object") {
    console.error("projects is null, undefined, or not an object");
    return false;
  }

  if (!projects[projectName]) {
    projects[projectName] = [];
    localStorage.setItem("projectList", JSON.stringify(projects));
    return true;
  } else {
    alert("Project name already exists!");
    return false;
  }
}

function addTaskToProject(projectName, task) {
  let projects = JSON.parse(localStorage.getItem("projectList")) || {};

  // Check if projects is null or undefined
  if (!projects || typeof projects !== "object") {
    console.error("projects is null, undefined, or not an object");
    return false;
  }

  if (!projects[projectName] || !Array.isArray(projects[projectName])) {
    alert("Project does no exist");
    return false;
  } else {
    projects[projectName].push(task);
    localStorage.setItem("projectList", JSON.stringify(projects));
    return true;
  }
}

function getProjects() {
  return JSON.parse(localStorage.getItem("projectList")) || {};
}

function addTaskSection() {
  //project list from
  //const projectList=['coding' , 'trip','skincare','new project']
  const projectList = Object.keys(
    JSON.parse(localStorage.getItem("projectList")) || {}
  );
  const priorityList = ["Low", "Medium", "High"];

  if (!projectList.includes("New Project")) {
    projectList.push("New Project");
  }

  // main container
  const taskContainer = document.createElement("div");

 // taskContainer.style.display="none";

  const modalCont = document.createElement("form");

  const modalHeadEl = document.createElement("h2");
  const horizontalOneEl = document.createElement("hr");
  const horizontalEl = document.createElement("hr");
  const projectLabel = document.createElement("label");
  const projectSelect = document.createElement("select");
  const titleLabel = document.createElement("label");
  const titleInput = document.createElement("input");
  const descBoxLabel = document.createElement("label");
  const descBoxTextArea = document.createElement("textarea");
  const priorityLabel = document.createElement("label");
  const prioritySelect = document.createElement("select");
  const dateLabel = document.createElement("label");
  const dateInput = document.createElement("input");

  const btnCont = document.createElement("div");
  const cancelBtnEl = document.createElement("button");
  const createBtnEl = document.createElement("button");

    // Show the modal when it's added to the DOM
    setTimeout(() => {
      taskContainer.style.display = "block";
    }, 0);
  

  //create ids
  projectLabel.id = "project-label";

  modalHeadEl.innerHTML = "New Task ToDo";
  projectLabel.innerHTML = "Project Name";

  projectList.forEach((name) => {
    const optionEl = document.createElement("option");
    optionEl.innerHTML = name;
    optionEl.value = name;
    projectSelect.appendChild(optionEl);
  });

  // input for new project
  const newProjectInput = document.createElement("input");
  newProjectInput.type = "text";
  newProjectInput.placeholder = "Enter New Project Name";
  newProjectInput.style.display = "none"; //hidden initially

  const saveNewProjectBtn = document.createElement("button");
  saveNewProjectBtn.innerHTML = "Save Project";
  saveNewProjectBtn.style.display = "none";

  //event listener for dropdown selection
  projectSelect.addEventListener("change", (e) => {

    if (e.target.value === "New Project") {
      
      // show the new project input and save button
      newProjectInput.style.display = "block";
      saveNewProjectBtn.style.display = "block";
    } else {
      newProjectInput.style.display = "none";
      saveNewProjectBtn.style.display = "none";
    }
  });

  saveNewProjectBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const newProjectName = newProjectInput.value.trim();

    if (newProjectName) {
      // add the new project to local storage

      if (addNewProject(newProjectName)) {
        // add the new project to the dropdown
        const optionEl = document.createElement("option");
        optionEl.innerHTML = newProjectName;
        optionEl.value = newProjectName;
        projectSelect.appendChild(optionEl);

        //save to local storage
        localStorage.setItem("projectList", JSON.stringify(getProjects()));

        // reset and hide the input box and button
        newProjectInput.value = "";
        newProjectInput.style.display = "none";
        saveNewProjectBtn.style.display = "none";

        // automatically select the new project
        projectSelect.value = newProjectName;
      } else {
        alert("Project name already exists!");
      }
    } else {
      alert("Please enter a valid project name.");
    }
  });

  titleLabel.innerHTML = "Title Task";
  titleInput.type = "text";
  titleInput.placeholder = "Add Task Name...";

  descBoxLabel.innerHTML = "Descrption";
  descBoxTextArea.placeholder = "Add Descrptions..";
  descBoxTextArea.rows = 5;
  descBoxTextArea.cols = 50;
  descBoxTextArea.maxLength = 100;

  priorityLabel.innerHTML = "Priority";

  priorityList.forEach((p) => {
    const priorityOption = document.createElement("option");
    priorityOption.innerHTML = p;
    prioritySelect.appendChild(priorityOption);
  });

  dateLabel.innerHTML = "Date";
  dateInput.type = "date";
  const today = new Date().toISOString().split("T")[0];
  dateInput.min = today;

  cancelBtnEl.innerHTML = "Cancel";
  createBtnEl.innerHTML = "Create";

  cancelBtnEl.type = "submit";

  btnCont.appendChild(cancelBtnEl);
  btnCont.appendChild(createBtnEl);

  //append content to modal
  modalCont.appendChild(horizontalOneEl);
  modalCont.appendChild(modalHeadEl);
  modalCont.appendChild(horizontalEl);
  modalCont.appendChild(projectLabel);
  modalCont.appendChild(projectSelect);

  modalCont.appendChild(newProjectInput);
  modalCont.appendChild(saveNewProjectBtn);

  modalCont.appendChild(titleLabel);
  modalCont.appendChild(titleInput);
  modalCont.appendChild(descBoxLabel);
  modalCont.appendChild(descBoxTextArea);
  modalCont.appendChild(priorityLabel);
  modalCont.appendChild(prioritySelect);
  modalCont.appendChild(dateLabel);
  modalCont.appendChild(dateInput);
  modalCont.appendChild(btnCont);

  window.onclick = function (event) {
    if (event.target == taskContainer) {
      taskContainer.style.display = "none";
    }
  };

  //add listener to create button in the form
  createBtnEl.addEventListener("click", (e) => {
    e.preventDefault();

    const projectName = projectSelect.value;
    const title = titleInput.value;
    const description = descBoxTextArea.value;
    const priority = prioritySelect.value;
    const taskDate = dateInput.value;
    const taskComplete = false;

    if (title && description && taskDate) {
      const task = {
        title: title,
        description: description,
        priority: priority,
        date: taskDate,
        complete: taskComplete,
      };

      const added = addTaskToProject(projectName, task);

      if (added) {
        alert("Task added successfully");
        modalCont.reset();
      }
    } else {
      alert("Please fill all the fields!");
    }
  });

  cancelBtnEl.addEventListener("click", (e) => {
    e.preventDefault();

    taskContainer.style.display = "none";
  });

  // append to main
  taskContainer.appendChild(modalCont);

  // add styles
  taskContainer.classList.add("task_container");
  modalCont.classList.add("modal_container");
  horizontalOneEl.classList.add("line1");
  horizontalEl.classList.add("line");
  modalHeadEl.classList.add("modalhead");

  projectLabel.classList.add("project_label");
  projectSelect.classList.add("project_select");

  newProjectInput.classList.add("project_select");
  saveNewProjectBtn.classList.add("new_project_save_btn");

  titleLabel.classList.add("project_label");
  titleInput.classList.add("project_select");

  descBoxLabel.classList.add("project_label");
  descBoxTextArea.classList.add("project_select");

  priorityLabel.classList.add("project_label");
  prioritySelect.classList.add("project_select");

  dateLabel.classList.add("project_label");
  dateInput.classList.add("project_select");

  btnCont.classList.add("button_container");
  cancelBtnEl.classList.add("cancel_btn");
  createBtnEl.classList.add("create_btn");

  // return main
  return taskContainer;
}

function NavigationSection() {
  const navMainCont = document.createElement("div");

  const homeIcon = document.createElement("i");
  const calenderIcon = document.createElement("i");
  const taskIcon = document.createElement("i");
  const profileIcon = document.createElement("i");

  homeIcon.classList.add("fa-solid", "fa-house", "nav_icon");
  calenderIcon.classList.add("fa-regular", "fa-calendar-days", "nav_icon");
  taskIcon.classList.add("fa-solid", "fa-pen-to-square", "task_icon");
  profileIcon.classList.add("fa-solid", "fa-user", "nav_icon");

  // add event listener to the task icon
  taskIcon.addEventListener("click", () => {
    const addTask = addTaskSection();

    navMainCont.appendChild(addTask);
  });

  
    // Close modal when clicking outside
    window.onclick = function (event) {
      if (event.target === addTaskSection()) {
        navMainCont.removeChild(addTask);
      }
    };

  // append child
  navMainCont.appendChild(homeIcon);
  navMainCont.appendChild(calenderIcon);
  navMainCont.appendChild(taskIcon);
  navMainCont.appendChild(profileIcon);

  //styles
  navMainCont.classList.add("nav_container");

  //return main
  return navMainCont;
}

function homePage(onDetail) {
  //create the main home page container
  const homePageMainCont = document.createElement("div");

  //welcome contianer design

  //create the top  welcome container
  const welcomeCont = document.createElement("div");
  //create the second white container
  const secondCont = document.createElement("div");

  //create the containers for inside welcome contianer
  const profileWelcomeCont = document.createElement("div");
  const msgContainer = document.createElement("div");
  const searchBarCont = document.createElement("div");

  // icon , welcome message container
  const icon = localStorage.getItem("selectedIcon");
  const char = localStorage.getItem("character") || "Guest";
  const img = document.createElement("img");
  const msg1 = document.createElement("h3");
  const msg2 = document.createElement("h3");

  console.log("retrieved image:", icon);

  img.src = icon || "./src/asserts/eating.png";

  msg1.innerHTML = "Welcome,";
  msg2.innerHTML = char;

  //
  msgContainer.appendChild(msg1);
  msgContainer.appendChild(msg2);

  //append child for top welcome container
  profileWelcomeCont.appendChild(img);
  profileWelcomeCont.appendChild(msgContainer);

  //callback function for onSearch
  const onSearch = (projectName) => {
    //clear home page
    homePageMainCont.innerHTML = "";
    onDetail(projectName);
  };

  // search bar container
  const searchBar = SearchBar(onSearch);

  //your progress container function
  const progressBar = ProgressBar();

  // create the second container project container
  const projectContainer = ProjectSection(onDetail, homePageMainCont);

  // create the third container nav container
  const navContainer = NavigationSection();

  // add everything for top welcome container
  welcomeCont.appendChild(profileWelcomeCont);
  welcomeCont.appendChild(searchBar);
  welcomeCont.appendChild(progressBar);

  // add project cont and nav cont to second container
  secondCont.appendChild(projectContainer);
  secondCont.appendChild(navContainer);

  // styles
  welcomeCont.classList.add("welcome_container");
  profileWelcomeCont.classList.add("profile_welcome_container");
  msgContainer.classList.add("msg_container");
  //for inside profile container
  img.classList.add("user_icon");
  msg1.classList.add("msg1");
  msg2.classList.add("msg2");

  //append to main home page container

  homePageMainCont.appendChild(welcomeCont);
  homePageMainCont.appendChild(secondCont);

  //return the main home page container
  return homePageMainCont;
}

export default homePage;
