/* variable para Resguardar el seteo de usuario cuando requiere recordarlo*/
let rememberUser = false;
/* variable para Concatear todos los Errores validados*/
let arrayErrorCheckIn = []
let arrayErrorPasswordFormat = []


/* ----------------------------------- Evento Global de Todas las Paginas ------------------------------*/
//window.addEventListener('load', LoadPage)
$(document).ready(LoadPage)

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
    if (this.value != "") {
        let re = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
        if (!re.exec(this.value)) {
            /*Reutilizo la Funcion para dos componentes input del mismo tipo(email) en el mismo HTML*/
            switch (e.target.id) {
                case "useremailLogin":
                    $("#useremailLogin").attr({
                        placeholder: "Formato Email Incorrecto",
                        style: "border-color:red"
                    });
                    $("#useremailLogin").val("")
                    $("#btnUserLogin").attr('disabled', 'disabled');
                    break
                case "reg-email":
                    /*desarrollar los cambios de este input */
                    $("#reg-email").attr({
                        placeholder: "Formato Email Incorrecto",
                        style: "border-color:red"
                    });
                    $("#reg-email").val("");
                    break
            }
        } else {
            switch (e.target.id) {
                case "useremailLogin":
                    $("#useremailLogin").attr({
                        placeholder: "Email",
                        style: "border-color:#dbe2e8"
                    });
                    activateBtnLogin()
                    break
                case "reg-email":
                    /*desarrollar los cambios de este input */
                    $("#reg-email").attr({
                        placeholder: "Email",
                        style: "border-color:#dbe2e8"
                    });
                    activateBtnCheckIn()
                    break
            }
        }
    }
}
/////////////////////////////////////////////////////Funciones de Gestion de Usuario/////////////////////////////////////////////////////////
function validateLogin() {
    if ($("#userPassLogin").val() == "") {
        $("#userPassLogin").attr({
            placeholder: "Ingrese  su Password",
            style: "border-color:red"
        });
        $("#msgErrorLogin").remove()
    } else {
        if (($("#useremailLogin").val() == ActiveUser.email) && ($("#userPassLogin").val() == ActiveUser.password)) {
            $("#userPassLogin").attr({
                placeholder: "Password",
                style: "border-color:#dbe2e8"
            });
            if (rememberUser) {
                ActiveUser.loggedIn = true
                saveStorageUser()
                activeMenuAccountHeader()
                //window.location = "file:///C:/Users/Pablo/OneDrive/coderhouse/Site/SIte/ecommerce/index.html" -------------luego dejar est re direccion
            } else {
                ActiveUser.loggedIn = true
                activeMenuAccountHeader()
                //window.location = "file:///C:/Users/Pablo/OneDrive/coderhouse/Site/SIte/ecommerce/index.html"
            }
            resetControlEmail()
            resetControlPass()
        } else {
            /*Visualizo el Error ademas de ver que No exista ya creado */
            $("#viewErrorLogin").append('<p id="msgErrorLogin" class="text-danger">Usuario o Password Incorrectos, por favor pruebe nuevamente.</p>')
        }
    }
}

function resetControlEmail() {
    $("#useremailLogin").attr({
        placeholder: "Email",
        style: "border-color:#dbe2e8"
    });
    $("#useremailLogin").val("")
    $("#msgErrorLogin").remove()
}

function resetControlPass() {
    $("#userPassLogin").attr({
        placeholder: "Email",
        style: "border-color:#dbe2e8"
    });
    $("#userPassLogin").val("")
    $("#msgErrorLogin").remove()
}

function saveStorageUser() {
    /*Guarado la Informacion  en el Storage para luego utilizarla*/
    sessionStorage.setItem("User", JSON.stringify(ActiveUser))
}

function validateRemeberUser() {
    if (this.checked) {
        rememberUser = true;
    } else {
        rememberUser = false;
    }
}

function activateBtnLogin() {
    $("#btnUserLogin").removeAttr("disabled")
}

function activateBtnCheckIn() {
    $("#checkIn").removeAttr("disabled")
}

