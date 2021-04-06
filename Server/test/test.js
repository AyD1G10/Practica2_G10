const sinon = require("sinon");
const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;
chai.use(chaiHttp);
const fs = require('fs')

const app = require('../app.js');
const v = require('../validaciones.js');
const { json } = require("express");
const v_Vehiculo = require('../validacionesVehiculo');

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

// mocks

describe('Mock', function () {
  describe('/registrarVehiculo', function () {
    it('debe retornar un json con true/false si se inserta en la base', (done) => {
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