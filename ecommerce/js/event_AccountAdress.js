$(document).ready(InitPageAccountAdress);
$("#account-SmartPhoneSubmit").click(saveDirectionUser)

$("#account-province").change(loadLocality);
$("#account-numberStreet").blur(searchZipCode);
$("#mapa").hide()

/*$("#account-numberStreet").keyup(function (e) {
    if (e.which == 13) {
        if (!$("#btnUserLogin").is(':disabled')) {
            searchZipCode()
        }
    }
});*/