function validateResgistrationForm() {
    if ($("#regName").val() == "") {
        arrayErrorCheckIn.push("-Debe Ingresar sus Nombres ")
    }
    if ($("#regLastName").val() == "") {
        arrayErrorCheckIn.push("-Debe Ingresar su Apellido")
    }
    if ($("#reg-email").val() == "") {
        arrayErrorCheckIn.push("-Debe Ingresar su Email ")
    }
    if ($("#regProvince").val() == 0) {
        arrayErrorCheckIn.push("-Debe Seleccionar una Provincia")
    }
    if ($("#reg-phone").val() == "") {
        arrayErrorCheckIn.push("-Debe Ingresar su Numero Celular ")
    }
    if ($("#reg-phone-private").val() == "") {
        arrayErrorCheckIn.push("-Debe Ingresar su Telefono Particular ")
    }
    if ($("#reg-pass").val() == "") {
        arrayErrorCheckIn.push("-Debe Ingresar una Password ")
    }
    if ($("#reg-pass-confirm").val() == "") {
        arrayErrorCheckIn.push("-Debe Ingresar  el campo Confirmar Password ")
    } else {
        if ($("#reg-pass").val().trim() != $("#reg-pass-confirm").val().trim()) {
            arrayErrorCheckIn.push("-Las Password NO Coinciden, por favor ingreselas nuevamente ! ")
        } else {
            if (!validatePassword($("#reg-pass").val())) {
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
            $("#divReportValidations").append('<p id="reportValidations' + [i] + '"' + ' class="text-danger">' + arrayErrorCheckIn[i] + '</p>')
        }
        showModal()
    } else {
        /*Generar el  Contenido para visualziar los errores del Formato de la Password*/
        if (arrayErrorPasswordFormat != "") {
            for (i = 0; i < arrayErrorPasswordFormat.length; i++) {
                $("#divReportValidations").append('<p id="reportValidations' + [i] + '"' + ' class="text-danger">' + arrayErrorPasswordFormat[i] + '</p>')
            }
            showModal()
        } else {
            /*Cargo el nuevo usuario Como Objeto*/
            const ActiveUser = new User($("#regName").val(), $("#regLastName").val(), $("#reg-email").val(), $("#reg-phone").val(), $("#reg-phone-private").val(), $("#reg-pass").val(), $("#regProvince").val(), 0)
            saveNewUser(ActiveUser)
            ResetControlerRegistration()
            loginOkRegistration()
        }
    }
}

function ResetControlerRegistration() {
    $("#regName").attr({
        style: "border-color:#dbe2e8"
    });
    $("#regName").val("");

    $("#regLastName").attr({
        style: "border-color:#dbe2e8"
    });
    $("#regLastName").val("")

    $("#reg-email").attr({
        style: "border-color:#dbe2e8"
    });
    $("#reg-email").val("")

    $("#reg-regProvince").attr({
        style: "border-color:#dbe2e8"
    });
    //Dejo opcion e Select seteada
    $("#regProvince").val(0)

    $("#reg-phone").attr({
        style: "border-color:#dbe2e8"
    });
    $("#reg-phone").val("")

    $("#reg-phone-private").attr({
        style: "border-color:#dbe2e8"
    });
    $("#reg-phone-private").val("")

    $("#reg-pass").attr({
        style: "border-color:#dbe2e8"
    });
    $("#reg-pass").val("")

    $("#reg-pass-confirm").attr({
        style: "border-color:#dbe2e8"
    });
    $("#reg-pass-confirm").val("")
}

function loginOkRegistration() {
    $("#useremailLogin").val(ActiveUser.email);
    $("#userPassLogin").attr({
        style: "border-color:red"
    });
    $("#btnUserLogin").removeAttr("disabled")
}

function saveNewUser(newUser) {
    alert("Se ha registrado de Forma OK el Usuario ")
    console.log(newUser)
}

function validatePassword(contrasenna) {
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
    $("#openModalErrorregistration").show()
}

function CloseModal() {
    $("#openModalErrorregistration").hide()

    //Elimino las Etiquetas <P> creadas para ambos Tipos de Error, buscandolas por clase
    $(".text-danger").remove()
    /*Elimino los elementos de los ArrayS*/
    while (arrayErrorCheckIn.length) {
        arrayErrorCheckIn.pop();
    }
    while (arrayErrorPasswordFormat.length) {
        arrayErrorPasswordFormat.pop();
    }
}

function activeMenuAccountHeader() {
    if (ActiveUser.loggedIn) {
        //Elimino Icono en Header
        $("#IconAccountHeader").remove()
        //Cargo la Foto la foto
        if (document.getElementById("ImgPhoto")) {} else {
            $("#ImgAccount").append('<img class="rounded-circle" src=' + ActiveUser.photo + ' id="ImgPhoto"></img>')
        }
        $("#MenuAccount").attr("style", "block");
    } else {
        $("#MenuAccount").hide();
        if ($("ImgPhoto")) {
            $("#ImgAccount img:last-child").remove()
            $(".user-ava").remove()
        }
        $("#ImgAccount").append('<a href="account-login.html"></a>')
        $("#ImgAccount").append('<i href="/account-login.html" class="icon-head" id="IconAccountHeader"></i>')
    }
}

function logoutFunction() {
    ActiveUser.loggedIn = false
    activeMenuAccountHeader()
    saveStorageUser()
}


///////////////////////////////////////////////////Funciones de Carrito/////////////////////////////////////////////////////////
function removeElementCart(idArrayPositionDelete, idDivElement) {
    let objectCartCurrent = localStorage.getItem('ShoppingCart');
    let shoppingCartCurrent = JSON.parse(objectCartCurrent);
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
        $("#divThird-" + idDivElement).hide()
        CalcAmountPurchaseHeaderCart(shoppingCartCurrent)
        CalcAmountPurchaseFooterCart(shoppingCartCurrent)
    } else {
        localStorage.removeItem("ShoppingCart")
        //Oculto Elemento Footer del Div 
        $("#ShoppingToolbar-dropdown").hide()
        //Seteo los Valores del Header del Carrito
        CalcAmountPurchaseHeaderCart(shoppingCartCurrent)
    }
}

