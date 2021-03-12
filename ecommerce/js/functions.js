/* variable para Resguardar el seteo de usuario cuando requiere recordarlo*/
let rememberUser = false;
/* variable para Concatear todos los Errores validados*/
let arrayErrorCheckIn = []
let arrayErrorPasswordFormat = []


/* ----------------------------------- Evento Global de Todas las Paginas ------------------------------*/
//window.addEventListener('load', LoadPage)
$(document).ready(LoadPages)


//////////////////////////////////////////////////////Funciones Globales/////////////////////////////////////////////////////////
function encodeBase64(textoPlano) {
    let base64s = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    textoPlano = escape(textoPlano);
    let bits, dual, i = 0,
        encOut = '';
    while (textoPlano.length >= i + 3) {
        bits =
            (textoPlano.charCodeAt(i++) & 0xff) << 16 |
            (textoPlano.charCodeAt(i++) & 0xff) << 8 |
            textoPlano.charCodeAt(i++) & 0xff;
        encOut +=
            base64s.charAt((bits & 0x00fc0000) >> 18) +
            base64s.charAt((bits & 0x0003f000) >> 12) +
            base64s.charAt((bits & 0x00000fc0) >> 6) +
            base64s.charAt((bits & 0x0000003f));
    }
    if (textoPlano.length - i > 0 && textoPlano.length - i < 3) {
        dual = Boolean(textoPlano.length - i - 1);
        bits =
            ((textoPlano.charCodeAt(i++) & 0xff) << 16) |
            (dual ? (textoPlano.charCodeAt(i) & 0xff) << 8 : 0);
        encOut +=
            base64s.charAt((bits & 0x00fc0000) >> 18) +
            base64s.charAt((bits & 0x0003f000) >> 12) +
            (dual ? base64s.charAt((bits & 0x00000fc0) >> 6) : '=') +
            '=';
    }
    return encOut
}

function decodeBase64(textoBase64) {
    let base64s = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    let bits, decOut = '',
        i = 0;
    let undecOut = null;
    for (; i < textoBase64.length; i += 4) {
        bits =
            (base64s.indexOf(textoBase64.charAt(i)) & 0xff) << 18 |
            (base64s.indexOf(textoBase64.charAt(i + 1)) & 0xff) << 12 |
            (base64s.indexOf(textoBase64.charAt(i + 2)) & 0xff) << 6 |
            base64s.indexOf(textoBase64.charAt(i + 3)) & 0xff;
        decOut += String.fromCharCode((bits & 0xff0000) >> 16, (bits & 0xff00) >> 8, bits & 0xff);
    }
    if (textoBase64.charCodeAt(i - 2) === 61) {
        undecOut = decOut.substring(0, decOut.length - 2);
    } else if (textoBase64.charCodeAt(i - 1) === 61) {
        undecOut = decOut.substring(0, decOut.length - 1);
    } else {
        undecOut = decOut;
    }
    return unescape(undecOut);
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

function parseLocation() {
    let path = location.hash.slice(1).toLowerCase()
    return path
}

function findComponentByPath(path, router) {
    //Exp. Regulares: https://www.w3schools.com/jsref/jsref_obj_regexp.asp
    let objRouter = router.find(r => r.path.match(new RegExp(`^\\${path}$`, 'gm'))) || undefined;
    return objRouter
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
            if ($('#remember_me').is(':checked')) {
                ActiveUser.loggedIn = true
                saveStorageUser()
                saveStoramail()
                activeMenuAccountHeader()
                loadMenuAccount()
                //window.location = "file:///C:/Users/Pablo/OneDrive/coderhouse/Site/SIte/ecommerce/index.html" -------------luego dejar est re direccion
            } else {
                saveStorageUser()
                deleteStoramail()
                ActiveUser.loggedIn = true
                activeMenuAccountHeader()
                loadMenuAccount()
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
        placeholder: "Password",
        style: "border-color:#dbe2e8"
    });
    $("#userPassLogin").val("")
    $("#msgErrorLogin").remove()
}

function saveStorageUser() {
    /*Guarado la Informacion  en el Storage para luego utilizarla*/
    sessionStorage.setItem("User", JSON.stringify(ActiveUser))
}

function saveStoramail() {
    sessionStorage.setItem("Usermail", ActiveUser.email)
}

