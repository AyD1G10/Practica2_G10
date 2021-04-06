const sinon = require("sinon");
const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;
chai.use(chaiHttp);

const app = require('../app.js');
const v = require('../validaciones.js');
const { json } = require("express");
const utils = require('../utils');

// ejemplo
describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal([1, 2, 3].indexOf(4), -1);
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





function LlamadaPostLogin(fn) {
  var returnValue,
    called = false;
  return function () {
    if (!called) {
      called = true;
      var obj = { msg: true };
      returnValue = JSON.stringify(obj);
    }
    return returnValue;
  };
}

describe('Mock', function () {
  describe('LlamadaPostLogin()', function () {
    it("llama la peticion post", function () {
      var callback = sinon.fake();
      var proxy = LlamadaPostLogin(callback);
      proxy();
      var obj = { msg: true };
      assert.equal(callback.called, false);
    });
  });
});


function once(fn) {
  var returnValue,
    called = false;
  return function () {
    if (!called) {
      called = true;
      returnValue = fn.apply(this, arguments);
    }
    return returnValue;
  };
}

describe('Mock', function () {
  describe('Sinon()', function () {
    it("calls the original function", function () {
      var callback = sinon.fake();
      var proxy = once(callback);

      proxy();

      assert(callback.called);
    });
  });
});