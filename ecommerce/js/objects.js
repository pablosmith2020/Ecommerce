class User {
    constructor(firstname, lastname, email, celnumber, privatenumber, password, province, rewardpoints) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.celnumber = celnumber;
        this.privatenumber = privatenumber
        this.password = password;
        this.province = province
        this.rewardpoints = rewardpoints;
    }

    encryptPass(password) {
        /* Consultar  como encrytar en javascript*/
        var passEncrytpter = "*****************";
        return passEncrytpter;
    }
}

/*Instancio y Ingreso Valores al Objeto User para poder validar y Emular respuesta del Backend */
var ActiveUser = new User("Pablo", "Smith", "pablomsmith@hotmal.com", "1123565656", "1125632547", "Password1234", 1, 25620)

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