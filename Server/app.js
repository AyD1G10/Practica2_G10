const express = require('express');
const cors = require('cors');

let v = require('../Server/validaciones.js');

let v_Vehiculo = require('./validacionesVehiculo');

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
    return response.send(JSON.stringify({ msg: true }));
  }
  return response.send(JSON.stringify({ msg: false }));
})

app.post('/registrarVehiculo', function (req, res) {
  const {id_user, placa, modelo, marca, linea}= req.body;
  console.log(id_user);
  if(!v_Vehiculo.getVheichulo(placa)){
    console.log('no existe placa...');
    if(v_Vehiculo.setVehiculo(id_user, placa, modelo, marca, linea)){
      return res.send(JSON.stringify({ msg: true }));
    }else{
      return res.send(JSON.stringify({ msg: false }));
    }
    
  }else{
    return  res.send(JSON.stringify({ msg: "placa" }));
  }

})

module.exports = app;