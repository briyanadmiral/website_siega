// script.js


const todoList = document.getElementById('todo-list');
const progressList = document.getElementById('progress-list');
const doneList = document.getElementById('done-list');

function createCard(task) {
   
    let priorityColor = 'bg-gray-100 text-gray-800';
    if(task.priority === 'Tinggi') priorityColor = 'bg-red-100 text-red-800';
    if(task.priority === 'Sedang') priorityColor = 'bg-yellow-100 text-yellow-800';

    
    const card = document.createElement('div');
    card.className = 'task-card bg-white p-4 rounded-lg shadow border border-gray-100';
    
    
    card.innerHTML = `
        <div class="flex justify-between items-start mb-2">
            <span class="text-xs font-semibold px-2 py-1 rounded-full ${priorityColor}">${task.priority}</span>
            <button onclick="moveTask(${task.id})" class="text-gray-400 hover:text-indigo-600" title="Pindahkan status">
                ➡️
            </button>
        </div>
        <h3 class="font-bold text-gray-800 mb-1">${task.title}</h3>
        <div class="text-sm text-gray-500 flex items-center gap-1">
            👤 <span>${task.assignee}</span>
        </div>
    `;
    return card;
}


function renderBoard() {

    todoList.innerHTML = '';
    progressList.innerHTML = '';
    doneList.innerHTML = '';


    projectData.forEach(task => {
        const cardElement = createCard(task);

        if (task.status === 'to-do') {
            todoList.appendChild(cardElement);
        } else if (task.status === 'in-progress') {
            progressList.appendChild(cardElement);
        } else if (task.status === 'done') {
            doneList.appendChild(cardElement);
        }
    });

    updateCounts();
}


function moveTask(id) {

    const task = projectData.find(t => t.id === id);
    
    
    if (task.status === 'to-do') {
        task.status = 'in-progress';
    } else if (task.status === 'in-progress') {
        task.status = 'done';
    } else {
       
        task.status = 'to-do'; 
    }

    
    renderBoard();
}

function updateCounts() {
    document.getElementById('count-todo').innerText = projectData.filter(t => t.status === 'to-do').length;
    document.getElementById('count-progress').innerText = projectData.filter(t => t.status === 'in-progress').length;
    document.getElementById('count-done').innerText = projectData.filter(t => t.status === 'done').length;
}


renderBoard();