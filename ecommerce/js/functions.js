/* variable para Resguardar el seteo de usuario cuando requiere recordarlo*/
let rememberUser = false;
/* variable para Concatear todos los Errores validados*/
let varErrores = ""

function validateEmail(e) {
    /*console.log("Invocado del elemento HTML : " + e.target.id)*/
    if (this.value != "") {
        let re = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
        if (!re.exec(this.value)) {
            /*Reutilizo la Funcion para dos componentes input del mismo tipo(email) en el mismo HTML*/
            switch (e.target.id) {
                case "useremailLogin":
                    this.value = ""
                    this.setAttribute("placeholder", "Formato Email Incorrecto")
                    this.setAttribute("style", "border-color:red")
                    break
                case "reg-email":
                    /*desarrollar los cambios de este input */
                    this.value = ""
                    this.setAttribute("placeholder", "Formato Email Incorrecto")
                    this.setAttribute("style", "border-color:red")
                    break
            }
        } else {
            switch (e.target.id) {
                case "useremailLogin":
                    this.setAttribute("placeholder", "Email")
                    this.setAttribute("style", "border-color:#dbe2e8")
                    activateBtnLogin()
                    break
                case "reg-email":
                    /*desarrollar los cambios de este input */
                    this.setAttribute("placeholder", "Email")
                    this.setAttribute("style", "border-color:#dbe2e8")
                    activateBtnCheckIn()
                    break
            }
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
                window.location = "file:///C:/Users/Pablo/OneDrive/coderhouse/Site/SIte/ecommerce/index.html"
            } else {
                localStorage.clear()
                window.location = "file:///C:/Users/Pablo/OneDrive/coderhouse/Site/SIte/ecommerce/index.html"
            }
        } else {
            /*Visualizo el Error ademas de ver que No exista ya creado */
            let nodoPadre = document.getElementById("viewErrorLogin")

            if (!document.getElementById("mensajeError")) {

                let nuevoNodo = document.createElement("p")
                let nodoUsuarioTexto = document.createTextNode("Usuario o Password Incorrectos, por favor pruebe nuevamente.")
                nuevoNodo.appendChild(nodoUsuarioTexto)
                document.getElementById("viewErrorLogin").appendChild(nuevoNodo)
                nuevoNodo.setAttribute("id", "mensajeError")
                nuevoNodo.setAttribute("class", "text-danger")
            }
        }
    }
}

function resetControlEmail() {

    let email = document.getElementById("useremailLogin")
    let nodoPadre = document.getElementById("viewErrorLogin")
    email.setAttribute("placeholder", "Email")
    email.setAttribute("style", "border-color:#dbe2e8")
    email.value = ""
    if (document.getElementById("mensajeError")) {
        let nodohijo = document.getElementById("mensajeError")
        nodoPadre.removeChild(nodohijo)
    }
}

