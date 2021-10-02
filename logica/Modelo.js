// .....................................................................
// MedicionCO2.js y Posicion.js
// .....................................................................
const BDConstantes = require('./Constantes/BDConstantes.js')


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
            this.valor = jsonObject[BDConstantes.TABLA_MEDICIONES.VALOR];
            this.fecha = jsonObject[BDConstantes.TABLA_MEDICIONES.FECHA];
            this.posicion = new Posicion(
                jsonObject[BDConstantes.TABLA_MEDICIONES.LATITUD],
                jsonObject[BDConstantes.TABLA_MEDICIONES.LONGITUD])
            this.idUsuario = jsonObject[BDConstantes.TABLA_MEDICIONES.USUARIO];;
            this.idSensor = jsonObject[BDConstantes.TABLA_MEDICIONES.SENSOR];;
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


    /**
     * JSONObject || Texto -> jsonAListaMediciones() -> List<MedicionCO2>
     * @param {Texto} json array de mediciones en forma de json 
     * @returns lista de medicionesco2
     */
    static jsonAListaMediciones(json) {
        let mediciones = new Array();

        if((typeof json) === "string"){
            // si viene en forma de texto
            json = JSON.parse(json);// lo transformamos a JSON object
        }

        json.forEach(element => {
            if((typeof element) === "string"){
                mediciones.push(new MedicionCO2(element))
            }else{
                mediciones.push(new MedicionCO2(JSON.stringify(element)))
            }
        });

        
        
        
        return mediciones;
    }

    /**
     * List<MedicionCO2> -> jsonAListaMediciones() -> JSONObject || Texto
     * @param {Lista<MedicionCO2>} mediciones array de mediciones 
     * @returns lista de medicionesco2 en json
     */
     static listaMedicionesAJSON(mediciones) {
        
  
        var a = Array();

        for(let i = 0; i<mediciones.length;i++){
            a.push(mediciones[i].toJSON())
        }
    
        return a;
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