/* variable para Resguardar el seteo de usuario cuando requiere recordarlo*/
let rememberUser = false;
/* variable para Concatear todos los Errores validados*/
let arrayErrorCheckIn = []
let arrayErrorPasswordFormat = []

//////////////////////////////////////////////////////Funciones Globales/////////////////////////////////////////////////////////
function crearNodos(tipoElemento, boleanTexto, textoElemento, nodoPadreParam, boleanAtributo, atributo) {
    let nuevoNodo = document.createElement(tipoElemento) //crea nodo ELEMENTO
    if (boleanTexto == true) {
        let nodoUsuarioTexto = document.createTextNode(textoElemento) //crea nodo TEXTO
        nuevoNodo.appendChild(nodoUsuarioTexto)
    }
    if (boleanAtributo == true) {
        let atribMap = atributo;
        for (let [key, value] of atribMap) {
            nuevoNodo.setAttribute(key, value)
        }
    }
    document.getElementById(nodoPadreParam).appendChild(nuevoNodo)
}

function anidarNodos(nodoPadre, nodoHijo) {
    let nodoHTMLPadre = document.getElementById(nodoPadre)
    let nodoHTMLHijo = document.getElementById(nodoHijo)
    // El primer parametro (nodo Padre) debe ser un String para conformar el lemento HTML, el segundo debe ser un objeto del tipo  HTMLElement
    document.getElementById(nodoPadre).appendChild(nodoHTMLHijo)
}

function eliminarNodos(nodoPadre, nodoHijo) {
    //ELIMINAR NODOS
    //let nodoAEliminar = document.getElementById(hijo)
    document.getElementById(nodoPadre).removeChild(nodoHijo)
}

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
/////////////////////////////////////////////////////Funciones de Gestion de Usuario/////////////////////////////////////////////////////////
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

function activateBtnLogin() {
    /* Quito la propiedad para poder volver a activar el boton */
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
        arrayErrorCheckIn.push("-Debe Ingresar sus Nombres ")
    }
    if (lastName == "") {
        arrayErrorCheckIn.push("-Debe Ingresar su Apellido")
    }
    if (email == "") {
        arrayErrorCheckIn.push("-Debe Ingresar su Email ")
    }
    if (codSelected == 0) {
        arrayErrorCheckIn.push("-Debe Seleccionar una Provincia")
    }
    if (cel == "") {
        arrayErrorCheckIn.push("-Debe Ingresar su Numero Celular ")
    }
    if (privatePhone == "") {
        arrayErrorCheckIn.push("-Debe Ingresar su Telefono Particular ")
    }
    if (pass == "") {
        arrayErrorCheckIn.push("-Debe Ingresar una Password ")
    }
    if (passConfirm == "") {
        arrayErrorCheckIn.push("-Debe Ingresar  el campo Confirmar Password ")
    } else {
        if (pass.trim() != passConfirm.trim()) {
            arrayErrorCheckIn.push("-Las Password NO Coinciden, por favor ingreselas nuevamente ! ")
        } else {
            if (!validar_clave(pass)) {
                arrayErrorPasswordFormat.push(" La Password debe contener las siguentes caracteristicas: ")
                arrayErrorPasswordFormat.push("-Tiene ocho caracteres como mínimo.")
                arrayErrorPasswordFormat.push("-Letras mayúsculas.")
                arrayErrorPasswordFormat.push("-Letras minúsculas.")
                arrayErrorPasswordFormat.push("-Números.")
                arrayErrorPasswordFormat.push("-Símbolos del teclado (todos los caracteres del teclado que no se definen como letras o números) y espacios.")
            }
        }
    }
    if (arrayErrorCheckIn != "") {
        /*Generar el  Contenido para visualziar los errores de todos los campos*/
        for (i = 0; i < arrayErrorCheckIn.length; i++) {

            let nuevoNodo = document.createElement("p")
            let nodoUsuarioTexto = document.createTextNode(arrayErrorCheckIn[i])
            nuevoNodo.appendChild(nodoUsuarioTexto)
            document.getElementById("divReportValidations").appendChild(nuevoNodo)
            nuevoNodo.setAttribute("class", "text-danger")
            nuevoNodo.setAttribute("id", "reportValidations" + [i])
        }
        showModal()

    } else {
        /*Generar el  Contenido para visualziar los errores del Formato de la Password*/
        if (arrayErrorPasswordFormat != "") {
            for (i = 0; i < arrayErrorPasswordFormat.length; i++) {
                let nuevoNodo = document.createElement("p")
                let nodoUsuarioTexto = document.createTextNode(arrayErrorPasswordFormat[i])
                nuevoNodo.appendChild(nodoUsuarioTexto)
                document.getElementById("divReportValidations").appendChild(nuevoNodo)
                nuevoNodo.setAttribute("class", "text-danger")
                nuevoNodo.setAttribute("id", "reportValidations" + [i])
            }
            showModal()
        } else {
            /*Cargo el nuevo usuario Como Objeto*/
            const ActiveUser = new User(name, lastName, email, cel, privatePhone, pass, province, 0)
            saveNewUser(ActiveUser)
        }
    }
}

