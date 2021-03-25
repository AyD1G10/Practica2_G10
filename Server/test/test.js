var sinon = require("sinon");
const expect = require('chai');
var assert = require('assert');

const validaciones = require('../validaciones.js');
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
      assert.equal(validaciones.TieneMinuscula('hola'), true);
      assert.equal(validaciones.TieneMinuscula('HOLA'), false);
      assert.equal(validaciones.TieneMinuscula('HOLa'), true);
    });
  });
});

describe('Metodo', function() {
  describe('TieneMayuscula()', function() {
    it('debe retornar true cuando la cadena tenga una mayuscula', function() {
      assert.equal(validaciones.TieneMayuscula('hola'), false);
      assert.equal(validaciones.TieneMayuscula('HOLA'), true);
      assert.equal(validaciones.TieneMayuscula('holA'), true);
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