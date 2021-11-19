// .....................................................................
// Medicion.js Posicion.js RegistroEstadoSensor
// .....................................................................
const BDConstantes = require('./Constantes/BDConstantes.js')


/**
 * Clase que representa una medicion CO2 // 26/09/2021
 * @author Rubén Pardo Casanova 
 * 
 */
class Medicion {
    
    /**
     * Constructor de la clase medicion parametrizado
     * R, Texto, Posicion, N, Texto, N -> constructor()
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
     * @param {int} tipoGas 
     * 
     */
    constructor(json,valor,fecha,posicion,idUsuario,idSensor,tipoGas){

        
        if(arguments.length == 1){
            // recibe solo el json
            let jsonObject = (json);

            if([BDConstantes.TABLA_MEDICIONES.POSICION]['x'] == undefined){
                this.posicion = new Posicion(
                    jsonObject[BDConstantes.TABLA_MEDICIONES.POSICION]['latitud'],
                    jsonObject[BDConstantes.TABLA_MEDICIONES.POSICION]['longitud'])
            }else{
                this.posicion = new Posicion(
                    jsonObject[BDConstantes.TABLA_MEDICIONES.POSICION]['x'],
                    jsonObject[BDConstantes.TABLA_MEDICIONES.POSICION]['y'])
            }

            this.valor = jsonObject[BDConstantes.TABLA_MEDICIONES.VALOR];
            this.fecha = formatearFecha(jsonObject[BDConstantes.TABLA_MEDICIONES.FECHA]);
            this.idUsuario = jsonObject[BDConstantes.TABLA_MEDICIONES.USUARIO];
            this.idSensor = jsonObject[BDConstantes.TABLA_MEDICIONES.SENSOR];
            this.tipoGas = jsonObject[BDConstantes.TABLA_MEDICIONES.TIPO_GAS];

        }else{
            // recibe todos los valores
            this.valor = valor;
            this.fecha = fecha;
            this.posicion = posicion;
            this.idUsuario = idUsuario;
            this.idSensor = idSensor;
            this.tipoGas = tipoGas
        }
    };

    
  

    /**
     * toJSON() -> Texto
     * @returns String en formato json del objeto
     */
    toJSON() {
        
         return JSON.stringify({ 
            id: this.medicion_id,
            fechaHora: this.fecha,
            posMedicion: this.posicion,
            valor: this.valor,
            idUsuario: this.idUsuario,
            uuidSensor: this.idSensor,
            tipoGas:this.tipoGas
           });
    }

     
    /**
     * RawQueryData-> formatearRAWBDData() -> List<Medicion>
     * @param {RawQueryData} query 
     * @returns lista de mediciones formateadas
     */
    static formatearRAWBDData(query) {
            const mediciones = query.map(function(element){
        
            let fechaHoraV = formatearFecha(element.fechaHora);
            return {

                valor: element.valor,
                fechaHora:fechaHoraV,
                posMedicion: { latitud: element.posMedicion.x, longitud: element.posMedicion.y },
                idUsuario: element.idUsuario,
                idSensor: element.uuidSensor,
                tipoGas: element.tipoGas
            }
        })

        return mediciones;
    }

    /**
     * JSONObject || Texto -> jsonAListaMediciones() -> List<Medicion>
     * @param {Texto} json array de mediciones en forma de json 
     * @returns lista de medicionesco2
     */
    static jsonAListaMediciones(json) {
        let mediciones = new Array();

        if((typeof json) === "string"){
            console.log("es string");
            // si viene en forma de texto
            json = JSON.parse(json);// lo transformamos a JSON object
        }

        json.forEach(element => {    
            if(typeof element == "string"){
                mediciones.push(new Medicion(JSON.parse(element)))
            }else{

                mediciones.push(new Medicion((element)))
            }
            
        });
        return mediciones;
    }

