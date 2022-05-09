// Captura de formulario y sus respectivos label.
const formulario = document.querySelector(".formulario")
const campoNombre = document.getElementById("name");
const campoApellido = document.getElementById("last");
const campoEmail = document.getElementById("email");
const campoPw = document.getElementById("pw");
const campoRepeatPw = document.getElementById("repeat-pw");
// Capturo las etiquetas small vacias que mostrarán los errores en caso de no pasar las validaciones.
const erroresName = document.getElementById("mensajeErrorName");
const erroresLast = document.getElementById("mensajeErrorLast");
const erroresEmail = document.getElementById("mensajeErrorEmail");
const erroresPw = document.getElementById("mensajeErrorPw");
const erroresPw2 = document.getElementById("mensajeErrorPw2");


// Stop submit para poder capturar los datos ingresados por el cliente en los campos. Array que contiene errores.
formulario.addEventListener("submit", function (e) {
    e.preventDefault();
    let errores = [];

    // Validacion nombre.
    if (campoNombre.value == "") {
        errores.push({
            input: "nombreVacio",
            error: "Este campo es obligatorio"
        });
    } else if (campoNombre.value.length <= 2) {
        errores.push({
            input: "nombreCorto",
            error: "Ingrese su nombre completo, no se admiten iniciales"
        });
        
    } else if (campoNombre.value == null) {
        errores.push({
            input: "nombreInvalido",
            error: "Nombre inválido, ingrese únicamente letras"
        });
    }
    //Validacion apellido
    if (campoApellido.value == "") {
        errores.push({
            input: "apellidoVacio",
            error: "Este campo es obligatorio"
        });
    } else if (campoApellido.value == null) {
        errores.push({
            input: "apellidoInvalido",
            error: "Apellido inválido, ingrese únicamente letras"
        });
    }else if (campoApellido.value.length <= 2) {
        errores.push({
            input: "apellidoCorto",
            error: "Ingrese su apellido completo, no se admiten iniciales"
        });
    }
    // Validacion email.
    
    let emailRegex = /^\w+([\.\+\-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;


    if (campoEmail.value == "") {
        errores.push({
            input: "emailVacio",
            error: "Este campo es obligatorio"
        });
    } else if (emailRegex.test(campoEmail.value) == false) {
        errores.push({
            input: "emailInvalido",
            error: "Ingrese un mail válido"
        });
    } 
    
    //Validacion password.

    /* let passRegex = /^(?=.\d)(?=.[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,16}$/.test(campoPw); */
    
/*     (!inputPass.value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,16}$/)) */


    if (campoPw.value.length < 6 || campoPw.value.length > 15){
        errores.push({
            input: "pwInvalida",
            error: "La contraseña debe tener minimo 6 caracteres y máximo 15"
        });
    } else if (campoPw.value == ""){
        errores.push({
            input: "pwVacia",
            error: "Este campo es obligatorio"
        })
    }

    // Validacion repeat pw.

    if (campoRepeatPw.value == "") {
        errores.push({
            input: "repeatPwInvalida",
            error: "Este campo es obligatorio"
        })
    } else if (campoRepeatPw.value !== campoPw.value) {
        errores.push({
            input: "pwDistintas",
            error: "Las contraseñas no coinciden"
        })
    } 

    if (errores.length !== 0) {
        errores.forEach(function (e) {
            switch (e.input) {
                case "nombreVacio":
                    erroresName.innerText = e.error;
                    break;
                case "nombreCorto":
                    erroresName.innerText = e.error;
                    break;
                case "nombreInvalido":
                    erroresName.innerText = e.error;
                    break;
                case "nombreOk":
                    erroresName.innerText = e.error;
                    break;
                
                case "apellidoVacio":
                    erroresLast.innerText = e.error;
                    break;
                case "apellidoInvalido":
                    erroresLast.innerText = e.error;
                    break;
                case "apellidoCorto":
                    erroresLast.innerText = e.error;
                    break;
                case "apellidoOk":
                    erroresLast.innerText = e.error;
                    break;
                
                case "emailVacio":
                    erroresEmail.innerText = e.error;
                    break;
                case "emailInvalido":
                    erroresEmail.innerText = e.error;
                    break;
                case "emailOk":
                    erroresEmail.innerText = e.error;
                    break;
                
                case "pwInvalida":
                    erroresPw.innerText = e.error;
                    break;
                case "pwVacia":
                    erroresPw.innerText = e.error;
                    break;
                case "pwOk":
                    erroresPw.innerText = e.error;
                    break;
                
                case "repeatPwInvalida":
                    erroresPw2.innerText = e.error;
                    break;
                case "pwDistintas":
                    erroresPw2.innerText = e.error;
                    break;
                case "repeatPwOk":
                    erroresPw2.innerText = e.error;
                    break;
            }
        });
    } if (errores.length === 0) {
        /* formulario.submit(); */
        const data = {
            firstName: campoNombre.value,
            lastName: campoApellido.value,
            email: campoEmail.value,
            password: campoPw.value,
    }
        console.log(data);
        const settingsCreateUser = {
            method: "POST",
            headers:{
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        }
        fetch("https://ctd-todo-api.herokuapp.com/v1/users", settingsCreateUser)
            .then(function (response) {
                console.log(response.status);
                if (response.status === 201) {
                    alert("El usuario fue creado satisfactoriamente");
                    window.location.href = "./index.html";
                } else if (response.status === 400){
                    alert("El usuario ya se encuentra registrado");
                }
                return response.json();
            })
            .then(function (info) {
                console.log(info);
                sessionStorage.setItem("token", info.jwt);
                /* formulario.submit(); */
                /*  */

            })
            .catch(function (e) {
                console.log("Error! " + e);
            })
    }

    
});



