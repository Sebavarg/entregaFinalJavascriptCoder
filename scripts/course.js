const userInfo = JSON.parse(localStorage.getItem('userInfo'));
//Genera una bienvenida personalizada y llama a la funcion que va a usar los Datos recibidos en el Local Storage
function createWelcome() {
    const header = document.querySelector('.mainCourse');
    const title = document.createElement('h1');
    const text = document.createTextNode(`Bienvenido profesor: ${userInfo.userName} al curso: ${userInfo.courseName} `)
    title.appendChild(text);
    header.insertBefore(title, header.childNodes[0]);
    userInfoHandler();
}
createWelcome();

function Student(name, lastName, score) {
    this.name = name;
    this.lastName = lastName;
    this.score = score;
}

//recibe la informacion del nombre del curso y revisa si ya hay un curso guardado en el Local Storage y llama al Creador de Estudiantes
function userInfoHandler() {
    const studentsList = document.getElementById("studentsList");
    const students = JSON.parse(localStorage.getItem(userInfo.courseName));

    if (students == null) {
        studentsList.innerHTML = "<h4> Aun no has añadido estudiantes al curso</h4>"
    } else {
        showStudents(students);
    }
    createCourse();
}

// Genera el form para agregar los estudiantes al curso.
function createCourse() {
    const courseAdd = document.getElementById("courseAdded");

    courseAdd.innerHTML = `<h3>Usuario: ${userInfo.userName} Curso: ${userInfo.courseName}</h3>
    <form id="form-add-student">
      <input type="text" id="studentName" placeholder="Nombre alumno">
      <input type="text" id="studentLastName" placeholder="Apellido alumno">
      <input type="number" id="studentScore" placeholder="Nota "> 
      <button type="submit">Agregar estudiante a la lista</button>
    </form>`;

    document.getElementById('form-add-student').addEventListener('submit', addStudents);
}

//agrega los estudiantes tomando los datos aportados en el form

function addStudents(e) {
    e.preventDefault();
    const studentName = document.getElementById("studentName").value;
    const studentLastName = document.getElementById("studentLastName").value;
    const score = document.getElementById("studentScore").value;

    const student = new Student(studentName, studentLastName, score);

    fieldValidation(student);

    const studentsSavedStorage = JSON.parse(localStorage.getItem(userInfo.courseName));

    if (studentsSavedStorage == null) {
        localStorage.setItem(userInfo.courseName, JSON.stringify([student]));
        showStudents([student]);
    } else {
        studentsSavedStorage.push(student);
        localStorage.setItem(userInfo.courseName, JSON.stringify(studentsSavedStorage));
        showStudents(studentsSavedStorage);
    }
    e.target.reset();
}

//valida los campos ingresados
function fieldValidation(student) {
    (student.studentName == "" || student.studentLastName == "") ? swal("!", "Estudiante no creado correctamente", "error"): swal("Bien hecho!", "Estudiante Agregado", "success");
}

//muestra la lista de estudiantes ingresados
function showStudents(students) {
    let studentsList = document.getElementById('studentsList')
    studentsList.innerHTML = '';

    students.forEach(student => {
        let li = document.createElement('li');
        li.innerHTML = `
        <hr> Estudiante Nombre: ${student.name} - ${student.lastName} - Nota:
        ${student.score}     `;
        const deleteBtn = deleteBtncreation(student);
        li.appendChild(deleteBtn);
        studentsList.appendChild(li);
    })
}

function deleteBtncreation(student) {
    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = "Borrar Estudiante";
    let deletedStudent = student.name + ' ' + student.lastName;
    deleteBtn.addEventListener('click', () => {
        deleteStudent(student);
        swal({
            title: "Eliminado",
            text: "Haz Eliminado a " + borrado,
            icon: "warning",
            dangerMode: true,
        })
    });
    return deleteBtn;
}


function deleteStudent(student) {
    const studentsSavedStorage = JSON.parse(localStorage.getItem(userInfo.courseName));
    const newArray = studentsSavedStorage.filter(item => item.nombre != student.studentName);
    localStorage.setItem(userInfo.courseName, JSON.stringify(newArray));
    showStudents(newArray);
}



// document.getElementById("btnObtenerEscala").addEventListener("click", manejadorEscala);

// function manejadorEscala(e) {
//     e.preventDefault();
//     let puntaje = document.getElementById("puntaje").value;
//     let notaMin = (puntaje * 0.5) / 10;
//     let notaMax = (puntaje * 1.5) / 10;
//     let resultado;
//     let listaResultado = [];

//     for (let i = 1; i < 11; i++) {
//         notaMin = (puntaje * (i - 0.5)) / 10;
//         if (i == 1) {
//             notaMin = 0;
//         }
//         notaMax = ((puntaje * (i + 0.5)) / 10) - 0.1;
//         if (i == 10) {
//             notaMax = puntaje;
//         }
//         resultado = "La nota " + i + " es desde " + notaMin + " puntos hasta " + notaMax + " puntos ";
//         listaResultado.push(resultado);
//     }
//     let containerEscala = document.getElementById("containerEscala");
//     containerEscala.innerHTML = `<hr> 
//     <p> ${listaResultado.join("--//--")}</p> `;
//     swal("Escala Creada!", "A continuación puede ver una lista con la escala de notas del 1 al 10 tomando como base el puntaje ingresado", "success")

// }