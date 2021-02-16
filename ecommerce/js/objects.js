class User {
    constructor(firstname, lastname, email, celnumber,privatenumber, password, province,rewardpoints) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.celnumber = celnumber;
        this.privatenumber=privatenumber
        this.password = password;
        this.province=province
        this.rewardpoints = rewardpoints;
    }

    encryptPass(password) {
        /* Consultar  como encrytar en javascript*/
        var passEncrytpter = "*****************";
        return passEncrytpter;
    }
}

/*Instancio y Ingreso Valores al Objeto User para poder validar y Emular respuesta del Backend */
const ActiveUser = new User("Pablo", "Smith", "pablomsmith@hotmal.com", "1123565656", "1125632547", "Password1234", 1, 25620)

