// Segun la URL muestro u otro componente
const router = [{
        //El primero lo dejo para la Home que requiero por default
        path: '/',
        component: accountAddress,
    },
    {
        path: '/mydirection',
        component: accountAddress,
    },
    {
        path: '/myorders',
        component: MyOrders,
    },
    {
        path: '/myprofile',
        component: MyProfile,
    },
    {
        path: '/mywishlist',
        component: MyWishlist,
    },
    {
        path: '/comunication',
        component: Comunication,
    },
    {
        path: '/comunicationactivate',
        component: ComunicationActivate,
    },

];

if (sessionStorage.getItem('User')) {
    let ActiveUser = JSON.parse(sessionStorage.getItem('User'))
}


function routers() {
    // Obtiene la URL
    let path = parseLocation(); //Obtiene el hash. 

    // Busca el componente que le corresponde a esa URL. Por defecto ErrorComponent
    const {
        component = ErrorComponent
    } = findComponentByPath(path, router) || {};

    // Si existe, muestra el contenido de ese componente.Si no existe, muestra error.
    $('#root').html(component.render());

    //TODO sobre escribir la call de cada elemento del menu lateral con el atriburo "with-badge" y "badge-pill" para agreagr el globo de cantidad

    switch (path.substring(1, path.length)) {
        case 'myorders':
            clearSelectorMenuAccount()
            $("#myorders").addClass("active");
            break;
        case 'mydirection':
            $("#account-province").bind("change", loadLocality);
            $("#account-UpdateDirections").bind("click", searchDirectionBtn);
            $("#account-Submit").bind("click", saveDirectionUser);
            $("#account-province").bind("change", enableDisableVerificationDirection);
            $("#account-city").bind("change", enableDisableVerificationDirection);
            $("#account-address").bind("keyup", enableDisableVerificationDirection);
            $("#account-numberStreet").bind("keyup", enableDisableVerificationDirection);
            
            $("#mydirection").addClass("active");
           
clearSelectorMenuAccount()
            // Precargo los valores si esta Logeado
            if (sessionStorage.getItem('User')) {
                let ActiveUser = JSON.parse(sessionStorage.getItem('User'))
                $("#account-province").val(ActiveUser.direction.idprovince);
                reloadLocality()
                $("#account-address").val(ActiveUser.direction.street);
                $("#account-numberStreet").val(ActiveUser.direction.number);
                $("#account-SmartPhone").val(ActiveUser.celnumber);
            }
            break;
        case 'myprofile':
            clearSelectorMenuAccount()
            $("#myprofile").addClass("active");
            //$("#myprofile").bind("click", activeSelectorAccount($("#myprofile")));
            console.log("entre a myprofile")
            break;
        case 'mywishlist':
            clearSelectorMenuAccount()
            $("#mywishlist").addClass("active");
            break;
        case 'comunication':
            clearSelectorMenuAccount()
            $("#comunication").addClass("active");
            break;
        case 'comunicationactivate':
            break;

        default:

            break;
    }
};