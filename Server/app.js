const express = require('express');
const cors = require('cors');
const fs = require('fs')


let v = require('../Server/validaciones.js');
const utils = require('./utils')

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