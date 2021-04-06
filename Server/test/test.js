const sinon = require("sinon");
const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;
chai.use(chaiHttp);

const app = require('../app.js');
const v = require('../validaciones.js');
const cons_v = require('../consultaVehiculo.js')
const { json } = require("express");

// ejemplo
describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});

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