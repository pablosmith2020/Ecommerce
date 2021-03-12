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


function routers() {
    // Obtiene la URL
    let path = parseLocation(); //Obtiene el hash. 

    // Busca el componente que le corresponde a esa URL. Por defecto ErrorComponent
    const {
        component = ErrorComponent
    } = findComponentByPath(path, router) || {};

    // Si no existe, muestra error.
    // Si existe, muestra el contenido de ese componente.
    $('#root').html(component.render());

    //TODO sobre escribir la call de cada elemento del menu lateral con el atriburo "with-badge" y "badge-pill" para agreagr el globo de cantidad

    switch (path.substring(1, path.length)) {
        case 'myorders':
            clearSelectorMenuAccount()
            $("#myorders").addClass("active");            
            break;
        case 'mydirection':
            $("#account-province").bind("change", loadLocality);
            $("#account-SmartPhoneSubmit").bind("click", saveDirectionUser);
            $("#account-numberStree").bind("blur", searchZipCode);
            $("#account-SmartPhoneSubmit").bind("click", saveDirectionUser);
            clearSelectorMenuAccount()
            $("#mydirection").addClass("active");
            break;
        case 'myprofile':
            clearSelectorMenuAccount()
            $("#myprofile").addClass("active");
            //$("#myprofile").bind("click", activeSelectorAccount($("#myprofile")));
            
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