const sinon = require("sinon");
const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;
chai.use(chaiHttp);
const fs = require('fs')

const app = require('../app.js');
const v = require('../validaciones.js');
const cons_v = require('../consultaVehiculo.js')
const { json } = require("express");
const v_Vehiculo = require('../validacionesVehiculo');
const utils = require('../utils');

//pruebas unitarias servicio de vehiculos
describe('Metodo', function () {
  describe('getVheichulo()', function () {
    it('Retorna un json con la informacion del vehiculo', function () {
      assert.notEqual(cons_v.getVheichulo('p355bgw').data.length,0);
      assert.equal(cons_v.getVheichulo('gfs5w').data.length,0);
    });
  });
});

describe('Metodo', function () {
  describe('getData()', function () {
    it('Retorna los datos en el archivo database, si este existe', function () {
      assert.notEqual(cons_v.getData('./database.json'),null);
      assert.equal(cons_v.getData('./archivo_erroneo.json'),null);
    });
  });
});

describe('Metodo', function () {
  describe('agregarVehiculo()', function () {
    it('Debe retornar true si hace la insercion del vehiculo en la base de datos', function () {
      assert.equal(cons_v.agregarVehiculo("p554dtr","1","0","ingresado a servicio","27/03/2021","---",'./database.json'),true);
      assert.equal(cons_v.agregarVehiculo("p554dtr","1","0","ingresado a servicio","27/03/2021","---",''),false);
      //eliminar el dato agregado 
      cons_v.ElininarVechiculo("p554dtr",'./database.json')
    });
  });
});

describe('Metodo', function () {
  describe('ElininarVechiculo()', function () {
    it('Debe retornar true si hace la eliminacion del vehiculo en la base de datos de vehiculos en servicio', function () {
      //agregar dato para eliminarlo sin afectar la bd
      cons_v.agregarVehiculo("p554dtr","1","0","ingresado a servicio","27/03/2021","---",'./database.json');
      
      assert.equal(cons_v.ElininarVechiculo("p554dtr",'./database.json'),true);
      assert.equal(cons_v.ElininarVechiculo("null",'./database.json'),false);
    });
  });
});

describe('Metodo', function () {
  describe('EscribirDatabase()', function () {
    it('Debe retornar true si puede escribir en la base de datos', function () {
      //obteer datos 
      datos = cons_v.getData('./database.json');
      let info_json = JSON.parse(datos);
      let nuevojson = JSON.stringify(info_json, null, 2);
      //prueba 
      assert.equal(cons_v.EscribirDatabase(nuevojson,'./database.json'),true);
      assert.equal(cons_v.EscribirDatabase(nuevojson,''),false);
    });
  });
});

describe('Metodo', function () {
  describe('TieneMinuscula()', function () {
    it('debe retornar true cuando la cadena tenga una minuscula', function () {
      assert.equal(v.TieneMinuscula('hola'), true);
      assert.equal(v.TieneMinuscula('HOLA'), false);
      assert.equal(v.TieneMinuscula('HOLa'), true);
    });
  });
});

describe('Metodo', function () {
  describe('TieneMayuscula()', function () {
    it('debe retornar true cuando la cadena tenga una mayuscula', function () {
      assert.equal(v.TieneMayuscula('hola'), false);
      assert.equal(v.TieneMayuscula('HOLA'), true);
      assert.equal(v.TieneMayuscula('holA'), true);
    });
  });
});


describe('Metodo', function () {
  describe('UsuarioCorrecto()', function () {
    it('debe retornar true si el usuario existe y su contraseña es correcta', function () {
      assert.equal(v.UsuarioCorrecto('davidtortola_@hotmail.com', 'Admin1'), true);
      assert.equal(v.UsuarioCorrecto('aaa@bbb.com', 'ccc'), false);
    });
  });
});

describe('Metodo', function () {
  describe('TieneNumero()', function () {
    it('debe retornar true la contraseña tiene por lo menos un numero', function () {
      assert.equal(v.TieneNumero('hola'), false);
      assert.equal(v.TieneNumero('hola1'), true);
    });
  });
});

describe('Metodo', function () {
  describe('TamañoCorrecto()', function () {
    it('debe retornar true si la contraseña tiene mas de 5 caracteres', function () {
      assert.equal(v.TamañoCorrecto('hola'), false);
      assert.equal(v.TamañoCorrecto('hola111'), true);
    });
  });
});

