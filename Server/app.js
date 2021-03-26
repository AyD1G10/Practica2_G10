
var express = require('express');
const cors = require('cors');
var app = express();
app.use(express.json());
app.use(cors());

// POST method route
app.post('/login', function (request, response) {
  //var objectValue = request.body["hola"];
  //console.log(objectValue);
  if (!request || !response) {
    var obj = { msg: false };
    response.send(JSON.stringify(obj));
  }
  if (ValidarUsuario(request.body[USUARIO_CORREO], request.body[USUARIO_CONTRASENA])) {
    var obj = { msg: true };
    response.send(JSON.stringify(obj));
  }
  var obj = { msg: false };
  response.send(JSON.stringify(obj));
})



function TieneMinuscula(password) {
  return (/.*[a-z].*/.test(password));
}

function TieneMayuscula(password) {
  return (/.*[A-Z].*/.test(password));
}

function TieneNumero(password) {
  return (/.*[0-9].*/.test(password));
}

function EsVacio(password) {
  if (password.length === 0) {
    return true;
  }
  return false;
}

function TamañoCorrecto(password) {
  if (password.length > 5) {
    return true;
  }
  return false;
}

var list = [
  { user: 'davidtortola_@hotmail.com', pass: 'Admin1' },
  { user: 'chichicaste22@gmail.com', pass: 'Admin1' }
];

function UsuarioCorrecto(user, pass) {
  for (let index = 0; index < list.length; ++index) {
    let value = list[index];
    console.log(index, value);
    if (user === list[index].user && pass === list[index].pass) {
      return true;
    }
  }
  return false;
}

function ValidarUsuario(user, pass) {
  if (EsVacio(pass)) { return false; }
  if (!TamañoCorrecto(pass)) { return false; }
  if (!TieneNumero(pass)) { return false; }
  if (!TieneMayuscula(pass)) { return false; }
  if (!TieneMinuscula(pass)) { return false; }
  if (!UsuarioCorrecto(user, pass)) { return false; }
  return true;
}

module.exports = app, TieneMinuscula, TieneMayuscula, UsuarioCorrecto, TieneNumero, EsVacio, TamañoCorrecto, ValidarUsuario;