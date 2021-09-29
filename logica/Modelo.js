// .....................................................................
// MedicionCO2.js y Posicion.js
// .....................................................................
//const Posicion = require('./Posicion.js')


/**
 * Clase que representa una medicion CO2 // 26/09/2021
 * @author Rubén Pardo Casanova 
 * 
 */
class MedicionCO2 {
    
    /**
     * Constructor de la clase medicion parametrizado
     * R, Texto, Posicion, N, Texto -> constructor()
     * --------------------------------
     * Constructor con solo el json
     * Texto -> constructor() 
     * ---------------------------
     * @param {string} json solo si se pasa un argumento
     * @param {double} valor
     * @param {String} fecha 
     * @param {Posicion} posicion 
     * @param {int} idUsuario 
     * @param {string} idSensor 
     * 
     */
    constructor(json,valor,fecha,posicion,idUsuario,idSensor){

        
        if(arguments.length == 1){
            // recibe solo el json
            let jsonObject = JSON.parse(json);
            this.valor = jsonObject['medicion_valor'];
            this.fecha = jsonObject['medicion_fecha'];
            this.posicion = new Posicion(jsonObject['medicion_latitud'],jsonObject['medicion_longitud'])
            this.idUsuario = jsonObject['usuario_id'];;
            this.idSensor = jsonObject['sensor_id'];;
        }else{
            // recibe todos los valores
            this.valor = valor;
            this.fecha = fecha;
            this.posicion = posicion;
            this.idUsuario = idUsuario;
            this.idSensor = idSensor;
        }
    };

    
    


    /**
     * toJSON() -> Texto
     * @returns String en formato json del objeto
     */
    toJSON() {
        
         return JSON.stringify({ 
            medicion_id: this.medicion_id,
            medicion_fecha: this.fecha,
            medicion_latitud: this.posicion.latitud,
            medicion_longitud: this.posicion.longitud,
            medicion_valor: this.valor,
            usuario_id: this.idUsuario,
            sensor_id: this.idSensor
           });
    }
} // ()



// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------

/**
 * Clase que representa un punto con coordenadas latitud y longitud
 * 26/09/21
 * @author Rubén Pardo Casanova
 */
class Posicion{

    /**
     * 
     * @param {double} latitud 
     * @param {double} longitud 
     */
    constructor(latitud, longitud){
        this.latitud = latitud;
        this.longitud = longitud;
    }
}// ()


module.exports = {
    MedicionCO2 : MedicionCO2,
    Posicion : Posicion
  }