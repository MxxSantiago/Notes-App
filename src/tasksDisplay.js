function taskDisplay() {
    const noTaskDefaultContainer = document.querySelector('.no-task-default-container');
    const taskConfigContainer = document.querySelector('.task-config-container');

    noTaskDefaultContainer.style.display = 'none';
    taskConfigContainer.style.display = 'block';
};

function taskDisplayFalse() {
    const noTaskDefaultContainer = document.querySelector('.no-task-default-container');
    const taskConfigContainer = document.querySelector('.task-config-container');

    noTaskDefaultContainer.style.display = 'flex';
    taskConfigContainer.style.display = 'none';
};

export {
    taskDisplay,
    taskDisplayFalse
};