"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rs = require("readline-sync");
var Ruleta = /** @class */ (function () {
    function Ruleta() {
        this.numeroApostado = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];
        this.saldo = 0;
        this.color = ["ROJO", "NEGRO"];
        this.parImpar = ["PAR", "IMPAR"];
    }
    Ruleta.prototype.verMenu = function () {
        Menu();
    };
    Ruleta.prototype.jugar = function () {
        console.log("No va maaaaaaaaaaas");
        console.log("La ruleta esta girando .....🍀🤞");
    };
    Ruleta.prototype.cargarcredito = function (credito) {
        this.saldo = this.saldo + credito;
        console.log("usted ha cargado $ " + credito + "y su saldo actual es de $ " + this.saldo);
    };
    Ruleta.prototype.verSaldo = function () {
        return this.saldo;
    };
    Ruleta.prototype.descontarApuesta = function () {
        this.saldo = this.saldo - this.apuesta;
    };
    Ruleta.prototype.pagarPremio = function () {
        this.saldo = this.saldo + this.premio;
    };
    return Ruleta;
}());
var casinoRuleta = new Ruleta();
function Menu() {
    var salir = false;
    while (!salir) {
        console.log("----------------------------------------");
        console.log(" Bienvenido al juego de la Ruleta ");
        console.log("----------------------------------------");
        console.log("[ \uD83D\uDCB0 Saldo actual: $".concat(casinoRuleta.verSaldo(), " ]\n"));
        console.log("----------------------------------------");
        console.log("Elija una opcion \n ");
        console.log("1. Cargar créditos");
        console.log("2. Apostar numero");
        console.log("3. Apostar color");
        console.log("4. Apostar par o impar");
        console.log("0. Salir");
        console.log("---------------------------------------- \n ");
        var opcion = rs.questionInt("Seleccione una opcion: ");
        if (opcion == 1) {
            var credito = rs.questionInt("Ingrese el monto a cargar: ");
            casinoRuleta.cargarcredito(credito);
        }
        else if (opcion == 2) {
            var numeroApostado = rs.questionInt("Ingrese un numero del 0 al 36 para apostar");
        }
        else if (opcion == 3) {
            var color = rs.questionInt("Eliga 1 para apostar el color ROJO , 2 para apostar el color NEGRO");
        }
        else if (opcion == 4) {
            var parImpar = rs.questionInt("Elija 1 para apostar opcion IMPAR, 2 para apostar opcion PAR");
        }
        else if (opcion == 0) {
            casinoRuleta.jugar();
        }
    }
}
casinoRuleta.verMenu();
