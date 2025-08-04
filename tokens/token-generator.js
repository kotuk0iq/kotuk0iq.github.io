function generate() {
    const currentDate = new Date().toISOString()
        .slice(0, 19)
        .replace(/[:T]/g, '')
        .replace(/-/g, '_');

    const email = document.getElementById('email').value.trim();
    const product = document.getElementById('product').value.trim();
    const cost = document.getElementById('cost').value.trim();

    if (!email || !product) {
        alert('Заполните все обязательные поля');
        return;
    }

    const token = `kotuk_shop-${currentDate}-productID=${encodeURIComponent(product)}-email=${email}-cost=${cost}RUB`;
    document.getElementById('result').innerHTML = `Токен: ${token}`;
}
