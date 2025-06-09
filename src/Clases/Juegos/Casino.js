"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Casino = void 0;
var ArchivoTxt_1 = require("../../utils/ArchivoTxt");
var rs = require("readline-sync");
var Casino = /** @class */ (function () {
    function Casino() {
        this.saldo = (0, ArchivoTxt_1.leerSaldo)();
    }
    Casino.prototype.cargarCreditos = function (monto) {
        this.saldo += monto;
    };
    Casino.prototype.obtenerSaldo = function () {
        return this.saldo;
    };
    Casino.prototype.guardarSaldoEnArchivo = function () {
        (0, ArchivoTxt_1.guardarSaldo)(this.saldo);
    };
    Casino.prototype.descontarApuesta = function (apuesta) {
        if (apuesta > this.saldo) {
            console.log("❌ No tenés saldo suficiente.");
            rs.question("Presione ENTER para volver al menú...");
            return false;
        }
        this.saldo -= apuesta;
        return true;
    };
    return Casino;
}());
exports.Casino = Casino;
