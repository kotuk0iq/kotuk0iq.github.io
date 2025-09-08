// CONFIG
const YOUR_LOGIN = 'Dev'; // Ваш логин для получения донатов



// SCRIPT
const firebaseConfig = {
 databaseURL: "https://server-kotuk0iq-default-rtdb.firebaseio.com"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

function decryptPassword(____) {const _={'×': '9','√': '8','∆': '7','•': '6','°': '5','α': '4','π': '3','β': '2','γ': '1','<': '0','™': 'o','©': 'a','®': 'e','§': 'y','¶': 'u','¼': 'i','½': 'c','¿': 'x','¡': 'g','¸': 'z','˜': 'f'};let __='';for (let ___ of ____) {__ += _[___] || ___;}return __;}

function createPayForm(containerClass) {
    const style = document.createElement('style');
    style.innerHTML = `
    .pay-form {
        background: #2c3e50;
        padding: 20px;
        border-radius: 8px;
        max-width: 400px;
        margin: 20px auto;
    }

    .pay-form input,
    .pay-form button {
        width: 100%;
        padding: 10px;
        margin: 10px 0;
        border: none;
        border-radius: 4px;
        box-sizing: border-box;
    }

    .pay-form input {
        background: #ecf0f1;
        color: #7f8c8d;
    }

    .pay-form button {
        background: #e74c3c;
        color: white;
        cursor: pointer;
    }

    .pay-form button:hover {
        background: #c0392b;
    }
    `;
    document.head.appendChild(style);

    const container = document.querySelector(`.${containerClass}`);
    if (!container) return;

    const form = document.createElement('div');
    form.classList.add('pay-form');

    const loginLabel = document.createElement('label');
    loginLabel.innerHTML = 'Логин:';

    const loginInput = document.createElement('input');
    loginInput.type = 'text';
    loginInput.placeholder = 'Введите ваш логин';

    const passwordLabel = document.createElement('label');
    passwordLabel.innerHTML = 'Пароль:';

    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.placeholder = 'Введите пароль';

    const amountLabel = document.createElement('label');
    amountLabel.innerHTML = 'Сумма:';

    const amountInput = document.createElement('input');
    amountInput.type = 'number';
    amountInput.placeholder = 'Введите сумму';
    amountInput.step = '0.01';

    const payButton = document.createElement('button');
    payButton.textContent = 'Оплатить';

    payButton.addEventListener('click', () => {
    const login = loginInput.value.trim();
    const password = passwordInput.value.trim();
    const amount = parseFloat(amountInput.value);

    if (!login || !password || isNaN(amount) || amount <= 0) {
        alert('Заполните все поля корректно');
        return;
    }

    payButton.disabled = true;
    payButton.textContent = 'Обработка...';

    get_donate(login, password, amount)
        .then(result => {
            if (result) {
                alert('Оплата успешно проведена');
                loginInput.value = '';
                passwordInput.value = '';
                amountInput.value = '';
            } else {
                alert('Ошибка при оплате');
            }

            payButton.disabled = false;
            payButton.textContent = 'Оплатить';
        })
        .catch(error => {
            console.error('Произошла ошибка:', error);
            alert('Произошла ошибка при обработке платежа');
            payButton.disabled = false;
            payButton.textContent = 'Оплатить';
        });
});


    form.appendChild(loginLabel);
    form.appendChild(loginInput);
    form.appendChild(passwordLabel);
    form.appendChild(passwordInput);
    form.appendChild(amountLabel);
    form.appendChild(amountInput);
    form.appendChild(payButton);

    container.appendChild(form);

    return result;
}


async function get_donate(login, password, amount) {
 try {
 if (amount <= 0) return false;

 const userRef = database.ref(`KotukPay/user/${login}`);
 const snapshot = await userRef.once('value');
 
 if (!snapshot.exists()) return false;

 const userData = snapshot.val();
 const storedPassword = userData.password;
 const userMoney = userData.money;

 const decryptedPassword = decryptPassword(storedPassword);
 if (password !== decryptedPassword) return false;

 if (userMoney < amount) return false;

 const confirm = window.confirm(`Вы хотите перевести ${amount} монет?`);
 if (!confirm) return false;

 await userRef.child('money').set(userMoney - amount);

 const receiverAmount = parseFloat((amount * 0.85).toFixed(2));

 await database.ref(`KotukPay/user/${YOUR_LOGIN}/money`)
 .transaction(currentValue => currentValue + receiverAmount);

 return true; // Успех
 } catch (error) {
 console.error('Ошибка при обработке доната:', error);
 return false;
 }
}

// Пример использования:
// get_donate('user_login', 'user_password', 100)
// .then(result => {
// if (result) {
// console.log('Донат успешно обработан');
// } else {
// console.log('Ошибка при обработке доната');
// }
// });
