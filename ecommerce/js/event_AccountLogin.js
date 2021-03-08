/* Genero el Evento de validacion de email si el mismo esta cargado */
$("#useremailLogin").blur(validateEmail);
$("#useremailLogin").click(resetControlEmail)

/* Genero el Evento de ingreso con email y Password */
$("#btnUserLogin").click(validateLogin);

/* Genero el Evento Input Pass para resetearlo en caso de error */
$("#userPassLogin").click(resetControlPass);
/*Genero el Evento de seteo de recordar Usuarioy guardo el valor en una variable*/
//$("#remember_me").change(validateRemeberUser);

$("#userPassLogin").keyup(function (e) {
    if (e.which == 13) {
        if (!$("#btnUserLogin").is(':disabled')) {
            validateLogin()
        }
    }
});
/* -----------------------------------Nuevos Eventos para Resgistracion--------------------------------------*/
/* Genero el Evento de validacion de email si el mismo esta cargado */
$("#reg-email").blur(validateEmail);
$("#checkIn").click(validateResgistrationForm)
//$("#BtnLogout").click(logoutFunction)