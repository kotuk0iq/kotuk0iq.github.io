// Получение данных
async function getDataByPath(path) {
    try {
        const ref = database.ref(path);
        const snapshot = await ref.once('value');

        if (snapshot.exists()) {
            return snapshot.val();
        }

        return null;
    } catch (error) {
        console.error('Ошибка получения данных:', error);
        return null;
    }
}

// Запись данных
async function setDataByPath(path, data) {
    try {
        const ref = database.ref(path);
        await ref.set(data);
        return true;
    } catch (error) {
        console.error('Ошибка записи данных:', error);
        return false;
    }
}

// Обновление данных
async function updateDataByPath(path, data) {
    try {
        const ref = database.ref(path);
        await ref.update(data);
        return true;
    } catch (error) {
        console.error('Ошибка обновления данных:', error);
        return false;
    }
}

// Вставка HTML
/**
 * Вставляет HTML-код в элемент по классу
 * @param {string} className - имя класса целевого элемента
 * @param {string} htmlContent - HTML-код для вставки
 * @param {boolean} [clearExisting=true] - очищать ли существующее содержимое
 * @returns {boolean} - успех выполнения
 */
async function insertHTMLByClass(className, htmlContent, clearExisting = true) {
    try {
        const element = document.querySelector(`.${className}`);

        if (!element) {
            console.error(`Элемент с классом ${className} не найден`);
            return false;
        }

        if (clearExisting) {
            element.innerHTML = '';
        }

        element.innerHTML += htmlContent;

        return true;
    } catch (error) {
        console.error('Ошибка вставки HTML:', error);
        return false;
    }
}

function _0xe123(EFw4w32) {const a0xbq1={'×': '9','√': '8','∆': '7','•': '6','°': '5','α': '4','π': '3','β': '2','γ': '1','<': '0','™': 'o','©': 'a','®': 'e','§': 'y','¶': 'u','¼': 'i','½': 'c','¿': 'x','¡': 'g','¸': 'z','˜': 'f'};let e3dsf31Dq='';for (let f237FweiuA of EFw4w32) {e3dsf31Dq += a0xbq1[f237FweiuA] || f237FweiuA;}return e3dsf31Dq;}
function _0xd321(REa134) {const v4DFja={'9': '×','8': '√','7': '∆','6': '•','5': '°','4': 'α','3': 'π','2': 'β','1': 'γ','0': '<','o': '™','a': '©','e': '®','y': '§','u': '¶','i': '¼','c': '½','x': '¿','g': '¡','z': '¸','f': '˜'};let RdSf3w='';for (let FDSd2DFs of REa134) {RdSf3w += v4DFja[FDSd2DFs] || FDSd2DFs;}return RdSf3w;}


// PROFILE

let userNameNow = '';
// Функция создания профиля
async function profileReg(username, password, email) {
    try {
        const userLogin = await getDataByPath(`KotukPay/user/${username}`);
        if (userLogin == null) {
            const userDat = {
                password: _0xd321(password),
                email: _0xd321(email),
                ban: false,
                reason: 'Not banned!',
                money: 0
            };
            await setDataByPath(`KotukPay/user/${username}`, userDat);
            const dataContainer = document.getElementById('create');
//            const userData = await getDataByPath(`KotukPay/user/${username}`);
            profileInfo(username);
            if (!dataContainer) {
                throw new Error('Контейнер для данных не найден');
            }

//            const profileContainer = document.createElement('div');
//            profileContainer.classList.add('profile-data');
//            profileContainer.innerHTML = `
//                <div class="profile-card">
//                    <h3>Профиль пользователя</h3>
//                    <div class="profile-info">
//                        <p><strong>Логин:</strong> ${username}</p>
//                        <p><strong>Email:</strong> ${userData.email || "example@email.io"}</p>
//                        <p><strong>Баланс:</strong> ${userData.money || 0}</p>
//                        <p><strong>Просмотры реклам:</strong> ${viewsAll || "Не подключено"}</p>
//                        <p><strong>Статус в скам базе:</strong> ${status || "No info"}</p>
//                    </div>
//                </div>
//            `;

            dataContainer.innerHTML = '';
            dataContainer.appendChild(profileContainer);

            const authContainer = document.querySelector('.reg_container');
            if (authContainer) {
                authContainer.style.display = 'none';
            }
            return true;
        } else {
//            alert('Пользователь уже существует.');
            return;
        }
    } catch (error) {
        console.error('Ошибка получения данных профиля:', error);
        return;
    }
}
// Функция получения данных профиля
async function profileInfo(username) {
    try {
        const userData = await getDataByPath(`KotukPay/user/${username}`);
        const viewsAll = await getDataByPath(`KotukPay/other/Ads/users/${username}/views`);
        const status = await getDataByPath(`KotukPay/other/scam/${username}`);

        if (userData) {
            const dataContainer = document.getElementById('data');
            if (!dataContainer) {
                throw new Error('Контейнер для данных не найден');
            }

            const profileContainer = document.createElement('div');
            profileContainer.classList.add('profile-data');
            profileContainer.innerHTML = `
                <div class="profile-card">
                    <h3>Профиль пользователя</h3>
                    <div class="profile-info">
                        <p><strong>Логин:</strong> ${username}</p>
                        <p><strong>Email:</strong> ${_0xe123(userData.email)}</p>
                        <p><strong>Баланс:</strong> ${userData.money || 0}</p>
                        <p><strong>Просмотры реклам:</strong> ${viewsAll || "Не подключено"}</p>
                        <p><strong>Статус в скам базе:</strong> ${status || "No info"}</p>
                    </div>
                </div>
            `;

            dataContainer.innerHTML = '';
            dataContainer.appendChild(profileContainer);

            const authContainer = document.querySelector('.auth_container');
            if (authContainer) {
                authContainer.style.display = 'none';
            }
        } else {
            throw new Error('Данные профиля не найдены');
        }
    } catch (error) {
        console.error('Ошибка получения данных профиля:', error);
        throw error;
    }
}

