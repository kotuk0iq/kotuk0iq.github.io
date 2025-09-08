// CONFIG
const login = 'Dev'; // ТОЛЬКО ЭТО МЕНЯЙТЕ НА СВОЙ ЛОГИН


// SCRIPT
firebase.initializeApp({
 databaseURL: "https://server-kotuk0iq-default-rtdb.firebaseio.com"
});

const database = firebase.database();

let adOverlay;
let adContent;
let timerDisplay;
let closeButton;
let timer;
let isShowing = false;

function replaceNewLines(text) {
 if (typeof text === 'string') {
 return text.replace(/\\n/g, '\n');
 }
 return text;
}
const AD_DURATION = 15000;
function createAdElements() {
 adOverlay = document.createElement('div');
 adOverlay.classList.add('ad-overlay');
 adOverlay.style.cssText = `
 position: fixed;
 top: 0;
 left: 0;
 width: 100%;
 height: 100%;
 background: rgba(0, 0, 0, 0.7);
 display: flex;
 justify-content: center;
 align-items: center;
 z-index: 9999;
 `;

 adContent = document.createElement('div');
 adContent.classList.add('ad-content');
 adContent.style.cssText = `
 background: white;
 padding: 20px;
 border-radius: 8px;
 width: 90%;
 max-width: 800px;
 text-align: left;
 box-sizing: border-box;
 overflow: auto;
 `;

 timerDisplay = document.createElement('div');
 timerDisplay.classList.add('timer');
 timerDisplay.style.cssText = `
 margin-bottom: 20px;
 color: #333;
 text-align: center;
 `;

 closeButton = document.createElement('button');
 closeButton.classList.add('close-button');
 closeButton.style.cssText = `
 margin-top: 20px;
 padding: 10px 20px;
 background: #007bff;
 color: white;
 border: none;
 border-radius: 4px;
 cursor: not-allowed;
 display: block;
 margin: 20px auto 0;
 `;
}

async function getRandomAd() {
 try {
 const adsRef = database.ref('KotukPay/other/Ads/ad');
 const snapshot = await adsRef.once('value');

 if (snapshot.exists()) {
 const adsData = snapshot.val();
 const adsArray = Object.values(adsData);

 if (adsArray.length > 0) {
 return adsArray[Math.floor(Math.random() * adsArray.length)];
 }
 }

 return null;
 } catch (error) {
 console.error('Ошибка при получении рекламы:', error);
 return null;
 }
}

async function viewAd() {
 if (isShowing) return;

 isShowing = true;
 createAdElements();

 const ad = await getRandomAd();
 if (!ad) {
 closeAd();
 return;
 }

 const title = document.createElement('h3');
 title.textContent = replaceNewLines(ad.title || 'Заголовок отсутствует');

 const content = document.createElement('div');
 content.innerHTML = replaceNewLines(ad.content || 'Описание отсутствует');
 content.style.cssText = `
 margin: 20px 0;
 line-height: 1.6;
 text-align: left;
`;

const linkButton = document.createElement('button');
linkButton.textContent = 'Перейти на сайт';
linkButton.style.cssText = `
 margin-top: 20px;
 padding: 10px 20px;
 background: #000;
 color: white;
 border: none;
 border-radius: 4px;
 cursor: pointer;
 display: block;
 margin: 20px auto 0;
`;

linkButton.addEventListener('click', () => {
 window.open(ad.link, '_blank');
});

adContent.appendChild(timerDisplay);
adContent.appendChild(title);
adContent.appendChild(content);
adContent.appendChild(linkButton);
adContent.appendChild(closeButton);
adOverlay.appendChild(adContent);
document.body.appendChild(adOverlay);

let remainingTime = AD_DURATION;
updateTimerDisplay();

timer = setInterval(() => {
 remainingTime -= 1000;
 updateTimerDisplay();

 if (remainingTime <= 0) {
 clearInterval(timer);
 closeAd();
 }
}, 1000);

function updateTimerDisplay() {
 const seconds = Math.ceil(remainingTime / 1000);
 timerDisplay.textContent = `Осталось: ${seconds} секунд`;
 closeButton.textContent = `Закрыть через ${seconds} секунд`;
}

closeButton.addEventListener('click', () => {
 if (remainingTime <= 0) {
 closeAd();
 }
});
}

async function closeAd() {
 try {
 document.body.removeChild(adOverlay);
 adOverlay = null;
 adContent = null;
 timerDisplay = null;
 closeButton = null;

 await updateViews();

 isShowing = false;
 } catch (error) {
 console.error('Ошибка при закрытии рекламы:', error);
 }
}

async function updateViews() {
 try {
 const viewsRef = database.ref(`KotukPay/other/Ads/users/${login}/views`);
 const snapshot = await viewsRef.once('value');
 let currentViews = snapshot.val() || 0;

 currentViews = currentViews + 1;
 await viewsRef.set(currentViews);
 } catch (error) {
 console.error('Ошибка обновления просмотров:', error);
 }
}

window.viewAd = viewAd;