function deleteStoramail() {
    sessionStorage.removeItem("Usermail")
}

function validateRemeberUser() {
    if (this.checked) {
        alert("guardar remeber")
        //rememberUser = true;
    } else {
        alert("borrar remeber")
        //rememberUser = false;
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
    ////////////////////////////////////////////////////////

    let response = grecaptcha.getResponse();
    $.ajax({
        type: "POST",
        url: 'https://www.google.com/recaptcha/api/siteverify',
        data: {
            "secret": "(6LdayG4aAAAAAHPZGIr8UVPexeq2BCLSdveS7Q4q)",
            "response": response,
            "remoteip": "www.tcfautos.com.ar"
        },
        contentType: 'application/x-www-form-urlencoded',
        success: function (data) {
            console.log(data);
        }
    });

    ///////////////////////////////////////////////////////
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
    $("#IconAccountHeader").remove
    if (sessionStorage.getItem('User')) {
        ActiveUser = JSON.parse(sessionStorage.getItem('User'))
        //Elimino Icono en Header
        $("#IconAccountHeader").remove()
        //Cargo la Foto la foto
        if ($("#ImgPhoto").length > 0) {} else {
            $("#ImgAccount").append('<img class="rounded-circle" src=' + ActiveUser.photo + ' id="ImgPhoto"></img>')
        }
        $("#MenuAccount").attr("style", "block");
    } else {
        $("#IconAccountHeader").remove
        $("#MenuAccount").hide();
        if ($("ImgPhoto")) {
            $("#ImgAccount img:last-child").remove()
            $(".user-ava").remove()
            $("#ImgAccount").append('<a href="account-login.html"></a>')
            $("#ImgAccount").append('<i href="/account-login.html" class="icon-head" id="IconAccountHeader"></i>')
            $("#ulHeaderMenucenter").remove()
        }
    }
    if ((sessionStorage.getItem('Usermail') != "" || sessionStorage.getItem('Usermail') != null) && (sessionStorage.getItem('User') != "")) {
        $("#useremailLogin").attr('value', sessionStorage.getItem('Usermail'))
        $("#btnUserLogin").removeAttr("disabled")
        if ($('#remember_me').is(':checked')) {
            $("#remember_me").prop("checked", true)
        } else {
            $("#remember_me").prop("checked", false)
        }
    }
}

function loadMenuAccount() {
    if (isLogged()) {
        $("#btnMyAccount").attr("href", "account-orders.html")
        //Login- Registrarce
        $("#liAccountMenuCenter").append(
            $('<ul/>', {
                id: 'ulHeaderMenucenter',
                class: 'sub-menu'
            }).append(
                $('<li>', {
                    id: 'liLogin'
                })))
        $("#liLogin").append(
            $('<a/>', {
                href: 'account-login.html',
                text: 'Login / Register'
            }))
        //Recordar Contraseña
        $("#ulHeaderMenucenter").append(
            $('<li>', {
                id: 'liRecoveryPassword'
            }))
        $("#liRecoveryPassword").append(
            $('<a/>', {
                href: 'account-password-recovery.html',
                text: 'Recordar Contraseña'
            }))
        //Mis Pedidos
        $("#ulHeaderMenucenter").append(
            $('<li>', {
                id: 'liMyOrder',
                onclick: 'accountPageRedirect("MyOrders")'
            }))
        $("#liMyOrder").append(
            $('<a/>', {
                href: 'account-address.html#/MyOrders',
                text: 'Mis Pedidos'
            }))
        //Favoritos
        $("#ulHeaderMenucenter").append(
            $('<li>', {
                id: 'liWishlist',
                onclick: 'accountPageRedirect("MyWishlist")'
            }))
        $("#liWishlist").append(
            $('<a/>', {
                href: 'account-address.html#/MyWishlist',
                text: 'Favoritos'
            }))
        //Perfil
        $("#ulHeaderMenucenter").append(
            $('<li>', {
                id: 'liProfile'
            }))
        $("#liProfile").append(
            $('<a/>', {
                href: 'account-address.html#/MyProfile',
                text: 'Perfil',
                onclick: 'accountPageRedirect("MyProfile")'
            }))
        //Contacto / Direccion
        $("#ulHeaderMenucenter").append(
            $('<li>', {
                id: 'liAddress',
                onclick: 'accountPageRedirect("MyDirection")'
            }))
        $("#liAddress").append(
            $('<a/>', {
                href: 'account-address.html#/MyDirection',
                text: 'Mis Direcciones'
            }))
        //Comunicacion
        $("#ulHeaderMenucenter").append(
            $('<li>', {
                id: 'liComunication'
            }))
        $("#liComunication").append(
            $('<a/>', {
                href: 'account-address.html#/Comunication',
                text: 'Comunicacion',
                onclick: 'accountPageRedirect("Comunication")'
            }))
    } else {
        $("#btnMyAccount").attr("href", "account-login.html")
        //Ver porque no queda el  href correcto cuando hago logout
    }

}

function accountPageRedirect(url) {
    let newUrl = "account-address.html#/" + url
    $(location).attr('href', newUrl);
    routers()
}

//en prueba porque no funciona al 100% no colorea el componente
function activeSelectorAccount(element) {

    console.log(element)

    element.addClass("active");
    element.focus()

}

function clearSelectorMenuAccount() {
    $('#myorders').removeClass('active');
    $('#mydirection').removeClass('active');
    $('#myprofile').removeClass('active');
    $('#mywishlist').removeClass('active');
    $('#comunication').removeClass('active');
}

function reloadComunication(id) {
    //TODO agregarle el parametro ID para luego ir al Back a buscar la comunicacion sleccionada

    console.log("funcion reloadcomunication")
    if (id > 0) {
        $(location).attr('href', "account-address.html#/ComunicationActivate");
        routers()
    } else {
        $(location).attr('href', "account-address.html#/Comunication");
        routers()
        $('html, body').animate({
            scrollTop: 0
        }, 'fast');
    }

}





function logoutFunction() {
    sessionStorage.removeItem('User')
    activeMenuAccountHeader()
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

////////////////////////////////////////////////////Funciones de carga de Todas los HTMLs /////////////////////////////////////////////////////////

function LoadPages() {
    // Funciones de Carrito
    if ((localStorage.getItem('ShoppingCart') != "") || (localStorage.getItem('ShoppingCart') != null)) {
        //Genero Estructura de Carrito en Header
        loadShoppingcart()
    }
    //Funciones e Menu Header Central
    loadMenuAccount()

    //Funciones de Sesion de Usuario Header Derecho
    activeMenuAccountHeader()




}
////////////////////////////////////////////////////Funciones de carga de Paguina Cuenta de Usuario/////////////////////////////////////////////////////////

function InitPageAccountAdress() {

    //chargeProvincesCombo()
    //searchZipCode()

}

function loadLocality() {

    let locality = $("#account-province").val();
    let url = "https://www6.oca.com.ar/BuscadorCP/WebService.asmx/getCiudades?provincia=" + locality
    let repeatedValues = [];
    $.ajax({
        method: "GET",
        url: url,
        cache: false,
        dataType: "json",
        beforeSend: function () {},
        success: function (data) {
            $("#account-city").empty()
            if (data.Localidades.length != 0) {
                repeatedValues.push(data.Localidades[0].Localidad)
                for (let i = 0; i < data.Localidades.length; i++) {
                    if (i != 0) {
                        for (let y = 0; y < repeatedValues.length; y++) {
                            if (repeatedValues[y] != data.Localidades[i].Localidad) {
                                $("#account-city").append('<option value=' + data.Localidades[i].OldZip + '>' + data.Localidades[i].Localidad + '</option>');
                            }
                        }
                    } else {
                        $("#account-city").append('<option value=' + data.Localidades[i].OldZip + '>' + data.Localidades[i].Localidad + '</option>');
                    }
                }
            } else {
                $("#account-city").append($("<option>", {
                    value: 0,
                    text: 'Servicio Sin Datos'
                }));
            }
        },
        error: function (request, error) {
            /*A futuro Logear rrores de Servicio en backend*/
            console.log(arguments);
        }
    });
}


function searchZipCode() {

    let province = $("#account-province").val();
    let provinceSelected = $('#account-province option:selected').html()
    let locality = $('#account-city option:selected').html()
    locality = locality.replace(/\s+/g, "%20")
    let street = $("#account-address").val()
    street = street.replace(/\s+/g, "%20")
    let number = $("#account-numberStreet").val()
    let url = "https://www6.oca.com.ar/BuscadorCP/WebService.asmx/getCP?provincia=" + province + "&localidad=" + locality + "&calle=" + street + "&altura=" + number;
    $.ajax({
        method: "GET",
        url: url,
        cache: false,
        dataType: "json",
        beforeSend: function () {},
        success: function (data) {

            if (data.Localidades.length == 0) {
                //alertar que la direccion NO existe
                alert("Direccion Inexistente !!")
            } else {
                $("#account-zip").val(data.Localidades[0].NewZip)
                saveUserDirection(data.Localidades[0].Nombre1, number, provinceSelected, data.Localidades[0].Localidad, data.Localidades[0].NewZip, ActiveUser.direction.latitude, ActiveUser.direction.longitude, data.Localidades[0].Tipo, data.Localidades[0].Partido)
                getCoords(ActiveUser.direction.street + " " + ActiveUser.direction.number, ActiveUser.direction.city, ActiveUser.direction.province)
                $("#mapa").show()
            }
        },
        error: function (request, error) {
            //console.log(arguments);
            alert(" Se produjo un error: " + error);
        }
    });

}

function Updatemap(latitude, longitude) {

    let vMarker
    let map
    //No me permite Cambiar a JQUERY ya que da un error de comon.js
    map = new google.maps.Map(document.getElementById('mapa'), {
        zoom: 15,
        center: new google.maps.LatLng("-34.668393", "-58.528612"),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    //aca van los valores  para que se visualicen de forma correcta 
    vMarker = new google.maps.Marker({
        position: new google.maps.LatLng(latitude, longitude),
        draggable: true
    });
    google.maps.event.addListener(vMarker, 'dragend', function (evt) {
        map.panTo(evt.latLng);
        //Seteo en un Array las nuevas Coordenadas
        let arrayLng = String(evt.latLng).split(",", 2);
        //Guardo las Nuevas COordenadas seleccionadas por el Pin
        saveLngLatUserDirection(arrayLng[0].replace("(", ""), arrayLng[1].replace(")", ""))
    });
    map.setCenter(vMarker.position);
    vMarker.setMap(map);
}

function saveLngLatUserDirection(latitude, longitude) {

    //console.log("Valor Latitud antes de Actualizar: " + ActiveUser.direction.latitude)
    //console.log("Valor Longitud antes de Actualizar: " + ActiveUser.direction.longitude)

    ActiveUser.direction.latitude = latitude;
    ActiveUser.direction.longitude = longitude;

    console.log("Valor Latitud DESPUES de Actualizar: " + ActiveUser.direction.latitude)
    console.log("Valor longitud DESPUES de Actualizar: " + ActiveUser.direction.longitude)
}

function saveUserDirection(street, number, province, city, zipCode, latitude, longitude, typeDirection, state) {

    ActiveUser.direction.street = street;
    ActiveUser.direction.number = number;
    ActiveUser.direction.province = province;
    ActiveUser.direction.city = city;
    ActiveUser.direction.zipCode = zipCode;
    ActiveUser.direction.latitude = latitude;
    ActiveUser.direction.longitude = longitude;
    ActiveUser.direction.typeDirection = typeDirection;
    ActiveUser.direction.state = state;
}

function getCoords(street, city, province) {

    let vMarker
    let map
    let geocoder = new google.maps.Geocoder();
    let address = street + city + province
    if (address != '') {
        // Llamamos a la función geodecode pasandole la dirección que hemos introducido en la caja de texto.
        geocoder.geocode({
            'address': address
        }, function (results, status) {
            if (status == 'OK') {
                saveLngLatUserDirection(results[0].geometry.location.lat(), results[0].geometry.location.lng())
                Updatemap(ActiveUser.direction.latitude, ActiveUser.direction.longitude)
            } else {
                //Guardar el error detectado con los datos
                console.log("Geolocalizacion No encontrada")
            }
        });
    }
}

function saveDirectionUser() {
    //validar que este logeado antes de guardar informacion
}

function isLogged() {
    //Retorna si existe Usuario en Sesion
    if (sessionStorage.length > 0) {
        return true
    } else {
        return false
    }
}