describe('Metodo', function () {
  describe('EsVacio()', function () {
    it('debe retornar true si la contraseña tiene tamaño 0', function () {
      assert.equal(v.EsVacio('hola'), false);
      assert.equal(v.EsVacio(''), true);
    });
  });
});

describe('Metodo', function () {
  describe('ValidarUsuario()', function () {
    it('debe retornar true si la contraseña y el usuario si existen', function () {
      assert.equal(v.ValidarUsuario('davidtortola_@hotmail.com', 'Admin1'), true);
      assert.equal(v.ValidarUsuario('davidtortola_@hotmail.com', 'admin'), false);
      assert.equal(v.ValidarUsuario('1111@hotmail.com', 'Admin1'), false);
    });
  });
});



describe('Metodo',function (){
  describe('generateId()', function () {
    it('Genera el id de un registro',function () {
      const databaseFile = {"database":[{"table":"usuarios","data":[{"user":"example@example","password":"1234","tipo":0,"id":1}]},{"table":"vehiculos","data":[]},{"table":"vehiculos_enServicio","data":[]}]}
      assert.equal(utils.generateId(databaseFile),2);
    });
  });
});

describe('Metodo',function (){
  describe('existsUser()', function () {
    it('Verifica si existe el usuario',function () {
      const databaseFile = {"database":[{"table":"usuarios","data":[{"user":"example@example","password":"1234","tipo":0,"id":1}]},{"table":"vehiculos","data":[]},{"table":"vehiculos_enServicio","data":[]}]}
      const registrData = {"user":"example@example","password":"1234","tipo":0}
      assert.equal(utils.existsUser(databaseFile,registrData).length,1);
    });
  });
});

describe('Metodo',function (){
  describe('saveRecordToDb()', function () {
    it('Guarda un registro en la base de datos',function () {
      const databaseFile = {"database":[{"table":"usuarios","data":[]},{"table":"vehiculos","data":[]},{"table":"vehiculos_enServicio","data":[]}]}
      const registrData = {"user":"example@example","password":"1234","tipo":0,"id":1}
      assert.equal(utils.saveRecordToDb(databaseFile,registrData),true)
    });
  });
});

describe('Metodo',function (){
  describe('numberOfUsers()', function () {
    it('Obtiene el numero de usuario en la base de datos',function () {
      const databaseFile = {"database":[{"table":"usuarios","data":[]},{"table":"vehiculos","data":[]},{"table":"vehiculos_enServicio","data":[]}]}
      assert.equal(utils.numberOfUsers(databaseFile),0)
    });
  });
});

describe('Mock',function (){
  describe('saveUser()', function () {
    it('Guarda el usuario',function () {
      const databaseFile = {"database":[{"table":"usuarios","data":[]},{"table":"vehiculos","data":[]},{"table":"vehiculos_enServicio","data":[]}]}
      const registrData = {"user":"example@example","password":"1234","tipo":0,"id":1}
      assert.equal(utils.saveUser(registrData,databaseFile).code,1)
    });
  });
});

