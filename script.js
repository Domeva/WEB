// Збирання і збереження інформації
const systemInfo = {
    platform: navigator.platform,
    userAgent: navigator.userAgent,
    appVersion: navigator.appVersion,
    language: navigator.language,
    cookieEnabled: navigator.cookieEnabled,
    online: navigator.onLine,
};

localStorage.setItem('systemInfo', JSON.stringify(systemInfo));

// Завантаження даних із localStorage і вставка в футер
const footer = document.getElementById('footer');
const storedInfo = localStorage.getItem('systemInfo');

if (storedInfo) {
    const info = JSON.parse(storedInfo);

    let infoHtml = '<h4>Інформація про систему:</h4><ul>'; // let - локальна змінна
    for (const [key, value] of Object.entries(info)) {
        infoHtml += `<li><b>${key}:</b> ${value}</li>`;
    }
    infoHtml += '</ul>';

    footer.innerHTML = infoHtml;
}

// Отримання коментарів з JSONPlaceholder
fetch('https://jsonplaceholder.typicode.com/posts/8/comments')
    .then(response => response.json())
    .then(comments => {
        const container = document.getElementById('comments-container');
        container.innerHTML = ''; // Очистити "Завантаження..."

        comments.forEach(comment => {
            const commentDiv = document.createElement('div');
            commentDiv.style.border = '1px solid #ccc';
            commentDiv.style.margin = '10px 0';
            commentDiv.style.padding = '10px';

            commentDiv.innerHTML = `
                <strong>${comment.name}</strong> (<em>${comment.email}</em>)<br>
                ${comment.body}
            `;

            container.appendChild(commentDiv);
        });
    })
    .catch(error => {
        console.error('Помилка при завантаженні коментарів:', error);
        document.getElementById('comments-container').innerText = 'Не вдалося завантажити коментарі.';
    });


// Показати модальне вікно через 60 секунд
setTimeout(() => {
    document.getElementById('modal').style.display = 'block';
}, 60000); // 60 000 мс = 60 секунд

// Закриття при натисканні на хрестик
document.querySelector('.close').onclick = function () {
    document.getElementById('modal').style.display = 'none';
};




const toggleBtn = document.getElementById('theme-toggle');

const hour = new Date().getHours();
const isNight = hour < 7 || hour >= 21;
storedTheme = isNight ? 'dark' : 'light';

document.body.classList.toggle('dark-theme', storedTheme === 'dark');
toggleBtn.textContent = storedTheme === 'dark' ? '☀️ Денна тема' : '🌙 Нічна тема';

toggleBtn.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark-theme');
  toggleBtn.textContent = isDark ? '☀️ Денна тема' : '🌙 Нічна тема';
});
