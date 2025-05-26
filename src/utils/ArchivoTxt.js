"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.guardarSaldo = guardarSaldo;
exports.leerSaldo = leerSaldo;
var fs = require("fs");
var path = require("path");
var rs = require("readline-sync");
var ManejadorErrores_1 = require("./ManejadorErrores");
var rutaArchivo = path.join(__dirname, '../../saldo.txt');
function guardarSaldo(saldo) {
    fs.writeFileSync(rutaArchivo, saldo.toString(), 'utf-8');
}
function leerSaldo() {
    try {
        if (!fs.existsSync(rutaArchivo)) {
            throw new ManejadorErrores_1.ArchivoNoEncontradoError();
        }
        var contenido = fs.readFileSync(rutaArchivo, 'utf-8');
        var saldo = Number(contenido);
        if (isNaN(saldo)) {
            return 0;
        }
        else {
            return saldo;
        }
    }
    catch (error) {
        console.warn("⚠️   " + error.message);
        rs.question("Presione ENTER para volver al menu...");
        return 0;
    }
}
