const express = require('express');
const cors = require('cors');
const fs = require('fs')


let v = require('../Server/validaciones.js');
const utils = require('./utils')
let cons_vehiculo = require('./consultaVehiculo.js');
const { json } = require('express');


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

//consultaVehiculo
app.post("/consultarVehiculo", function(request, response) {
  //validar placa
  let json_placa = request.body
  let placa = json_placa.placa
  if(placa !=""){
    console.log("consulta vehiculo placa: "+placa);
    respuesta = JSON.stringify(cons_vehiculo.getVheichulo(placa));
    //console.log(respuesta);
    return response.send(respuesta);
  }else{
    return response.send(JSON.stringify([]));
  }
});

app.post('/registrarVehiculo', function (req, res) {
  const {id_user, placa, modelo, marca, linea}= req.body;
  if (!req || !res) {
    response.send(JSON.stringify({ msg: false }));
  }
  console.log(id_user);
  if(!v_Vehiculo.getVheichulo(placa)){
    console.log('no existe placa...');
    if(v_Vehiculo.setVehiculo(id_user, placa, modelo, marca, linea)){
      return res.send(JSON.stringify({ msg: true }));
    }else{
      return res.send(JSON.stringify({ msg: false }));
    }
    
  }else{
    return  res.send(JSON.stringify({ msg: false }));
  }
  
})

app.post('/registro',(req,res) => {
  const registroData = req.body;
  fs.readFile('./database.json',function(err,data){
    if(!err) {
      let databaseFile = JSON.parse(data.toString());
      res.send(utils.saveUser(registroData,databaseFile));
    } else {
      res.send({msg:"error en la base de datos", code:0})
    }
  })
})

module.exports = app;