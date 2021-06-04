export const themeChange = () => {
    const body = document.body;
    const themeChangeButton = document.querySelector('#theme-button');

    themeChangeButton.addEventListener('click', () => {
        if(!body.classList.contains('dark-theme')) {
            body.classList.add('dark-theme');
            localStorage.setItem('theme','dark');
        } else {
            body.classList.remove('dark-theme'); 
            localStorage.removeItem('theme','dark');
        };  

        themeIconChanger();
    });

    function themeIconChanger() {
        const themeIconDark = document.querySelector('#themeIconDark');
        const themeIconLight = document.querySelector('#themeIconLight');
        
        if(!body.classList.contains('dark-theme'))  {
            themeIconDark.classList.add('themeChangerAnimation');
            themeIconLight.classList.remove('themeChangerAnimation');
            themeIconLight.style.opacity = '0';
            themeIconDark.style.opacity = '100';
        } else {
            themeIconLight.classList.add('themeChangerAnimation');
            themeIconDark.classList.remove('themeChangerAnimation');
            themeIconLight.style.opacity = '100';
            themeIconDark.style.opacity = '0';
        }; 
    };
    
    function saveThemePreference() {
        if(localStorage.getItem('theme') === 'dark') {
            body.classList.add('dark-theme');
            localStorage.setItem('theme','dark');
            themeIconChanger();
        } else {
            body.classList.remove('dark-theme'); 
            localStorage.removeItem('theme','dark');
        };
    };

    saveThemePreference();
    themeIconChanger();
};
