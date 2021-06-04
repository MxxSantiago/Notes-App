export function savedAnimation() {
    const savedPopUp = document.querySelector('.task-saved-popup');

    if(!savedPopUp.classList.contains('animate__animated')) {
        savedPopUp.style.display = 'flex';    
        savedPopUp.classList.add('animate__animated');
        savedPopUp.classList.add('animate__fadeOutUp');
        
        setTimeout(() => {
            savedPopUp.style.display = 'none';    
            savedPopUp.classList.remove('animate__animated');
            savedPopUp.classList.remove('animate__fadeOutUp');
        }, 900);
    };
};