describe('Mock', function() {
  describe('/registro',function() {
    it('Debe retornar un json si los datos son validos',(done) => {
      var obj = {"user":"example@example","password":"1234","tipo":0};
      chai.request('http://localhost:3000')
        .post('/registro')
        .send(obj)
        .end(function (err, res) {
          //console.log(res)
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});




describe('Mock', function () {
  describe('PeticionPost()', function () {
    it('debe retornar true si la contraseña y el usuario son existen', function () {
      var obj = app.post({ "USUARIO_CORREO": "davidtortola_@hotmail.com", "USUARIO_CONTRASENA": "Admin1" });
      console.log(obj.body);
      assert.notEqual(obj.body, true);
    });
  });
});


// mocks
const url = 'http://localhost:3000';
describe('Mock', function () {
  describe('/Login', function () {
    it('debe retornar un json con true/false si el usuario y contraseña son correctos', (done) => {
      var obj = { "USUARIO_CORREO": "davidtortola_@hotmail.com", "USUARIO_CONTRASENA": "Admin1" };
      chai.request(url)
        .post('/Login')
        .send(obj)
        .end(function (err, res) {
          //console.log(res)
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});

describe('Mock', function () {
  describe('/Login', function () {
    it('debe retornar un json con true/false si el usuario y contraseña son correctos', (done) => {
      var obj = null;
      chai.request(url)
        .post('/Login')
        .send(obj)
        .end(function (err, res) {
          //console.log(res)
          expect(res).to.have.status(500);
          done();
        });
    });
  });
});

//Test registro vehiculos ------------------------------------------------

describe('Metodo', function () {
  describe('AnioValido()', function () {
    it('debe retornar true cuando el anio este entre 1950 a 2022', function () {
      assert.equal(v_Vehiculo.AnioValido('2005'), true);
      assert.equal(v_Vehiculo.AnioValido('2023'), false);
      assert.equal(v_Vehiculo.AnioValido('1965'), true);
    });
  });
});

describe('Metodo', function () {
  describe('placaValida()', function () {
    it('debe retornar true cuando el formato de la placa sea valido', function () {
      assert.equal(v_Vehiculo.placaValida('PBBB001'), true);
      assert.equal(v_Vehiculo.placaValida('P123BRR'), false);
      assert.equal(v_Vehiculo.placaValida('TRCDEF876'), true);
    });
  });
});

describe('Metodo', function () {
  describe('getVheichulo()', function () {
    it('debe retornar true cuando encuentre el numero de placa en la tabla vehiculos', function () {
      assert.equal(v_Vehiculo.placaValida('PDEG152'), true);
      assert.equal(v_Vehiculo.placaValida('P123BRR'), false);
    });
  });
});

describe('Metodo', function () {
  describe('setVehiculo()', function () {
    it('debe retornar true si los datos del objeto json a insertar son validos', function () {

      assert.equal(v_Vehiculo.setVehiculo('01','CDEG152','2006','toyota','corrolla'), true);
      assert.equal(v_Vehiculo.setVehiculo('01','PDEG152','2006','toyota','corrolla'), true);
      
    });
  });
});

describe('Metodo', function () {
  describe('EscribirDatabase()', function () {
    it('debe retornar true si se escribe en el archivo.', function () {

      var json = JSON.parse(fs.readFileSync('./database.json'));
      let nuevojson = JSON.stringify(json, null, 2);

      assert.equal(v_Vehiculo.EscribirDatabase(nuevojson), true);
      
    });
  });
});

describe('Metodo', function () {
  describe('Validaciones()', function () {
    it('debe retornar true si los datos de placa y anio estan correctos ', function () {
      assert.equal(v_Vehiculo.Validaciones('PDEG152','2006'), true);
      assert.equal(v_Vehiculo.Validaciones('PBRR123','1920'), false);
    });
  });
});

describe('Metodo', function () {
  describe('Validaciones()', function () {
    it('debe retornar true si los datos de placa son correctos', function () {
      assert.equal(v_Vehiculo.getVheichulo('PDEG152'), true);
      assert.equal(v_Vehiculo.Validaciones('PBRR1233'), false);
    });
  });
});

// mocks

describe('Mock', function () {
  describe('/registrarVehiculo', function () {
    it('debe retornar un json con true/false si se inserta en la base t', (done) => {
      var obj = { "id_user": "02", "placa": "PDEG153", "modelo": "2010", "marca": "toyota", "linea": "corrolla" };
      chai.request(url)
        .post('/registrarVehiculo')
        .send(obj)
        .end(function (err, res) {
          //console.log(res)
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});

describe('Mock', function () {
  describe('/registrarVehiculo', function () {
    it('debe retornar un json con true/false si se inserta en la base', (done) => {
      var obj = null;
      chai.request(url)
        .post('/registrarVehiculo')
        .send(obj)
        .end(function (err, res) {
          console.log(res)
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});

//mock josue
describe('Mock', function () {
  describe('/consultarVehiculo', function () {
    it('debe retornar un json con la informacion del veiculo que se desea buscar', (done) => {
      var obj = {
        "placa":"p355bgw"
      };
      var objeto = {
        placa: 'p355bgw',
        id_user: '2',
        Estado: '0',
        descripcion: 'en espera de piezas para cambio de filtros',
        fecha_servicio: '15/03/2021',
        fecha_salida: ''
      }
      before(() => {
        chaiHttp(url)
        .post('/consultarVehiculo')
        .reply(200, objeto);
      });
      chai.request(url)
        .post('/consultarVehiculo')
        .send(obj)
        .end(function (err, res) {
          //expect(res.status).to.equal(200);
          expect(res.status).to.equal(200);
          done();
        });
    });
  });
});

describe('Mock', function () {
  describe('/consultarVehiculo', function () {
    it('retorna un json sin elementos', (done) => {
      var obj = null;
      var objeto = {data:[]};
      before(() => {
        chaiHttp(url)
        .post('/consultarVehiculo')
        .reply(200, objeto);
      });
      chai.request(url)
        .post('/consultarVehiculo')
        .send(obj)
        .end(function (err, res) {
          //expect(res.status).to.equal(200);
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});