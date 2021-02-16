/* variable para Resguardar el seteo de usuario cuando requiere recordar Usuario*/
let rememberUser = false;

function validateEmail() {
    if (this.value != "") {
        let re = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
        if (!re.exec(this.value)) {
            this.value = ""
            this.setAttribute("placeholder", "Formato Email Incorrecto")
            this.setAttribute("style", "border-color:red")
            return false;
        } else {
            this.setAttribute("placeholder", "Email")
            this.setAttribute("style", "border-color:#dbe2e8")
            activateBtnLogin()
        }
    }
}

function validateLogin() {
    let email = document.getElementById("useremailLogin")
    let pass = document.getElementById("userPassLogin")

    if (pass.value.trim() == " ") {
        pass.value = ""
        pass.setAttribute("placeholder", "Ingrese Nuevamente su Password")
        pass.setAttribute("style", "border-color:red")
    } else {
        if ((email.value == ActiveUser.email) && (pass.value == ActiveUser.password)) {
            pass.setAttribute("placeholder", "Password")
            pass.setAttribute("style", "border-color:#dbe2e8")
            if (rememberUser) {
                saveStorageUser()                 
                /*window.location="file:///C:/Users/Pablo/OneDrive/coderhouse/Site/SIte/ecommerce/index.html"*/
            } else {
                console.log(ActiveUser)
                console.log(pass.value)
                alert("NO SON IGUALES")
                
                /*Visualizo Error*/

                let nuevoNodo  = document.createElement("p") 
                let nodoUsuarioTexto = document.createTextNode("Usuario o Password Incorrectos, por favor pruebe nuevamente.") 
                nuevoNodo.appendChild(nodoUsuarioTexto)

                document.getElementById("viewErrorLogin").appendChild(nuevoNodo)

                nuevoNodo.setAttribute("id", "mensajeError") 
                nuevoNodo.setAttribute("class","text-danger" )

            }
        }
    }
}

    function saveStorageUser() {
        /*Guarado la Informacion  en el Storage para luego utilizarla*/
        localStorage.setItem("User", JSON.stringify(ActiveUser))
    }

    function validateRemeberUser() {
        if (this.checked) {
            rememberUser = true;
        } else {
            rememberUser = false;
        }
    }

    /* Quito la propiedad para poder volver a activar el boton */
    function activateBtnLogin() {
        let btnIngresar = document.getElementById("btnUserLogin")
        btnIngresar.removeAttribute('disabled')
    }

    /* Genero el Evento de validacion de email si el mismo esta cargado */
    document.getElementById("useremailLogin").addEventListener("blur", validateEmail)

    /* Genero el Evento de ingreso con email y Password */
    document.getElementById("btnUserLogin").addEventListener("click", validateLogin)

    /*Genero el Evento de seteo de recordar Usuarioy guardo el valor en una variable*/
    document.getElementById("remember_me").addEventListener("change", validateRemeberUser)