// .....................................................................
// Logica.js
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
    } // ()


    // .................................................................
    // 
    // -->
    // obtenerTodasMediciones() --> Lista<MedicionCO2>
    // .................................................................
    obtenerTodasMediciones(  ) {
        var textoSQL ='select * from ' + BDConstantes.TABLA_MEDICIONES.NOMBRE_TABLA;
        return new Promise( (resolver, rechazar) => {
            this.laConexion.query( textoSQL, function( err,res,fields ) {

                    if(!err){

                        // return 
                       resolver( Modelo.MedicionCO2.jsonAListaMediciones(res))

                    }else{
                        rechazar(err)
                    }
                    
                })
            })
        } // ()

    

    // .................................................................
    // MedicionCO2
    // -->
    // publicarMedicionCO2() -->
    // .................................................................
    publicarMedicionCO2( medicion ) {
        
        var textoSQL ='insert into ' +BDConstantes.TABLA_MEDICIONES.NOMBRE_TABLA + '('+
            BDConstantes.TABLA_MEDICIONES.FECHA + ',' + 
            BDConstantes.TABLA_MEDICIONES.LATITUD  + ',' +
            BDConstantes.TABLA_MEDICIONES.LONGITUD + ',' + 
            BDConstantes.TABLA_MEDICIONES.VALOR  + ',' + 
            BDConstantes.TABLA_MEDICIONES.USUARIO + ',' + 
            BDConstantes.TABLA_MEDICIONES.SENSOR  + 
            ')  values ( ?, ?, ?, ?, ?, ? );';
        
        
            return new Promise( (resolver, rechazar) => {
            this.laConexion.query( 
                textoSQL, 
                [medicion.fecha, medicion.posicion.latitud, medicion.posicion.longitud, medicion.valor, medicion.idUsuario, medicion.idSensor], 
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