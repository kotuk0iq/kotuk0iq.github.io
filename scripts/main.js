document.addEventListener('DOMContentLoaded', () => {
    function loadContent(page) {
        fetch(`pages/${page}.html`)
            .then(response => response.text())
            .then(data => {
                document.getElementById('content').innerHTML = data;
                console.log('Содержимое успешно загружено:', data);
            })
            .catch(error => {
                console.error('Ошибка загрузки:', error);
            });
    }

    loadContent('home');

    document.getElementById('menu').addEventListener('click', (event) => {
        event.preventDefault();
        const target = event.target.closest('a');
        if (target && target.dataset.page) {
            console.log('Загружаем страницу:', target.dataset.page);
            loadContent(target.dataset.page);
        }
    });
});