     /**
     * Lista<Medicion> -> jsonAListaMediciones() -> JSON
     * @param {Texto} json array de mediciones 
     * @returns lista de mediciones en formato json
     */
      static listaMedicionesAJSON(mediciones) {
        const res = mediciones.map(function(element){
            
            return  element.toJSON();
        })
        return res;
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

// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------

/**
 * Clase que representa un registro de estado del sensor
 * 26/09/21
 * @author Rubén Pardo Casanova
 */
 class RegistroEstadoSensor{

    /**
     * idSensor:Texto, tieneBateriaBaja:T/F, estaCalibrado:T/F, estaAveriado:T/F fechaHora:Texto -> 
     * constructor() ->
     * 
     * 
     * @param {boolean} descalibrado 
     * @param {boolean} bateriaBaja 
     * @param {boolean} averiado 
     * @param {boolean} leido 
     * @param {Texto} uuidSensor 
     * @param {Texto} fechaHora 
     */
    constructor(json,descalibrado, bateriaBaja,averiado,leido,uuidSensor,fechaHora){
        
        if(arguments.length == 1){
            // recibe solo el json
            let jsonObject = JSON.parse(json);
            this.descalibrado = jsonObject[BDConstantes.TABLA_REGISTRO_ESTADO_SENSOR.DESCALIBRADO];;
            this.bateriaBaja = jsonObject[BDConstantes.TABLA_REGISTRO_ESTADO_SENSOR.POCA_BATERIA];;
            this.averiado = jsonObject[BDConstantes.TABLA_REGISTRO_ESTADO_SENSOR.AVERIADO];;
            this.leido = jsonObject[BDConstantes.TABLA_REGISTRO_ESTADO_SENSOR.LEIDO];;
            this.uuidSensor = jsonObject[BDConstantes.TABLA_REGISTRO_ESTADO_SENSOR.ID_SENSOR];;
            this.fechaHora = jsonObject[BDConstantes.TABLA_REGISTRO_ESTADO_SENSOR.FECHA_HORA];;


        }else{
            this.descalibrado = descalibrado;
            this.bateriaBaja = bateriaBaja;
            this.averiado = averiado;
            this.leido = leido;
            this.uuidSensor = uuidSensor;
            this.fechaHora = formatearFecha(fechaHora);
        }
         
    }


     /**
     * toJSON() -> Texto
     * @returns String en formato json del objeto
     */
      toJSON() {
        
        return JSON.stringify({ 
           uuidSensor: this.uuidSensor,
           fechaHora: this.fechaHora,
           pocaBateria: this.bateriaBaja,
           averiado: this.averiado,
           descalibrado: this.descalibrado,
           leido: this.leido
          });
   }



}// ()


// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------

/**
 * Clase que representa un usuario
 * 09/11/21
 * @author Rubén Pardo Casanova
 */
 class Usuario{

    /**
     * posCasa:Posicion,posTrabajo:Posicion, correo:Texto, nombre:Texto contrasenya:Texto, id:N -> 
     * constructor()->
     * 
     * 
     * @param {Posicion} posCasa 
     * @param {Posicion} posTrabajo 
     * @param {String} correo 
     * @param {String} contrasenya 
     * @param {String} nombre 
     * @param {int} id 
     * @param {int} rol
     */
    constructor(posCasa, posTrabajo, correo, contrasenya, nombre, id,telefono,rol){
        
        this.posCasa = posCasa;
        this.posTrabajo = posTrabajo;
        this.correo = correo;
        this.contrasenya = contrasenya;
        this.nombre = nombre;
        this.id = id;
        this.telefono = telefono;
        this.rol = rol;
         
    }

    /**
     * Texto-> constructor()
     * @param {QueryRawData} query 
     * @returns Usuario
     */
     static UsuarioFromQueryData(query) {
       
        const usuario = new Usuario(
            query.posCasa == null ? null : new Posicion ( query.posCasa.x, query.posCasa.y ), // comprobar si tiene asignada la posiciones
            query.posTrabajo == null ? null :new Posicion (query.posTrabajo.x, query.posTrabajo.y ),
            query.correo,
            query.contrasenya,
            query.nombre,
            query.id,
            query.telefono,
            query.rol 
        );
        return usuario;
    }

     /**
     * toJSON() -> Texto
     * @returns String en formato json del objeto
     */
    toJSON() {
        
        // pueden ser nulls, inicializarlos antes con un if
        let posCasaV = this.posCasa==null ? null :  { latitud: this.posCasa.latitud, longitud: this.posCasa.longitud };
        let posTrabajoV = this.posTrabajo==null ? null :  { latitud: this.posTrabajo.latitud, longitud: this.posTrabajo.longitud };

        return JSON.stringify({ 
            id: this.id,
            rol: this.rol,
            correo:this.correo,
            nombre:this.nombre,
            posCasa: posCasaV,
            posTrabajo: posTrabajoV,
            contrasenya: this.contrasenya,
            telefono: this.telefono
          });
    }

    



}// ()


    /**
     * Texto -> formatearFecha() -> Texto
     * @param {String} fechaAFormatear 
     * @returns fecha formateada 2021/10/7 10:50:31
     */
  function formatearFecha(fechaAFormatear){
    let date = new Date(fechaAFormatear);
    let strRes = 
    (date.getFullYear()+
    "-"+(date.getMonth()+1)+
    "-"+date.getDate()+
    " "+((date.getHours() < 10 ? "0" : "") + date.getHours())+
    ":"+((date.getMinutes() < 10 ? "0" : "") + date.getMinutes())+
    ":"+((date.getSeconds() < 10 ? "0" : "") + date.getSeconds()));

    return strRes;
}


module.exports = {
    Medicion : Medicion,
    Posicion : Posicion,
    RegistroEstadoSensor: RegistroEstadoSensor,
    Usuario:Usuario
}