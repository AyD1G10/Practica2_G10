function TieneMinuscula(password) {
    return (/.*[a-z].*/.test(password));
}

function TieneMayuscula(password) {
    return (/.*[A-Z].*/.test(password));
}

function ValidarUsuario(jsonString){
    return true;
}

module.exports = { TieneMinuscula, TieneMayuscula, ValidarUsuario }