function BtnsHeaderCartMenu(count, amount) {
    $("#CountProductCart").text(count)
    $("#TotalPurchaseCart").text(amount)
    //Si esta vacio quito el  href
    if (count == 0) {
        $("#BtnHeaderCart").attr("href", "#")
    }
}

function CalcAmountPurchaseFooterCart(shoppingCartCurrent) {
    let sumaParcial = ""
    let total = 0
    let i = 0

    for (i = 0; i < shoppingCartCurrent.length; i++) {
        sumaParcial = parseFloat(shoppingCartCurrent[i].amount) * parseFloat(shoppingCartCurrent[i].price)
        total = parseFloat(total) + parseFloat(sumaParcial)
    }
    $("#spanPrecio").text(total)
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

    let sumaParcial = ""
    let total = 0

    for (let i = 0; i < shoppingCartCurrent.length; i++) {
        $("#ShoppingToolbar-dropdown").append(
            $('<div/>', {
                id: 'divThird-' + shoppingCartCurrent[i].id,
                'class': 'dropdown-product-item'
            }).append(
                $('<span/>', {
                    id: 'spanFirst-' + shoppingCartCurrent[i].id,
                    'class': 'dropdown-product-remove',
                    'onclick': "removeElementCart(" + i + "," + shoppingCartCurrent[i].id + ")"
                }).append(
                    $('<i/>', {
                        id: 'i-' + shoppingCartCurrent[i].id,
                        'class': 'icon-cross'
                    })
                )
            )
        )
        $('#' + 'divThird-' + shoppingCartCurrent[i].id).append(
            $('<a/>', {
                id: 'aSecond-' + shoppingCartCurrent[i].id,
                class: 'dropdown-product-thumb',
                href: 'shop-single.html' //Hacer dinamico el producto
            }).append(
                $('<img/>', {
                    id: 'img-' + shoppingCartCurrent[i].id,
                    src: "img/cart-dropdown/0" + i + ".jpg", //Hacer dinamico las imagenes
                    alt: 'Imagen Producto'
                })
            )
        )
        $('#' + 'divThird-' + shoppingCartCurrent[i].id).append(
            $('<div/>', {
                id: 'div-' + shoppingCartCurrent[i].id,
                class: 'dropdown-product-info'
            }).append(
                $('<a/>', {
                    id: 'aFirst-' + shoppingCartCurrent[i].id,
                    class: 'dropdown-product-title',
                    href: 'shop-single.html',
                    text: shoppingCartCurrent[i].description
                })
            )
        )
        $('#' + 'divThird-' + shoppingCartCurrent[i].id).append(
            $('<span/>', {
                id: 'spanLast-' + shoppingCartCurrent[i].id,
                class: 'dropdown-product-detailse',
                text: shoppingCartCurrent[i].amount + " x " + "$" + shoppingCartCurrent[i].price
            })
        )
        sumaParcial = parseFloat(shoppingCartCurrent[i].amount) * parseFloat(shoppingCartCurrent[i].price)
        total = parseFloat(total) + parseFloat(sumaParcial)
    }
    //Cargo Boton Header Carrito
    CalcAmountPurchaseHeaderCart(shoppingCartCurrent)
    $("#ShoppingToolbar-dropdown").append(
        $('<div>', {
            id: 'divFooter',
            'class': 'toolbar-dropdown-group'
        }).append(
            $('<div>', {
                id: 'divTotal',
                class: 'column'
            }).append(
                $('<span/>', {
                    id: 'spanTotal',
                    class: 'text-lg',
                    text: 'Total:'
                })
            ))
    )
    $("#divFooter").append(
        $('<div/>', {
            id: 'divPrecio',
            'class': 'column text-right'
        }).append(
            $('<span/>', {
                id: 'spanPrecio',
                class: 'text-lg text-medium',
                text: total
            })
        )
    )
    //Botones Footer
    $("#ShoppingToolbar-dropdown").append(
        $('<div/>', {
            id: 'BtnHeader',
            'class': 'toolbar-dropdown-group'
        })
    )
    $("#BtnHeader").append(
        $('<div/>', {
            id: 'divFooter1',
            'class': 'column'
        }).append(
            $('<a/>', {
                id: 'BtnHeaderCart',
                'class': 'btn btn-sm btn-block btn-secondary',
                href: 'cart.html',
                text: 'Mi Carrito'
            })
        ))
    $("#BtnHeader").append(
        $('<div/>', {
            id: 'divFooter2',
            'class': 'column'
        }).append(
            $('<a/>', {
                id: 'BtnHeaderCart2',
                'class': 'btn btn-sm btn-block btn-success',
                href: 'checkout-address.html',
                text: 'Comprar'
            }))
    )
}
////////////////////////////////////////////////////Funciones de carga /////////////////////////////////////////////////////////

function LoadPage() {
    // Funciones de Carrito
    if ((localStorage.getItem('ShoppingCart') != "") || (localStorage.getItem('ShoppingCart') != null)) {
        //Genero Estructura de Carrito en Header
        loadShoppingcart()
    }
    //Funciones de Sesion de Usuario
    activeMenuAccountHeader()
}