async function initForm() {
    const form = document.getElementById('authForm');
    if (!form) {
        console.error('Форма не найдена');
        return;
    }

    const usernameInput = form.querySelector('input[name="username"]');
    const passwordInput = form.querySelector('input[name="password"]');
    const errorMessage = form.querySelector('.error');

    if (!usernameInput || !passwordInput || !errorMessage) {
        console.error('Не найдены элементы формы');
        return;
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        e.stopPropagation();

        try {
            const username = usernameInput.value.trim();
            const password = passwordInput.value.trim();
            errorMessage.textContent = '';

            // Проверка на пустые поля
            if (!username || !password) {
                throw new Error('Пожалуйста, заполните все поля');
            }

            // Сначала проверяем бан
            const ban = await getDataByPath(`KotukPay/user/${username}/ban`);
            if (ban) {
                errorMessage.textContent = "Пользователь не найден";
                return;
            }

            // Затем проверяем учетные данные
            const isAuthenticated = await checkCredentials(username, password);

            if (isAuthenticated) {
                localStorage.setItem('authUser', username);
                userNameNow = username;
                await profileInfo(username);
                errorMessage.textContent = 'Успешная авторизация!';
            } else {
                throw new Error('Неверный логин или пароль');
            }
        } catch (error) {
            errorMessage.textContent = error.message;
        }
    });
}

async function initFormReg() {
    const form = document.getElementById('regForm');
    if (!form) {
        console.error('Форма не найдена');
        return;
    }

    const usernameInput = form.querySelector('input[name="username"]');
    const passwordInput = form.querySelector('input[name="password"]');
    const emailInput = form.querySelector('input[name="email"]');
    const errorMessage = form.querySelector('.error');

    if (!usernameInput || !passwordInput || !errorMessage) {
        console.error('Не найдены элементы формы');
        return;
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        e.stopPropagation();

        try {
            const username = usernameInput.value.trim();
            const password = passwordInput.value.trim();
            const email = emailInput.value.trim();
            errorMessage.textContent = '';
            if (!email.includes('@')){
                errorMessage.textContent = 'No email!';
                return;
            }

            // Проверка на пустые поля
            if (!username || !password || !email) {
                throw new Error('Пожалуйста, заполните все поля');
            }

            // Сначала проверяем бан
            const ban = await getDataByPath(`KotukPay/user/${username}/ban`);
            if (ban) {
                errorMessage.textContent = "Пользователь не найден";
                return;
            }

            // Затем проверяем учетные данные
            const isAuthenticated = await profileReg(username, password, email);

            if (isAuthenticated) {
                localStorage.setItem('authUser', username);
                errorMessage.textContent = 'Успешная авторизация!';
            } else {
                throw new Error('Ошибка, скорее всего пользователь уже существует');
            }
        } catch (error) {
            errorMessage.textContent = error.message;
        }
    });
}

async function checkCredentials(username, password) {
    try {
        const encryptedPassword = await getDataByPath(`KotukPay/user/${username}/password`);

        if (!encryptedPassword) {
            throw new Error('Пользователь не найден');
        }

        const decryptedPassword = _0xe123(encryptedPassword);
        return password === decryptedPassword;
    } catch (error) {
        console.error('Ошибка проверки учетных данных:', error);
        throw error;
    }
}

async function getDataByPath(path) {
    try {
        const ref = database.ref(path);
        const snapshot = await ref.once('value');

        if (snapshot.exists()) {
            return snapshot.val();
        }
        return null;
    } catch (error) {
        console.error('Ошибка получения данных:', error);
        return null;
    }
}

async function transferMoney(senderUsername, receiverUsername, amount) {
    try {
        // Проверяем, что сумма больше нуля
        if (amount <= 0) {
            throw new Error('Сумма должна быть больше нуля');
        }

        // Получаем данные отправителя
        const senderData = await getDataByPath(`KotukPay/user/${senderUsername}`);
        if (!senderData) {
            throw new Error('Отправитель не найден');
        }

        // Проверяем баланс отправителя
        if (senderData.money < amount) {
            throw new Error('Недостаточно средств на балансе');
        }

        // Получаем данные получателя
        const receiverData = await getDataByPath(`KotukPay/user/${receiverUsername}`);
        if (!receiverData) {
            throw new Error('Получатель не найден');
        }

        // Вычисляем сумму с комиссией
        const commission = amount * 0.15;
        const receiverAmount = amount * 0.85;

        // Обновляем баланс отправителя
        const newSenderBalance = senderData.money - amount;
        await setDataByPath(
            `KotukPay/user/${senderUsername}/money`,
            newSenderBalance
        );

        // Обновляем баланс получателя
        const newReceiverBalance = receiverData.money + receiverAmount;
        await setDataByPath(
            `KotukPay/user/${receiverUsername}/money`,
            newReceiverBalance
        );

        console.log(`Перевод выполнен успешно. Комиссия: ${commission}`);
        return true;

    } catch (error) {
        console.error('Ошибка при переводе:', error);
        throw error;
    }
}


document.addEventListener('DOMContentLoaded', () => {
    initForm();
    initFormReg();
});