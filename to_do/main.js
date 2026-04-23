const form=document.getElementsByTagName("form")[0];
const task=document.getElementsByTagName("input")[0];
const button=document.getElementsByTagName("button")[0];
const msg=document.querySelector(".msg");
const list=document.querySelector(".list");

;


button.addEventListener("click", showTask);


 function showTask(e) {
    e.preventDefault();
     
    if (task.value === ''){
        msg.classList.add('error');
        msg.innerHTML="pleace enter your task";
        setTimeout(() => msg.remove(), 2000);
    }
    else{
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(task.value));
        
        const btnContainer = document.createElement('div');
        const completeBtn = document.createElement('button');
        completeBtn.textContent = 'DONE';
        completeBtn.classList.add('complete-btn');
        btnContainer.appendChild(completeBtn);
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'CANCEL';
        deleteBtn.classList.add('delete-btn');
        btnContainer.appendChild(deleteBtn);
        
        li.appendChild(btnContainer);
        list.appendChild(li);
        
        completeBtn.addEventListener('click', () => {
            li.classList.toggle('completed');
         });

         deleteBtn.addEventListener('click', () => {
            li.remove();
         });

        task.value=''
    }
 }

console.log( document.getElementsByTagName('button'));


