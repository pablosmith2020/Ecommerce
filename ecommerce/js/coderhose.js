class User {
    constructor(firstname, secondname, lastname, email, phonenumber, password, country, city, zipcode, adress, rewardpoints) {
        this.firstname = firstname;
        this.secondname = secondname;
        this.lastname = lastname;
        this.email = email;
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

    vierCredential(email, password) {
        var passEnc = this.encryptPass(password);
        console.log(` Su Usuario es: ${this.email} y su Password Encriptada es: ${passEnc}`)
    }
}

var nameuser = prompt("Ingrse su Nombre")
var secodnname = prompt("Ingrese su Segundo Nombre")
var lastname = prompt("Ingrese su Apellido")
var pass = prompt("Ingrese su Password")
var email = prompt("Ingrese su Email", "Ingrese su Email en Formato Correcto")

function ValidateEmail(mail) {
    var re = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
    let valido = false
    if (!re.exec(mail)) {
        valido = false
    } else {
        valido = true
    }
    return valido;
}
while (ValidateEmail(email)== false){
    email = prompt("Ingrese nuevamente su Email de Forma Correcta!!", "Ingrese su Email en Formato Correcto")
}

/*Instancio y Ingreso Valores al nuevo Objeto de tipo User*/
const nuevoUsuario = new User(nameuser, secodnname, lastname, email, "1123565656", "Pms2020", 1, 124, 1755, "Colon 3658", 25620)


nuevoUsuario.viewUser();
nuevoUsuario.vierCredential();