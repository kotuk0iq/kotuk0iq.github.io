function install(filePath) {
    try{
        const link = document.createElement('a');
        link.href = filePath;
        link.download = filePath.split('/').pop(); // извлекаем имя файла из пути
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (Except e){
        console.log(e)
    }
}