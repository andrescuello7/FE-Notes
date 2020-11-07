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
const everyTime= document.getElementById('todo');
const mostrarUI= document.getElementById('mostrar');
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
        createdAt: Date.now(),
        everyTime: everyTime
    })
    const usersJson = JSON.stringify(users);
    localStorage.setItem('users', usersJson);

    console.log("Funciona", users);
    formUser.reset();
    displayUser();
}

function displayUser() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const rows = [];
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        const createdAt = new Date(user.createdAt)
        const tr = `
        <form >
                    <!-- Esto es otra cosa -->

                <div class="formularioDeOrigen"> 
                <p class="hl"><b>${user.division}</b></p>
                <h5 class="tituloo">${user.Uno  || ''}</h5>
                <br>
                <div class="origen">
                <button type="button" class="btn btn-info" data-toggle="modal" data-target="#modal${user.id}"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-chat-right-text-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M16 2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h9.586a1 1 0 0 1 .707.293l2.853 2.853a.5.5 0 0 0 .854-.353V2zM3.5 3a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 2.5a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 2.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5z"/>
                </svg></button>
                <button onclick="deleteUser('${user.id}')" class="btn btn-danger"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
                </svg></button>
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
                                <textarea class="form-control" id="dos" rows="3" maxlength="500" placeholder="Ingrese Tarea"> ${user.Dos}</textarea>
                            </div>
                            <div id="datee" class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Guardar Cambios</button>
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
