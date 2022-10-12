//escuchador del login, persiste los datos del usuario en el Local Storage
document.getElementById("boton").addEventListener('click', () => {
    userName = document.getElementById("userName").value;
    courseName = document.getElementById("courseName").value;
    const userInfo = {
        userName: userName.toUpperCase(),
        courseName: courseName.toUpperCase(),
    }
    localStorage.setItem('userInfo', JSON.stringify(userInfo))
    console.log(userInfo);
})