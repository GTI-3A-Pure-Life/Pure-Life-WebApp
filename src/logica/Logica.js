// .....................................................................
// Logica.js
// Rubén Pardo Casanova
// 29/09/2021
// Clase que controla la logica de negocio
// .....................................................................
//const sqlite3 = require( "sqlite3" )
const mysql = require( "mysql" );
const Modelo = require("./Modelo.js");
const BDConstantes = require("./Constantes/BDConstantes");
const BDCredenciales = require('./Constantes/BDCredenciales.js');

// .....................................................................
// .....................................................................

module.exports = class Logica {
    
    

    // .................................................................
    // nombreBD: Texto
    // -->
    // constructor () -->
    // .................................................................
    constructor( nombreBD, cb ) {

        this.laConexion = null;
        this.laConexion = mysql.createConnection({
            host     : BDCredenciales.MYSQL.BD_HOST,
            user     : BDCredenciales.MYSQL.BD_USUARIO,
            password : BDCredenciales.MYSQL.BD_CONTRASENYA,
            database : nombreBD
          });

         this.laConexion.connect(function(err) {
            if (err) {
              console.error('error connecting: ' + err.stack);
              
              return;
            }
            cb( err)
          

          });

       
           
          // conexion con sqlite
        /*this.laConexion = new sqlite3.Database(nombreBD,( err ) => {
            if( ! err ) {
                this.laConexion.run( "PRAGMA foreign_keys = ON" )
            }
            cb( err)
        })*/
    

    } // ()

    // .................................................................
    // nombreTabla:Texto
    // -->
    // borrarFilasDe() -->
    // .................................................................
    /**
     * 
     * @param {Texto} tabla nombre de la tabla para borrar sus registros 
     * @returns 
     */
    borrarFilasDe( tabla ) {
        return new Promise( (resolver, rechazar) => {
            this.laConexion.query("delete from " + tabla + ";",(err)=> ( err ? rechazar(err) : resolver()))
        })
    } // ()

    // .................................................................
    // borrarFilasDeTodasLasTablas() -->
    // .................................................................
    async borrarFilasDeTodasLasTablas() {
        await this.borrarFilasDe( BDConstantes.TABLA_MEDICIONES.NOMBRE_TABLA)
        await this.borrarFilasDe( BDConstantes.TABLA_USUARIOS.NOMBRE_TABLA)
        await this.borrarFilasDe( BDConstantes.TABLA_SENSORES.NOMBRE_TABLA)
        await this.borrarFilasDe( BDConstantes.TABLA_REGISTRO_ESTADO_SENSOR.NOMBRE_TABLA)
    } // ()


    // .................................................................
    // 
    // N -->
    // obtenerTodasMediciones() --> Lista<MedicionCO2>
    // .................................................................
    /**
     * 
     * @param {N} cuantas Numero de las ultimas mediciones a obtener
     * @returns Una Lista<MedicionCO2> con las ultimas N mediciones de la BD
     */
    obtenerUltimasMediciones( cuantas ) {
        var textoSQL ='select * from ' + BDConstantes.TABLA_MEDICIONES.NOMBRE_TABLA 
        + " order by " +BDConstantes.TABLA_MEDICIONES.FECHA+ " DESC LIMIT " + cuantas;

        return new Promise( (resolver, rechazar) => {
            this.laConexion.query( textoSQL, function( err,res,fields ) {

                    if(!err){

                        // return 
                       resolver(res)

                    }else{
                        console.log("obtenerUltimasMediciones: err",err);
                        rechazar(err)
                    }
                    
                })
            })
        } // ()

    
     // .................................................................
    // 
    // -->
    // obtenerTodasMediciones() --> Lista<MedicionCO2>
    // .................................................................
    /**
     * 
     * @returns Una Lista<MedicionCO2> con todas las mediciones de la BD
     */
    obtenerTodasMediciones(  ) {
        var textoSQL ='select * from ' + BDConstantes.TABLA_MEDICIONES.NOMBRE_TABLA;
        return new Promise( (resolver, rechazar) => {
            this.laConexion.query( textoSQL, function( err,res,fields ) {

                    if(!err){
                        console.log("sql",res);
                        // return 
                       resolver(res)

                    }else{
                        rechazar(err)
                    }
                    
                })
            })
        } // ()


    // .................................................................
    // Lista<MedicionCO2>
    // -->
    // publicarMedicionCO2() -->
    // .................................................................
    /**
     * 
     * @param {Lista<MedicionCO2>} mediciones Lista de mediciones a publicar en la BD
     * 
     */
    publicarMediciones( mediciones ) {


        // creo la sentencia
        var textoSQL ='insert into ' +BDConstantes.TABLA_MEDICIONES.NOMBRE_TABLA + '('+
            BDConstantes.TABLA_MEDICIONES.FECHA + ',' + 
            BDConstantes.TABLA_MEDICIONES.POSICION  + ',' +
            BDConstantes.TABLA_MEDICIONES.VALOR  + ',' + 
            BDConstantes.TABLA_MEDICIONES.USUARIO + ',' + 
            BDConstantes.TABLA_MEDICIONES.SENSOR  + ','+ 
            BDConstantes.TABLA_MEDICIONES.TIPO_GAS  + 
            ')  values ';
        
        let values = ""
        // añado a values las diferencias mediciones
        for(let i = 0; i<mediciones.length;i++){
            values +=  "("+
                "'"+mediciones[i].fecha+ "'," +  
                "POINT("+mediciones[i].posicion.latitud+","+ mediciones[i].posicion.longitud+")," + 
                mediciones[i].valor+ "," + 
                mediciones[i].idUsuario+ "," + 
                "'"+mediciones[i].idSensor+ "'," + 
                mediciones[i].tipoGas+ ')' 
            
            if(i!=mediciones.length-1){
                values+=","
            }
            
        }

        textoSQL += values;
        return new Promise( (resolver, rechazar) => {
            var query = this.laConexion.query( 
                textoSQL,  
                function( err,res,fields ) {
                    ( err ? rechazar(err) : resolver() )
                })
            })
           
    } // ()

    
    // .................................................................
    // RegistroEstadoSensor
    // -->
    // guardarRegistroBateriaSensor() -->
    // .................................................................
    /**
     * 
     * @param {RegistroEstadoSensor} registroEstadoSensor Lista de registros a guardar en la BD
     * 
     */
     guardarRegistroBateriaSensor( registroEstadoSensor ) {
        
        // creo la sentencia
        var textoSQL ='insert into ' +BDConstantes.TABLA_REGISTRO_ESTADO_SENSOR.NOMBRE_TABLA + '('+
            BDConstantes.TABLA_REGISTRO_ESTADO_SENSOR.ID_SENSOR + ',' + 
            BDConstantes.TABLA_REGISTRO_ESTADO_SENSOR.FECHA_HORA + ',' + 
            BDConstantes.TABLA_REGISTRO_ESTADO_SENSOR.POCA_BATERIA  + ',' + 
            BDConstantes.TABLA_REGISTRO_ESTADO_SENSOR.AVERIADO + ',' + 
            BDConstantes.TABLA_REGISTRO_ESTADO_SENSOR.DESCALIBRADO + ',' + 
            BDConstantes.TABLA_REGISTRO_ESTADO_SENSOR.LEIDO  + 
            ')  values ( ? , ?, ?, ' 
            +' IFNULL((SELECT r1.averiado FROM ' + BDConstantes.TABLA_REGISTRO_ESTADO_SENSOR.NOMBRE_TABLA  + ' as r1 ORDER BY ' + BDConstantes.TABLA_REGISTRO_ESTADO_SENSOR.FECHA_HORA +' DESC LIMIT 1),0),'
            +' IFNULL((SELECT r2.descalibrado FROM ' + BDConstantes.TABLA_REGISTRO_ESTADO_SENSOR.NOMBRE_TABLA  + ' as r2 ORDER BY ' + BDConstantes.TABLA_REGISTRO_ESTADO_SENSOR.FECHA_HORA +' DESC LIMIT 1),0), '
            + ' ? );';

        return new Promise( (resolver, rechazar) => {
            var query = this.laConexion.query( 
                textoSQL, 
                [registroEstadoSensor.uuidSensor,registroEstadoSensor.fechaHora,registroEstadoSensor.bateriaBaja,0],
                function( err,res,fields ) {
                    ( err ? rechazar(err) : resolver() )
                })
            })
           
    } // ()

    // .................................................................
    // RegistroEstadoSensor
    // -->
    // guardarRegistroBateriaSensor() -->
    // .................................................................
    /**
     * 
     * @param {RegistroEstadoSensor} registroEstadoSensor Lista de registros a guardar en la BD
     * 
     */
     guardarRegistroAveriaSensor( registroEstadoSensor ) {
        
        // creo la sentencia
        var textoSQL ='insert into ' +BDConstantes.TABLA_REGISTRO_ESTADO_SENSOR.NOMBRE_TABLA + '('+
            BDConstantes.TABLA_REGISTRO_ESTADO_SENSOR.ID_SENSOR + ',' + 
            BDConstantes.TABLA_REGISTRO_ESTADO_SENSOR.FECHA_HORA + ',' + 
            BDConstantes.TABLA_REGISTRO_ESTADO_SENSOR.AVERIADO  + ',' + 
            BDConstantes.TABLA_REGISTRO_ESTADO_SENSOR.POCA_BATERIA + ',' + 
            BDConstantes.TABLA_REGISTRO_ESTADO_SENSOR.DESCALIBRADO + ',' + 
            BDConstantes.TABLA_REGISTRO_ESTADO_SENSOR.LEIDO  + 
            ')  values ( ? , ?, ?, ' 
            +' IFNULL((SELECT r1.pocaBateria FROM ' + BDConstantes.TABLA_REGISTRO_ESTADO_SENSOR.NOMBRE_TABLA  + ' as r1 ORDER BY ' + BDConstantes.TABLA_REGISTRO_ESTADO_SENSOR.FECHA_HORA +' DESC LIMIT 1),0),'
            +' IFNULL((SELECT r2.descalibrado FROM ' + BDConstantes.TABLA_REGISTRO_ESTADO_SENSOR.NOMBRE_TABLA  + ' as r2 ORDER BY ' + BDConstantes.TABLA_REGISTRO_ESTADO_SENSOR.FECHA_HORA +' DESC LIMIT 1),0), '
            + ' ? );';

        return new Promise( (resolver, rechazar) => {
            var query = this.laConexion.query( 
                textoSQL, 
                [registroEstadoSensor.uuidSensor,registroEstadoSensor.fechaHora,registroEstadoSensor.averiado,0],
                function( err,res,fields ) {
                    ( err ? rechazar(err) : resolver() )
                })
            })
           
    } // ()
    

    // .................................................................
    // cerrar() -->
    // .................................................................
    cerrar() {
        return new Promise( (resolver, rechazar) => {
        this.laConexion.close( (err)=>{
                ( err ? rechazar(err) : resolver() )
            })
        })
    } // ()
} // class
// .....................................................................
// .....................................................................