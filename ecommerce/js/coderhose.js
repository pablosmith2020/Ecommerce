class User {
    constructor(firstname, secondname, lastname, email, phonenumber, password, country, city, zipcode, adress, rewardpoints) {
        this.firstname = firstname;
        this.secondname = secondname;
        this.lastname = lastname;
        this.email = ValidateEmail(email);
        this.phonenumber = phonenumber;
        this.password = password;
        this.country = country;
        this.city = city;
        this.zipcode = zipcode;
        this.adress = adress;
        this.rewardpoints = rewardpoints;
    }

    encryptPass(password) {
        /* Consultar  como encrytar en javascript*/
        var passEncrytpter = "*****************";
        return passEncrytpter;
    }

    viewUser() {
        console.log(` El Usuario Creado es: ${this.firstname}  ${this.secondname}   ${this.lastname} `)
    }

    viewCredential(email, password) {
        var passEnc = this.encryptPass(password);
        console.log(` Su Usuario es: ${this.email} y su Password Encriptada es: ${passEnc}`)
    }
}


function ValidateEmail(mail) {
    let re = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
    let valido = false
    let emailOk = ""
    if (!re.exec(mail)) {
        /*valido = false*/
        emailOk = prompt("Ingrese nuevamente su Email de Forma Correcta!!", "Ingrese su Email en Formato Correcto")
    } else {
        emailOk = mail
        return emailOk;
    }
    /*return valido;*/
}

/*Cantidad de Empleados que se desea Cargar*/
var userQuantity = parseInt(prompt("Ingrse la cantidad de Usuarios a Crear", "Debe ser un Valor Numerico"))
/*Cargo los empleados deseados*/
var listUser = [];



for (let i = 0; i < userQuantity; i++) {

    let nameuser = prompt("Ingrese  Nombre para el Empleado " + (i + 1));
    let secodnname = prompt("Ingrese Segundo Nombre para el Empleado " + (i + 1));
    let lastname = prompt("Ingrese  Apellido para el Empleado " + (i + 1));
    let pass = prompt("Ingrese la Password del Empleado  " + (i + 1));
    let email = prompt("Ingrese  Email para el Empleado " + (i + 1), "Ingrese su Email en Formato Correcto");

    /*Instancio y Ingreso Valores al nuevo Objeto de tipo User*/
    const nuevoUsuario = new User(nameuser, secodnname, lastname, email, "1123565656", "Pms2020", 1, 124, 1755, "Colon 3658", 25620)

    /* Cargo el objeto en la Lista*/
    listUser.push(nuevoUsuario);
}

/*Imprimo los usuarios Deseados*/
let userview = parseInt((prompt("Ingrese que Usuario requiere visualizar", "Ingrese un Valor numerico que haga referncia a la cantidad Cargados")))

while (userview == "" || userview == null || userview <= 0) {
    userview = prompt("Ingrese un numero correcto de Usuario a Visualizar ")
}

if (userview > listUser.length) {
    alert("Se ingreso un Numero de Usuario Inexistente en la Carga")
} else {
    for (let i = 0; i < listUser.length; i++) {
        /*alert("Vusializar el Usuario " + (i + 1) + " convertido a String y Mayuscula " + listUser(i))*/
        if (i = userview) {
            i = i - 1
            let nameStrr = ""
            let lastnameStr = ""
            let emailStr = ""
            /**toUppercase */
            nameStr = listUser[i].firstname.toString()
            lastnameStr = listUser[i].lastname.toString()
            emailStr = listUser[i].email.toString()
            alert("Visualizar el Usuario Seleccionado numero " + (i + 1) + " convertido a String y en Mayuscula " + nameStr.toUpperCase() + " " + lastnameStr.toUpperCase() + " " + emailStr.toUpperCase())

            /**Replace */
            alert("Visualizo el Nombre  y apellido  realizado un Replace del espacio entre ambos" + (nameStr + lastnameStr).replace(" ", "******"))

            /*split*/
            let resultadoEmail = emailStr.split("@")
            console.log(resultadoEmail)
        }
    }
    //concat()  --> Concatena arrays en uno nuevo
    /*Instancio Objeto de usuario Viejos*/
    const oldUser = new User("Eduardo", "Martin", "Gomez", "eduardo@gomes.com", "1123565656", "Pms2020", 1, 124, 1755, "Colon 3658", 25620)

    /*Nuevo Array de Usuario Viejos */
    let listUserOld = [];
    /* Cargo el objeto en la Lista de Usuarios Viejos*/
    listUserOld.push(oldUser);
    let totaluser = listUser.concat(listUserOld)
    console.log(totaluser)
}



/*nuevoUsuario.viewUser();
nuevoUsuario.viewCredential();*/