function resetControlPass() {
    let pass = document.getElementById("userPassLogin")
    let nodoPadre = document.getElementById("viewErrorLogin")
    pass.setAttribute("placeholder", "Password")
    pass.setAttribute("style", "border-color:#dbe2e8")
    pass.value = ""
    if (document.getElementById("mensajeError")) {
        let nodohijo = document.getElementById("mensajeError")
        nodoPadre.removeChild(nodohijo)
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
function activateBtnCheckIn() {
    let btnIngresar = document.getElementById("checkIn")
    btnIngresar.removeAttribute('disabled')
}
function validateResgistrationForm() {
    let name = document.getElementById("regName").value
    let lastName = document.getElementById("regLastName").value
    let email = document.getElementById("reg-email").value
    let province = document.getElementById("regProvince")
    let textSelected = province.options[province.selectedIndex].text
    let codSelected = document.getElementById("regProvince").value
    let cel = document.getElementById("reg-phone").value
    let privatePhone = document.getElementById("reg-phone-private").value
    let pass = document.getElementById("reg-pass").value
    let passConfirm = document.getElementById("reg-pass-confirm").value

    if (name == "") {
        varErrores = "-Debe Ingresar sus Nombres "
    }
    if (lastName == "") {
        varErrores = varErrores + "<br>" + "-Debe Ingresar su Apellido "
    }
    if (email == "") {
        varErrores = varErrores + "<br>" + "-Debe Ingresar su Email "
    }
    if (codSelected == 0) {
        varErrores = varErrores + "<br>" + "-Debe Seleccionar una Provincia"
    }
    if (cel == "") {
        varErrores = varErrores + "<br>" + "-Debe Ingresar su Numero Celular "
    }
    if (privatePhone == "") {
        varErrores = varErrores + "<br>" + "-Debe Ingresar su Telefono Particular "
    }
    if (pass == "") {
        varErrores = varErrores + "<br>" + "-Debe Ingresar una Password "
    } else {
        if (!validar_clave(pass)) {
            varErrores = varErrores + "<br>" + " - La Password debe contener las siguentes caracteristicas: " + "<br>" + "-Tiene ocho caracteres como mínimo." + "<br>" + "-Letras mayúsculas." + "<br>" + "-Letras minúsculas." + "<br>" + "-Números." + "<br>" + "-Símbolos del teclado (todos los caracteres del teclado que no se definen como letras o números) y espacios."
        }
    }
    if (passConfirm == "") {
        varErrores = varErrores + "<br>" + "-Debe Ingresar  el campo Confirmar Password "
    } else {
        if (pass.trim() != passConfirm.trim()) {
            varErrores = varErrores + "<br>" + "-Las Password NO Coinciden, por favor ingreselas nuevamente ! "
        }
    }
    if (varErrores != "") {
        /*Generar el  Contenido para visualziar los errores*/
        let nuevoNodo = document.createElement("p")
        let nodoUsuarioTexto = document.createTextNode(varErrores)
        nuevoNodo.appendChild(nodoUsuarioTexto)
        document.getElementById("divReportValidations").appendChild(nuevoNodo)
        nuevoNodo.setAttribute("class", "text-danger")
        nuevoNodo.setAttribute("id", "reportValidations")
        showModal()
    } else {
        /*Cargo el nuevo usuario Como Objeto*/
        const ActiveUser = new User(name, lastName, email, cel, privatePhone, pass, province, 0)
        saveNewUser(ActiveUser)
    }
}

function saveNewUser(newUser) {
    console.log("Se ha registrado de Forma OK el Usuario ")
    console.log(newUser)
}

/*Manejo de Modal de Errores*/
function showModal() {
    document.getElementById('openModal').style.display = 'block';
}
function CloseModal() {
    document.getElementById('openModal').style.display = 'none';
    let nodoPadre = document.getElementById("divReportValidations")
    varErrores = ""
    let nodohijo = document.getElementById("reportValidations")
    nodoPadre.removeChild(nodohijo)
}
function validar_clave(contrasenna) {
    if (contrasenna.length >= 8) {
        var mayuscula = false;
        var minuscula = false;
        var numero = false;
        var caracter_raro = false;

        for (var i = 0; i < contrasenna.length; i++) {
            if (contrasenna.charCodeAt(i) >= 65 && contrasenna.charCodeAt(i) <= 90) {
                mayuscula = true;
            } else if (contrasenna.charCodeAt(i) >= 97 && contrasenna.charCodeAt(i) <= 122) {
                minuscula = true;
            } else if (contrasenna.charCodeAt(i) >= 48 && contrasenna.charCodeAt(i) <= 57) {
                numero = true;
            } else {
                caracter_raro = true;
            }
        }
        if (mayuscula == true && minuscula == true && caracter_raro == true && numero == true) {
            return true;
        }
    }
    return false;
}



/*--------------------------------------------Nuevo Eventos para el Login----------------------------------*/
/* Genero el Evento de validacion de email si el mismo esta cargado */
document.getElementById("useremailLogin").addEventListener("blur", validateEmail)
document.getElementById("useremailLogin").addEventListener("click", resetControlEmail)
/* Genero el Evento de ingreso con email y Password */
document.getElementById("btnUserLogin").addEventListener("click", validateLogin)
/* Genero el Evento Input Pass para resetearlo en caso de error */
document.getElementById("userPassLogin").addEventListener("click", resetControlPass)
/*Genero el Evento de seteo de recordar Usuarioy guardo el valor en una variable*/
document.getElementById("remember_me").addEventListener("change", validateRemeberUser)


/* -----------------------------------Nuevos Eventos para Resgistracion--------------------------------------*/
/* Genero el Evento de validacion de email si el mismo esta cargado */
document.getElementById("reg-email").addEventListener("blur", validateEmail)
document.getElementById("checkIn").addEventListener("click", validateResgistrationForm)