function saveNewUser(newUser) {
    alert("Se ha registrado de Forma OK el Usuario ")
    console.log(newUser)
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
function showModal() {
    /*Manejo de Modal de Errores*/
    document.getElementById('openModalErrorregistration').style.display = 'block';
}

function CloseModal() {
    document.getElementById('openModalErrorregistration').style.display = 'none';
    let nodoPadre = document.getElementById("divReportValidations")
    /*Elimino las Etiquetas <P> creadas para ambos Tipos de Error*/
    if (arrayErrorCheckIn != "") {
        for (i = 0; i < arrayErrorCheckIn.length; i++) {
            let nodohijo = document.getElementById("reportValidations" + i)
            nodoPadre.removeChild(nodohijo)
        }
    }
    if (arrayErrorPasswordFormat != "") {
        for (i = 0; i < arrayErrorPasswordFormat.length; i++) {
            let nodohijo = document.getElementById("reportValidations" + i)
            nodoPadre.removeChild(nodohijo)
        }
    }
    /*Elimino los elementos de los ArrayS*/
    while (arrayErrorCheckIn.length) {
        arrayErrorCheckIn.pop();
    }
    while (arrayErrorPasswordFormat.length) {
        arrayErrorPasswordFormat.pop();
    }


    /*    arrayErrorCheckIn.length = 0;
        arrayErrorPasswordFormat=0;*/
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


///////////////////////////////////////////////////Funciones de Carrito/////////////////////////////////////////////////////////
function removeElementCart(idArrayPositionDelete, idDivElement) {

    let objectCartCurrent = localStorage.getItem('ShoppingCart');
    let shoppingCartCurrent = JSON.parse(objectCartCurrent);
    let elementDelete = document.getElementById("divThird-" + idDivElement)
    let footerDelete = document.getElementById("ShoppingToolbar-dropdown")
    let positionDelete = 0

    for (let i = 0; i < shoppingCartCurrent.length; i++) {
        if (idDivElement == shoppingCartCurrent[i].id) {
            positionDelete = i
        }
    }

    //Elimino del Array el Producto deseado 
    shoppingCartCurrent.splice(positionDelete, 1)
    //valido si el array esta vacio elimino el objeto del Storage
    if (shoppingCartCurrent.length > 0) {
        localStorage.setItem("ShoppingCart", JSON.stringify(shoppingCartCurrent))
        elementDelete.style.display = "none"
        CalcAmountPurchaseHeaderCart(shoppingCartCurrent)
        CalcAmountPurchaseFooterCart(shoppingCartCurrent)
    } else {
        localStorage.removeItem("ShoppingCart")
        //Oculto Elemento Footer del Div 
        footerDelete.style.display = "none"
        //Seteo los Valores del Header del Carrito
        CalcAmountPurchaseHeaderCart(shoppingCartCurrent)
    }

}
function BtnsHeaderCartMenu(count, amount) {
    let countElement = document.getElementById("CountProductCart")
    let amountElelemnt = document.getElementById("TotalPurchaseCart")
    let BtnHeaderCart = document.getElementById("BtnHeaderCart")

    countElement.textContent = count
    amountElelemnt.textContent = amount
    //Si esta vacio quito el  href
    if (count == 0) {
        BtnHeaderCart.href = "#"
    }
}
function CalcAmountPurchaseFooterCart(shoppingCartCurrent) {
    let elemtChange = document.getElementById("strongValor")
    let sumaParcial = ""
    let total = 0
    let i = 0

    for (i = 0; i < shoppingCartCurrent.length; i++) {
        sumaParcial = parseFloat(shoppingCartCurrent[i].amount) * parseFloat(shoppingCartCurrent[i].price)
        total = parseFloat(total) + parseFloat(sumaParcial)
    }
    elemtChange.textContent = total
}
function CalcAmountPurchaseHeaderCart(shoppingCartCurrent) {
    let sumaParcial = ""
    let total = 0
    let i = 0

    for (i = 0; i < shoppingCartCurrent.length; i++) {
        sumaParcial = parseFloat(shoppingCartCurrent[i].amount) * parseFloat(shoppingCartCurrent[i].price)
        total = parseFloat(total) + parseFloat(sumaParcial)
    }
    //Precargo el valor del Boton Encabezado del Carrito
    BtnsHeaderCartMenu(i, total)
}
function loadShoppingcart() {

    /*Busco Informacion de productos Guardados en el carrito por parte del Usuario */
    let objectCartCurrent = localStorage.getItem('ShoppingCart');
    /*Parseo el Objeto obtenido del Storage */
    let shoppingCartCurrent = JSON.parse(objectCartCurrent);
    let nodoPadre = "ShoppingToolbar-dropdown"
    let atrMap = new Map;
    let sumaParcial = ""
    let total = 0


    for (let i = 0; i < shoppingCartCurrent.length; i++) {
        //<div>
        atrMap.clear()
        atrMap.set("id", "divThird-" + shoppingCartCurrent[i].id)
        atrMap.set("class", "dropdown-product-item")
        /*Creo el nuevo Elemento HTML */
        crearNodos("div", false, "", "ShoppingToolbar-dropdown", true, atrMap)

        //<span>
        atrMap.clear()
        atrMap.set("id", "spanFirst-" + shoppingCartCurrent[i].id)
        atrMap.set("class", "dropdown-product-remove")
        //atrMap.set("onclick", "removeElementCart(" + shoppingCartCurrent[i].id + ")")
        atrMap.set("onclick", "removeElementCart(" + i + "," + shoppingCartCurrent[i].id + ")")
        crearNodos("span", false, "", "ShoppingToolbar-dropdown", true, atrMap)
        //<i>
        atrMap.clear()
        atrMap.set("id", "i-" + shoppingCartCurrent[i].id)
        atrMap.set("class", "icon-cross")
        crearNodos("i", false, "", "ShoppingToolbar-dropdown", true, atrMap)
        anidarNodos("spanFirst-" + shoppingCartCurrent[i].id, "i-" + shoppingCartCurrent[i].id)
        //<a>
        atrMap.clear()
        atrMap.set("id", "aSecond-" + shoppingCartCurrent[i].id)
        atrMap.set("class", "dropdown-product-thumb")
        atrMap.set("href", "shop-single.html")
        crearNodos("a", false, "", "ShoppingToolbar-dropdown", true, atrMap)
        //<img>
        atrMap.clear()
        atrMap.set("id", "img-" + shoppingCartCurrent[i].id)
        //---------------------------------------------cambiar el seteo de imagenes !!
        atrMap.set("src", "img/cart-dropdown/0" + i + ".jpg")
        atrMap.set("alt", "Product")
        crearNodos("img", false, "", "ShoppingToolbar-dropdown", true, atrMap)
        anidarNodos("aSecond-" + shoppingCartCurrent[i].id, "img-" + shoppingCartCurrent[i].id)
        //<a>
        atrMap.clear()
        atrMap.set("id", "aFirst-" + shoppingCartCurrent[i].id)
        atrMap.set("class", "dropdown-product-title")
        atrMap.set("href", "shop-single.html")
        crearNodos("a", true, shoppingCartCurrent[i].description, "ShoppingToolbar-dropdown", true, atrMap)
        //<span>
        atrMap.clear()
        atrMap.set("id", "spanLast-" + shoppingCartCurrent[i].id)
        atrMap.set("class", "dropdown-product-details")
        crearNodos("span", true, shoppingCartCurrent[i].amount + " x " + "$" + shoppingCartCurrent[i].price, "ShoppingToolbar-dropdown", true, atrMap)
        //<div>
        atrMap.clear()
        atrMap.set("id", "div-" + +shoppingCartCurrent[i].id)
        atrMap.set("class", "dropdown-product-info")
        crearNodos("div", false, "", "ShoppingToolbar-dropdown", true, atrMap)
        //creo Estructura
        anidarNodos("div-" + +shoppingCartCurrent[i].id, "aFirst-" + shoppingCartCurrent[i].id)
        anidarNodos("div-" + shoppingCartCurrent[i].id, "spanLast-" + shoppingCartCurrent[i].id)
        anidarNodos("divThird-" + shoppingCartCurrent[i].id, "spanFirst-" + shoppingCartCurrent[i].id)
        anidarNodos("divThird-" + shoppingCartCurrent[i].id, "aSecond-" + shoppingCartCurrent[i].id)
        anidarNodos("divThird-" + shoppingCartCurrent[i].id, "aSecond-" + shoppingCartCurrent[i].id)
        anidarNodos("divThird-" + shoppingCartCurrent[i].id, "aSecond-" + shoppingCartCurrent[i].id)
        anidarNodos("divThird-" + shoppingCartCurrent[i].id, "div-" + +shoppingCartCurrent[i].id)

        sumaParcial = parseFloat(shoppingCartCurrent[i].amount) * parseFloat(shoppingCartCurrent[i].price)
        total = parseFloat(total) + parseFloat(sumaParcial)
    }
    //Cargo Boton Header Carrito
    CalcAmountPurchaseHeaderCart(shoppingCartCurrent)

    //<div>
    atrMap.clear()
    atrMap.set("id", "divFooter")
    atrMap.set("class", "toolbar-dropdown-group")
    //Creo el nuevo Elemento HTML 
    crearNodos("div", false, "", "ShoppingToolbar-dropdown", true, atrMap)
    //<div>
    atrMap.clear()
    atrMap.set("id", "divTotal")
    atrMap.set("class", "column")
    crearNodos("div", false, "", "divFooter", true, atrMap)
    //<span>
    atrMap.clear()
    atrMap.set("id", "spanTotal")
    atrMap.set("class", "text-lg")
    crearNodos("span", true, "Total:", "divTotal", true, atrMap)
    //<div>
    atrMap.clear()
    atrMap.set("id", "divPrecio")
    atrMap.set("class", "column text-right")
    crearNodos("div", false, "", "divFooter", true, atrMap)
    //<span>
    atrMap.clear()
    atrMap.set("id", "spanPrecio")
    atrMap.set("class", "text-lg text-medium")
    crearNodos("span", false, "", "divPrecio", true, atrMap)
    //<strong>
    atrMap.clear()
    atrMap.set("id", "strongValor")
    crearNodos("strong", true, total, "spanPrecio", true, atrMap)
    anidarNodos("divFooter", "divPrecio")

    //Botones
    //<div>
    atrMap.clear()
    atrMap.set("id", "BtnHeader")
    atrMap.set("class", "toolbar-dropdown-group")
    crearNodos("div", false, "", "ShoppingToolbar-dropdown", true, atrMap)
    //<div>
    atrMap.clear()
    atrMap.set("id", "BtnHeader2")
    atrMap.set("class", "column")
    crearNodos("div", false, "", "BtnHeader", true, atrMap)
    //<a>
    atrMap.clear()
    atrMap.set("id", "BtnHeaderCart")
    atrMap.set("class", "btn btn-sm btn-block btn-secondary")
    atrMap.set("href", "cart.html")
    crearNodos("a", true, "Mi Carrito", "BtnHeader2", true, atrMap)
    //<div>
    atrMap.clear()
    atrMap.set("id", "BtnHeader3")
    atrMap.set("class", "column")
    crearNodos("div", false, "", "BtnHeader", true, atrMap)
    //<a>
    atrMap.clear()
    atrMap.set("id", "BtnHeaderCart2")
    atrMap.set("class", "btn btn-sm btn-block btn-success")
    atrMap.set("href", "checkout-address.html")
    crearNodos("a", true, "Comprar", "BtnHeader2", true, atrMap)
    anidarNodos("BtnHeader3", "BtnHeaderCart2")

}


////////////////////////////////////////////////////Funciones de carga /////////////////////////////////////////////////////////

function LoadPage() {

    if ((localStorage.getItem('ShoppingCart') != "") || (localStorage.getItem('ShoppingCart') != null)) {
        //Genero Estructura de Carrito en Header
        loadShoppingcart()


    }
}


/* ----------------------------------- Evento para la Carga de la Pagina ------------------------------*/
window.addEventListener('load', LoadPage)