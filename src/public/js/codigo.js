async function login(e){
    e.preventDefault();

    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();
    let mensajes = document.getElementById("mensajes");

    if(!email || !password){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Debe completar ambos campos",
        });
        return;
    }

    let body = {
        email,
        password
    }

    try {
        let respuesta = await fetch("/api/session/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        });
        
        if(respuesta.ok) {
            let info = await respuesta.json();
            //mensajes.innerHTML = "";
            mensajes.innerHTML += `<h1>Bienvenido ${info.usuario.first_name} </h1>`;
        } else {
            console.error("Error en la solicitud:", respuesta.status);
            mensajes.innerHTML = "";
            mensajes.innerHTML += info;
        }
    }
    catch(error){
        console.error(error.message,"Desde linea 33 de codigo.js")
    }
}

const registro = async (e) => {
    e.preventDefault();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();
    let nombre = document.getElementById("nombre").value.trim();
    let apellido = document.getElementById("apellido").value.trim();
    let edad = document.getElementById("edad").value.trim();

    if(!email || !password){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Debe completar ambos campos",
        });
        return;
    }

    const body = {nombre, apellido, edad, email, password};

    try {
        let respuesta = await fetch("api/session/registro",{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        });

        if(respuesta.ok){
            let resultado = await respuesta.json();
            window.location.href = "/";
        } else {
            console.error(response.status, "Error en el servidor");
        }

    }
    catch(error){
        console.error(error.message,"linea 64 codigo.js");
    }
}
