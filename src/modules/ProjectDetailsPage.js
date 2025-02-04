

function projectDetailsSection(backBtnClick,projectName){

    //main container
    const mainDetailContainer=document.createElement('div')

    const topContainer = document.createElement('div')

    //create the top project image container
    const projectImageContainer=document.createElement('div')

    //get the project list from localstorage
    const projectList = JSON.parse(localStorage.getItem('projectList'))

    const secondContainer = document.createElement('div')

        
    //top contaner 
    const backBtn = document.createElement('i')
    const headEl = document.createElement('h1')

    backBtn.classList.add("fa-solid","fa-arrow-left","back_btn")
    
    headEl.innerHTML=`${projectName}`

    //append to top project image container
    projectImageContainer.appendChild(backBtn)
    projectImageContainer.appendChild(headEl)


    backBtn.addEventListener('click',()=>{
        
        backBtnClick()
        
    })



    //append to top container
    topContainer.appendChild(projectImageContainer)



    //second container
    const taskHeadEl = document.createElement('h2')
    taskHeadEl.innerHTML="Tasks"

    secondContainer.appendChild(taskHeadEl)

    //function for display or create  the modal

    const showTaskModal=(task)=>{

        const modalContainer = document.createElement('div')
        const modalContent = document.createElement('div')

        const modalTitle = document.createElement('h3')
        const modalHLine = document.createElement('hr')
        const modalDescContainer = document.createElement('div')
        const modalPriorityContainer = document.createElement('div')
        const modalDateContainer = document.createElement('div')
        const editBtn = document.createElement('button')
        const saveBtn = document.createElement('button')


        //priority buttons 
        const lowPriorityBtn = document.createElement('button')
        const mediumPriorityBtn = document.createElement('button')
        const highPriorityBtn = document.createElement('button')


        lowPriorityBtn.innerHTML="Low"
        mediumPriorityBtn.innerHTML="Medium"
        highPriorityBtn.innerHTML="High"

        const hightLightPrority=(priority)=>{
            lowPriorityBtn.style.backgroundColor=priority==='Low'?'green':'#f0f0f0';
            mediumPriorityBtn.style.backgroundColor=priority==='Medium'?'yellow':'#f0f0f0'
            highPriorityBtn.style.backgroundColor=priority==='High'?'red':'#f0f0f0'
        }
        

        hightLightPrority(task.priority);

        //append priority buttons
        modalPriorityContainer.appendChild(lowPriorityBtn)
        modalPriorityContainer.appendChild(mediumPriorityBtn)
        modalPriorityContainer.appendChild(highPriorityBtn)
        

        modalTitle.innerHTML = task.title;
        const modalDesc = document.createElement('h3')
        const modalDescContent = document.createElement('p')

        modalDesc.innerHTML='Description:'
        modalDescContent.innerHTML=task.description;

        //add to model descritpion container
        modalDescContainer.appendChild(modalDesc)
        modalDescContainer.appendChild(modalDescContent)
        
        editBtn.innerHTML='Edit'
        saveBtn.innerHTML="Save"
        saveBtn.style.display='none'//initially


        //date input 
        const dateInput = document.createElement('input')
        dateInput.type = 'date'
        dateInput.value = task.date;
        dateInput.style.display='none'//initially

        const dateDisplay = document.createElement('p')
        dateDisplay.innerHTML=`Due Date : ${task.date}`


        //append to date container
        modalDateContainer.appendChild(dateDisplay)
        modalDateContainer.appendChild(dateInput)


        lowPriorityBtn.addEventListener('click',()=>{
            task.priority='Low'
            hightLightPrority('Low')
        })
        mediumPriorityBtn.addEventListener('click',()=>{
            task.priority='Medium'
            hightLightPrority('Medium')
        })
        highPriorityBtn.addEventListener('click',()=>{
            task.priority='High'
            hightLightPrority('High')
        })
        



        //add event listener to the edit button
        editBtn.addEventListener('click',()=>{
            modalTitle.contentEditable = true 
            modalDescContent.contentEditable = true;
            dateInput.style.display='inline-block';
            dateDisplay.style.display='none'
            editBtn.style.display='none'
            saveBtn.style.display='inline-block'

        })

        saveBtn.addEventListener('click',()=>{
            task.title=modalTitle.innerText;
            task.description=modalDescContent.innerText;
            task.date = dateInput.value;

            localStorage.setItem('projectList',JSON.stringify(projectList))


            //disabel editing 
            modalTitle.contentEditable=false;
            modalDescContent.contentEditable=false;
            dateInput.style.display='none';
            dateDisplay.style.display='inline-block'
            dateDisplay.innerHTML=`Due Date: ${task.date}`
            editBtn.style.display='inline-block'
            saveBtn.style.display='none'
        })




        modalContent.appendChild(modalTitle)
        modalContent.appendChild(modalHLine)
        modalContent.appendChild(modalDescContainer)
        modalContent.appendChild(modalPriorityContainer)
        modalContent.appendChild(modalDateContainer)
        modalContent.appendChild(editBtn)
        modalContent.appendChild(saveBtn)

        


        // append to main
        modalContainer.appendChild(modalContent)


        //add styles
        modalContainer.classList.add('task_modal_container')
        modalContent.classList.add('task_modal_content')
        modalTitle.classList.add('modal_title')
        modalHLine.classList.add('modal_HLine')
        modalDescContainer.classList.add('modal_desc_container')
        modalDesc.classList.add('modal_desc')
        modalDescContent.classList.add('modal_desc_content')
        modalPriorityContainer.classList.add('modal_priority_cont')
        lowPriorityBtn.classList.add('low_priority_btn')
        mediumPriorityBtn.classList.add('low_priority_btn')
        highPriorityBtn.classList.add('low_priority_btn')

        modalDateContainer.classList.add('modal_date_container')
        editBtn.classList.add('edit_btn')
        saveBtn.classList.add('save_btn')


        window.onclick=function(event){
            if(event.target==modalContainer){
                modalContainer.style.display='none'
            }
        }


        return modalContainer
       
    }


    projectList[projectName].forEach(task => {


        const taskCont = document.createElement('div')
        const taskInfoCont = document.createElement('div')
        const taskIconCont = document.createElement('div')
        
        const taskHeadEl = document.createElement('h3')
        const priorityEl = document.createElement('p')
        const prioritySpanEl = document.createElement('span')
        const taskDate = document.createElement('p')
        const deleteIcon = document.createElement('i')
        const checkBoxEl = document.createElement('input')



        taskHeadEl.innerHTML=task.title

        prioritySpanEl.innerHTML=task.priority

        taskDate.innerHTML=`Due Date: ${task.date}`

        

        if (prioritySpanEl.innerText==='High'){
             prioritySpanEl.style.color='red'
        }

        else if(prioritySpanEl.innerText==='Medium'){
            prioritySpanEl.style.color='yellow'
        }

        else if(prioritySpanEl.innerText==='Low'){
            prioritySpanEl.style.color='Green'
        }

        
        //adding completed boolean to each task
        
        /*let completed={"complete":false} 

        console.log(task)

        Object.assign(task,completed)

        console.log(projectList) */

        // create the delete icon

        deleteIcon.classList.add("fa-solid","fa-trash","delete_icon")


        if(task.complete){
            checkBoxEl.checked=true 
        }else{
            checkBoxEl.checked=false 
        }

        //add event listener to the delete icon 
        deleteIcon.addEventListener('click',()=>{


            const taskIndex = projectList[projectName].findIndex(t=>t.title===task.title)

            if (taskIndex!==-1){
                projectList[projectName].splice(taskIndex,1)
            }


            if(projectList[projectName].length===0){
                delete projectList[projectName]
            }
            

            //update the localstorage
            localStorage.setItem('projectList',JSON.stringify(projectList))


            //remove the task container from the main container
            secondContainer.removeChild(taskCont)

        })



        //add eventlistener to the checkbox 
        checkBoxEl.addEventListener('change',()=>{
            

            task.complete=checkBoxEl.checked;
            localStorage.setItem('projectList',JSON.stringify(projectList))

        })


        //add eventlistener to the task container
        taskCont.addEventListener('click',()=>{
            
            const showModal=showTaskModal(task)

            mainDetailContainer.appendChild(showModal)

        })


       

        priorityEl.innerText="Priority: "

        priorityEl.appendChild(prioritySpanEl)
        
        checkBoxEl.type='checkbox'


        taskInfoCont.appendChild(taskHeadEl)
        taskInfoCont.appendChild(priorityEl)
        taskInfoCont.appendChild(taskDate)


        taskIconCont.appendChild(deleteIcon)
        taskIconCont.appendChild(checkBoxEl)

        //append task info ta task container
        taskCont.appendChild(taskInfoCont)
        taskCont.appendChild(taskIconCont)

        secondContainer.appendChild(taskCont)

        //styles
        taskCont.classList.add('detail_task_container')
        taskInfoCont.classList.add('task_info_container')
        taskIconCont.classList.add('task_icon_container')
        taskHeadEl.classList.add('detail_task_head')
        checkBoxEl.classList.add('check_box_element')

        priorityEl.classList.add("priority_el")
        prioritySpanEl.classList.add("priority_span_el")


        taskDate.classList.add('task_date')
        
        
    });

  




    //append to main
    mainDetailContainer.appendChild(topContainer)
    mainDetailContainer.appendChild(secondContainer)


    //styles
    mainDetailContainer.classList.add('main_detail_container')
    topContainer.classList.add('top_container')
    projectImageContainer.classList.add('project_image_container')
    headEl.classList.add('project_detail_head')
    
    //style for second container
    secondContainer.classList.add('detail_second_container')
    taskHeadEl.classList.add('detail_task_main_head')

    return mainDetailContainer



}



export default projectDetailsSection;