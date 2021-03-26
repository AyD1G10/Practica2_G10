var sinon = require("sinon");
const expect = require('chai');
var assert = require('assert');

const app = require('../app.js');

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});

describe('Metodo', function() {
  describe('TieneMinuscula()', function() {
    it('debe retornar true cuando la cadena tenga una minuscula', function() {
      assert.equal(app.TieneMinuscula('hola'), true);
      assert.equal(app.TieneMinuscula('HOLA'), false);
      assert.equal(app.TieneMinuscula('HOLa'), true);
    });
  });
});

describe('Metodo', function() {
  describe('TieneMayuscula()', function() {
    it('debe retornar true cuando la cadena tenga una mayuscula', function() {
      assert.equal(app.TieneMayuscula('hola'), false);
      assert.equal(app.TieneMayuscula('HOLA'), true);
      assert.equal(app.TieneMayuscula('holA'), true);
    });
  });
});


describe('Metodo', function() {
  describe('UsuarioCorrecto()', function() {
    it('debe retornar true si el usuario existe y su contraseña es correcta', function() {
      assert.equal(app.UsuarioCorrecto('davidtortola_@hotmail.com','Admin1'), true);
      assert.equal(app.UsuarioCorrecto('aaa@bbb.com','ccc'), false);
    });
  });
});

describe('Metodo', function() {
  describe('TieneNumero()', function() {
    it('debe retornar true la contraseña tiene por lo menos un numero', function() {
      assert.equal(app.TieneNumero('hola'), false);
      assert.equal(app.TieneNumero('hola1'), true);
    });
  });
});

describe('Metodo', function() {
  describe('TamañoCorrecto()', function() {
    it('debe retornar true si la contraseña tiene mas de 5 caracteres', function() {
      assert.equal(app.TamañoCorrecto('hola'), false);
      assert.equal(app.TamañoCorrecto('hola111'), true);
    });
  });
});

describe('Metodo', function() {
  describe('EsVacio()', function() {
    it('debe retornar true si la contraseña tiene tamaño 0', function() {
      assert.equal(app.EsVacio('hola'), false);
      assert.equal(app.EsVacio(''), true);
    });
  });
});

describe('Metodo', function() {
  describe('ValidarUsuario()', function() {
    it('debe retornar true si la contraseña y el usuario son correctos', function() {
      assert.equal(app.ValidarUsuario('davidtortola_@hotmail.com','Admin1'), true);
      assert.equal(app.ValidarUsuario('davidtortola_@hotmail.com','admin'), false);
      assert.equal(app.ValidarUsuario('1111@hotmail.com','Admin1'), false);
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

describe('Mock', function() {
  describe('LlamadaPostLogin()', function() {
    it("llama la peticion post", function () {
      var callback = sinon.fake();
      var proxy = LlamadaPostLogin(callback);
      proxy();
      var obj = { msg: true };
      assert.equal(callback.called,false);
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

describe('Mock', function() {
  describe('Sinon()', function() {
    it("calls the original function", function () {
      var callback = sinon.fake();
      var proxy = once(callback);
    
      proxy();
    
      assert(callback.called);
    });
  });
});