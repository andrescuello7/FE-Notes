const formUser = document.getElementById('formUser');
const inputUno = document.getElementById('uno');
const inputDos = document.getElementById('dos');
const divisionInput = document.getElementById('division');
const inputUl = document.getElementById('ul');
const button = document.getElementById('button');
const boton = document.getElementById('boton');
const usersTable = document.getElementById('usersTable');
const icon= document.getElementById('body');
const icono= document.getElementById('icono');
const crearElement= document.getElementById('crear');
const users = [];




function color(){
    console.log('me diste un clik')
    let bg= icon.style.background;
    if(bg == "black") {
        icon.style.background="white";
    } else{
        icon.style.background="black";
    }
}

const generateId = function () {
    return '_' + Math.random().toString(36).substr(2, 9);
};

button.onclick = (e) => {
    e.preventDefault();
    if (!inputUno.value) 
    return alert('Ingresa algo facha!')

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const Uno = inputUno.value;
    const Dos = inputDos.value;
    const division = divisionInput.value;

    users.push({
        Uno: Uno,
        Dos: Dos,
        division: division,
        id: generateId(),
        createdAt: Date.now()
    })
    const usersJson = JSON.stringify(users);
    localStorage.setItem('users', usersJson);

    console.log("Funciona", users);
    formUser.reset();
    displayUser();
}
function papi(){
    // formUser.style.color= 'green';
    // crearElement.style.background ='none';
    // const osa=`<p>Hola como estas</p>`
}
function displayUser() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const rows = [];
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        const createdAt = new Date(user.createdAt)
        const tr = `
        <form >
            <div class="formularioDeOrigen"> 
            <p class="hl"><b>${user.division}</b></p>
            <h5 class="tituloo">${user.Uno  || ''}</h5>
            <br>
            <div class="origen">
              <button type="button" class="btn btn-info" data-toggle="modal" data-target="#modal${user.id}">Mostrar</button>
              <button onclick="deleteUser('${user.id}')" class="btn btn-danger">Eliminar</button>
            </div>
            </div>

            <!-- Modal -->
                <div class="modal fade" id="modal${user.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title" id="exampleModalLabel">${user.Uno}</h4>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <p> ${user.Dos}</p>
                            </div>
                            <div id="datee" class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                                <p class="data">Fecha: ${createdAt.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                </div>
        </form>`
        rows.push(tr)
    }
    usersTable.innerHTML = rows.join('')
}
displayUser();

function deleteUser(userId) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const filteredUsers = users.filter((user) => user.id !== userId);
    const usersJson = JSON.stringify(filteredUsers);
    localStorage.setItem('users', usersJson);
    displayUser();
}

