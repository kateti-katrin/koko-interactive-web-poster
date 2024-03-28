const inputField = document.getElementById('name');

inputField.addEventListener('focus', () => {
    inputField.placeholder = '';
});

inputField.addEventListener('blur', () => {
    inputField.placeholder = 'Введите ваше имя';
});
