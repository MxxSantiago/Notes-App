import { taskDisplayFalse } from './tasksDisplay.js';

function tasksMovilDisplay() {
    const tasksDisplayButton = document.querySelector('.tasksDisplay-button');
    tasksDisplayButton.addEventListener('click', movilValidation);
};

function movilValidation() {
    const tasksDisplayButton = document.querySelector('.tasksDisplay-button');
    const pageBar = document.querySelector('.page-bar');

    if(window.getComputedStyle(tasksDisplayButton).display != "none") {
        if(pageBar.style.height != 'max-content') {
            pageBar.style.height = 'max-content';
            pageBar.style.zIndex = '5';
            taskDisplayFalse();
        } else {
            pageBar.style.height = '100px';
            pageBar.style.zIndex = '0';
        };  
    };
};

export {
    tasksMovilDisplay,
    movilValidation
};