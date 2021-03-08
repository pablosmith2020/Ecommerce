var ActiveUser;
var UserDirection;


class Direction {
    constructor(street, number, province, city, zipCode,state, latitude, longitude,typeDirection) {
        this.street = street;
        this.number=number;
        this.province=province;
        this.city=city;
        this.zipCode=zipCode;
        this.state=state;
        this.latitude=latitude;
        this.longitude=longitude;
        this.typeDirection=typeDirection;
    }
}

class User {
    constructor(firstname, lastname, email, celnumber, privatenumber, password, direction, rewardpoints, loggedIn, photo) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.celnumber = celnumber;
        this.privatenumber = privatenumber
        this.password = password;
        this.direction = direction;
        this.rewardpoints = rewardpoints;
        this.loggedIn = loggedIn;
        this.photo = photo
    }

    encryptPass(password) {
        /* Consultar  como encrytar en javascript*/
        var passEncrytpter = "*****************";
        return passEncrytpter;
    }
}

/*Instancio y Ingreso Valores al Objeto User para poder validar y Emular respuesta del Backend */

//alert("evaluo")
//console.log(sessionStorage.getItem('User'))

UserDirection= new Direction("colon",3532,"Buenos Aires","Lomas del Mirador","1752","La Matanza","-34.6683937","-58.528612","Calle")

if (sessionStorage.getItem('User') == "" || sessionStorage.getItem('User') == null) {

    ActiveUser = new User("Pablo", "Smith", "pablomsmith@hotmal.com", "1123565656", "1125632547",  "Password1234",UserDirection,  25620, false, "img/account/user-ava-sm.jpg")

}


/*Credenciales a Utilizar para Poder Ingresar

Email= pablomsmith@hotmal.com
Pass=  Password1234
*/



/* Consultar como hacer un Array de Photos*/
class Product {
    constructor(id, description, amount, price, discount, photos) {

        this.id = id;
        this.description = description;
        this.amount = amount;
        this.price = price;
        this.discount = discount;
        this.photos = photos;

    }
}

/*Declaro  un Array de Productos para poder  cargarlos el Local Storage  y Emular un comportamiento de Guardado por parte del usuario*/

var ShoppingCart = []
ShoppingCart.push(new Product(1205, "Zapatilla Adidas", 1, "43.90", 0, "img/cart-dropdown/01.jpg"));
ShoppingCart.push(new Product(1405, "Gorra Deportiva", 2, "24.89", 0, "img/cart-dropdown/02.jpg"));
ShoppingCart.push(new Product(8805, "Cartera Ugart", 1, "200.09", 0, "img/cart-dropdown/03.jpg"));
/*console.log(ShoppingCart)*/
localStorage.setItem("ShoppingCart", JSON.stringify(ShoppingCart))