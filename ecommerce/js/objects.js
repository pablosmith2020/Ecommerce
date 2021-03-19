var ActiveUser;
var UserDirection;


class Direction {
    constructor(street, number, province,idprovince, city,idcity, zipCode,state, latitude, longitude,typeDirection) {
        this.street = street;
        this.number=number;
        this.province=province;
        this.idprovince=idprovince;
        this.city=city;
        this.idcity= idcity;
        this.zipCode=zipCode;
        this.state=state;
        this.latitude=latitude;
        this.longitude=longitude;
        this.typeDirection=typeDirection;
    }
}

class User {
    constructor(firstname, lastname, email, celnumber, privatenumber, password, direction, rewardpoints, loggedIn,registrationDate, photo) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.celnumber = celnumber;
        this.privatenumber = privatenumber
        this.password = password;
        this.direction = direction;
        this.rewardpoints = rewardpoints;
        this.loggedIn = loggedIn;
        this.registrationDate=registrationDate;
        this.photo = photo
    }

    encryptPass(password) {
        /* Consultar  como encrytar en javascript*/
        var passEncrytpter = "*****************";
        return passEncrytpter;
    }
}

/*Instancio y Ingreso Valores al Objeto User para poder validar y Emular respuesta del Backend */

UserDirection= new Direction("el rastreador",936,"CIUDAD AUTONOMA BUENOS AIRES","C", "CIUDAD AUTONOMA BUENOS AIRES","1408","1408","CAPITAL FEDERAL","-34.6683937","-58.528612","Calle")

if (sessionStorage.getItem('User') == "" || sessionStorage.getItem('User') == null) {

    ActiveUser = new User("Pablo 1", "Smith 1", "pablomsmith@hotmal.com", "1123565656", "1125632547",  "Password1234",UserDirection,  25620, false,"02/05/2020", "img/account/user-ava-sm.jpg")

}


/*Credenciales a Utilizar para Poder Ingresar

Email= pablomsmith@hotmal.com
Pass=  Password1234
*/



/* Consultar como hacer un Array de Photos*/
class Product {
    constructor(id, description, amount, price, discount,size,color, photos) {

        this.id = id;
        this.description = description;
        this.amount = amount;
        this.price = price;
        this.discount = discount;
        this.size=size;
        this.color=color;
        this.photos = photos;

    }
}

/*Declaro  un Array de Productos para poder  cargarlos el Local Storage  y Emular un comportamiento de Guardado por parte del usuario*/

var ShoppingCart = []
ShoppingCart.push(new Product(1205, "Zapatilla Adidas", 1, "43.90", 0, "Gris Oscuro","Mediano","img/cart-dropdown/00.jpg"));
ShoppingCart.push(new Product(1405, "Gorra Deportiva", 2, "24.89", 0,"Negra","Grande", "img/cart-dropdown/01.jpg"));
ShoppingCart.push(new Product(8805, "Cartera Ugart", 1, "200.09", 0, "Verde","Extra Grande","img/cart-dropdown/02.jpg"));
/*console.log(ShoppingCart)*/
localStorage.setItem("ShoppingCart", JSON.stringify(ShoppingCart))