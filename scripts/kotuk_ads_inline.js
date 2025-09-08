// CONFIG
const login = 'Dev'; // Введите здесь свой логин

// SCRIPT
firebase.initializeApp({
  databaseURL: "https://server-kotuk0iq-default-rtdb.firebaseio.com"
});

const database = firebase.database();
const adContainer = document.querySelector('.kotuk_ad');
const adClass = 'kotuk_ad';

async function getRandomAd() {
    try {
        const adsRef = database.ref('KotukPay/other/Ads/ad');
        const snapshot = await adsRef.once('value');

        if (snapshot.exists()) {
            const adsData = snapshot.val();
            const adsArray = Object.values(adsData);

            if (adsArray.length > 0) {
                const randomAd = adsArray[Math.floor(Math.random() * adsArray.length)];
                return randomAd;
            }
        }

        return null;
    } catch (error) {
        console.error('Ошибка при получении рекламы:', error);
        return null;
    }
}

function replaceNewLines(text) {
    return text.replace(/\\n/g, '\n');
}

let adInterval;

async function displayAd() {
    try {
        const ad = await getRandomAd();

        if (!ad) return;

        adContainer.innerHTML = '';

        const adElement = document.createElement('div');
        adElement.classList.add(adClass);
        adElement.style.backgroundColor = 'rgb(150, 150, 150)';
        adElement.style.padding = '20px';
        adElement.style.borderRadius = '8px';
        adElement.style.margin = '10px';
        adElement.style.boxSizing = 'border-box';
        adElement.style.width = '100%';
        adElement.style.maxWidth = '400px';

        const title = document.createElement('h3');
        title.textContent = ad.title;
        title.style.margin = '0 0 10px';
        title.style.color = '#000';

        const content = document.createElement('p');
        content.textContent = replaceNewLines(ad.content);
        content.style.marginBottom = '15px';
        content.style.color = '#333';

        const button = document.createElement('button');
        button.textContent = 'Перейти на сайт';
        button.style.backgroundColor = 'rgb(100, 100, 100)';
        button.style.color = '#fff';
        button.style.padding = '10px 15px';
        button.style.border = 'none';
        button.style.borderRadius = '4px';
        button.style.cursor = 'pointer';
        button.style.marginTop = '10px';
        button.style.display = 'block';
        button.style.width = 'fit-content';
        button.style.margin = 'auto';

        button.addEventListener('click', () => {
            window.open(ad.link, '_blank');
        });

        adElement.appendChild(title);
        adElement.appendChild(content);
        adElement.appendChild(button);
        adContainer.appendChild(adElement);
    } catch (error) {
        console.error('Ошибка отображения рекламы:', error);
    }
}

function startAdRotation() {
    clearInterval(adInterval);
    adInterval = setInterval(() => {
        displayAd();
    }, 30000);
}

async function updateViews() {
    try {
        const viewsRef = database.ref(`KotukPay/other/Ads/users/${login}/views`);

        const snapshot = await viewsRef.once('value');
        let currentViews = snapshot.val() || 0;

        currentViews = parseFloat((currentViews + 0.1).toFixed(1));
        await viewsRef.set(currentViews);
    } catch (error) {
        console.error('Ошибка обновления просмотров:', error);
    }
}

let viewsInterval;

function startViewsTracking() {
    clearInterval(viewsInterval);
    viewsInterval = setInterval(() => {
        updateViews();
    }, 60000);
}

window.addEventListener('DOMContentLoaded', async () => {
    displayAd();
    startAdRotation();
    startViewsTracking();
});