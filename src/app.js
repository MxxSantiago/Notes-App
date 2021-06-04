import { ReactiveState } from './components/ReactiveState.js';
import { savedAnimation } from './animations/taskSavedAnimation.js';
import { taskDisplay, taskDisplayFalse } from './tasksDisplay.js';
import { movilValidation, tasksMovilDisplay } from './movilDisplay.js';
import { themeChange } from './theme.js';

let taskState = {};
const LSdata = JSON.parse(localStorage.getItem('items')) 
             ? JSON.parse(localStorage.getItem('items'))
             : [];

const app = new ReactiveState(
    // Element to inject
    "#todo-list", 

    // Notes data
    { todoList: LSdata },

    // Template
    function(properties) {
        if(properties.todoList.length < 1) {
            return '<p><em>There are no notes</em></p>';
        };
    
        let toDos = properties.todoList.map(item => {
            const { title, ID } = item;
            return `<li class="task" id="${ID}">${title}</li>`;
        }).join('');
            
        return toDos;
    }
);

// Render the app
document.addEventListener('DOMContentLoaded', () => {
    app.render()
    themeChange();
    updateTasks();
    tasksMovilDisplay();
});

const createNewTask = () => {
    const inputItem = document.getElementById('new-task-input');
    const lastState = app.getState();

    const taskInfo = {
        title: inputItem.value,
        text: '',
        ID: Date.now()
    };

    // Update the state and UI
    lastState.todoList.push(taskInfo); 
    app.setState({todoList: lastState.todoList});
    app.render();
    localStorage.setItem('items', JSON.stringify(lastState.todoList));    
};

document.addEventListener('submit', event => {
    // Form submit validation
    if(!event.target.matches('#new-task-form')) return false;
    event.preventDefault();

    const newTaskInput = document.getElementById('new-task-input');
    if(!newTaskInput || newTaskInput.value.trim() == '') return;

    // Updating UI
    createNewTask();
    updateTasks();

    // Rendering the state to the last data added to the todoList
    let lastDataChild = app.data.todoList.length - 1;
    taskState = app.data.todoList[lastDataChild].ID;
    editTask(app.data.todoList[lastDataChild]);

    newTaskInput.value = '';

    const taskText = document.querySelector('#type-area');
    taskText.focus();
});

const updateTasks = () => {
    const tasks = document.querySelectorAll('.task');
    if(!tasks) return;

    tasks.forEach(task => {
        task.addEventListener('click', element => {
            app.data.todoList.forEach(item => {
                if(item.ID == element.target.id) {
                    taskState = element.target.id;
                    editTask(item);
                    movilValidation();
                };
            });
        });
    });
};

const editTask = (task)=> {
    const taskTitle = document.querySelector('#task-title');
    const taskText = document.querySelector('#type-area');
   
    taskDisplay();
    taskTitle.value = task.title;
    taskText.value = task.text;
    
    const saveTitle = document.querySelector('#saveTitle-button');
    saveTitle.addEventListener('click', e => {
        e.preventDefault();

        const selectedTask = document.getElementById(taskState);
        task.title = taskTitle.value;
        selectedTask.textContent = taskTitle.value;

        app.data.todoList.forEach(item => {
            if(item.ID == taskState) {
                item.title = task.title;

                const lastState = app.getState();
                app.setState({todoList: lastState.todoList});
                localStorage.setItem('items', JSON.stringify(lastState.todoList));    
            };
        });

        savedAnimation();
    });

    const saveText = document.querySelector('#save-button');
    saveText.addEventListener('click', () => {
        task.text = taskText.value;

        app.data.todoList.forEach(item => {
            if(item.ID == taskState) {
                item.text = task.text;

                const lastState = app.getState();
                app.setState({todoList: lastState.todoList});
                localStorage.setItem('items', JSON.stringify(lastState.todoList));    
            };
        });

        savedAnimation();
    });
};

const clearTask = () => {
    const clearButton = document.querySelector('#delete-button');
    clearButton.addEventListener('click', () => {
        app.data.todoList = app.data.todoList.filter(item => item.ID != taskState);
        const lastState = app.getState();
        app.setState({todoList: lastState.todoList});
        localStorage.setItem('items', JSON.stringify(lastState.todoList));   
        app.render();
        updateTasks();
        taskDisplayFalse();
    });
};
clearTask()

if('serviceWorker' in navigator) navigator.serviceWorker.register('../sw.js');
