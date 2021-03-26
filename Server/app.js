const express = require('express');
const cors = require('cors');

let v = require('../Server/validaciones.js');

var app = express();
app.use(express.json());
app.use(cors());

// POST method route
app.post('/Login', function (request, response) {
  if (!request || !response) {
    response.send(JSON.stringify({ msg: false }));
  }
  console.log(request.body);
  if (v.ValidarUsuario(request.body['USUARIO_CORREO'], request.body['USUARIO_CONTRASENA'])) {
    return response.send(JSON.stringify({ msg: false }));
  }
  return response.send(JSON.stringify({ msg: false }));
})

module.exports = app;