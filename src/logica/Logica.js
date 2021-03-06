// .....................................................................
// Logica.js
// Rubén Pardo Casanova
// 29/09/2021
// Clase que controla la logica de negocio
// .....................................................................
//const sqlite3 = require( "sqlite3" )
const mysql = require( "mysql" );
const Modelo = require("./Modelo.js");
const {Utilidades} = require("./Utilidades.js");
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
     * @returns Una Lista<Medicion> con las ultimas N mediciones de la BD
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
                        rechazar(err)
                    }
                    
                })
            })
        } // ()

    
     // .................................................................
    // 
    // -->
    // obtenerTodasMediciones() --> Lista<Medicion>
    // .................................................................
    /**
     * 
     * @returns Una Lista<Medicion> con todas las mediciones de la BD
     */
    obtenerTodasMediciones(  ) {
        var textoSQL ='select * from ' + BDConstantes.TABLA_MEDICIONES.NOMBRE_TABLA;
        return new Promise( (resolver, rechazar) => {
            this.laConexion.query( textoSQL, function( err,res,fields ) {

                    if(!err){
                        // return 
                       resolver(res)

                    }else{
                        rechazar(err)
                    }
                    
                })
            })
        } // ()

    
    // .................................................................
    // .................................................................
    /**
     * Texto, Texto, Texto -> obtenerMedicionesDeHastaPorUsuario -> Lista<Medicion>
     * 
     * @author Juan Ferrera Sala
     * 22/11/2021
     * 
     * @returns devuelve una promesa con las mediciones o lanza un error
     */
     obtenerMedicionesDeHastaPorUsuario(fechaInicio,fechaFin,idUsuario) {
        var textoSQL ='select * from ' + BDConstantes.TABLA_MEDICIONES.NOMBRE_TABLA +
        ' where '+BDConstantes.TABLA_MEDICIONES.USUARIO+'=? and '+BDConstantes.TABLA_MEDICIONES.FECHA+' between ? and ?';
        return new Promise( (resolver, rechazar) => {
            this.laConexion.query( 
                textoSQL, 
                [idUsuario,fechaInicio,fechaFin],
                function( err,res,fields ) {

                    if(!err){
                        // return 
                       resolver(res)

                    }else{
                        rechazar(err)
                    }
                    
                })
            })
        } // ()

         // .................................................................
    // .................................................................
    /**
     * Texto, Texto -> obtenerMedicionesDeHastaPorUsuario -> Lista<Medicion>
     * 
     * @author Ruben Pardo Casanova
     * 11/11/2021
     * 
     * @returns devuelve una promesa con las mediciones o lanza un error
     */
     obtenerMedicionesDeHasta(fechaInicio,fechaFin) {
        var textoSQL ='select * from ' + BDConstantes.TABLA_MEDICIONES.NOMBRE_TABLA +
        ' where '+BDConstantes.TABLA_MEDICIONES.FECHA+' between ? and ?';
        return new Promise( (resolver, rechazar) => {
            this.laConexion.query( 
                textoSQL, 
                [fechaInicio,fechaFin],
                function( err,res,fields ) {

                    if(!err){
                        // return 
                       resolver(res)

                    }else{
                        rechazar(err)
                    }
                    
                })
            })
        } // ()

    // .................................................................
    // .................................................................
    /**
     * Texto, Texto, R, R, R -> obtenerTodasMediciones -> Lista<informeCalidadAire>
     * 
     * @author Ruben Pardo Casanova
     * 11/11/2021
     * 
     * @param fechaInicio 'yyyy-MM-dd hh:mm:ss'
     * @param fechaFin 'yyyy-MM-dd hh:mm:ss'
     * @param latitud
     * @param longitud
     * @param radio
     * 
     * @returns devuelve una promesa con el informe de la calidad de aire de esa zona
     */
     obtenerCalidadAirePorTiempoYZona(fechaInicio,fechaFin, latitud,longitud, radio) {

        var textoSQL ='select *, ( 6371392.896 * acos ( cos ( radians(?) ) * cos( radians( ST_X(posMedicion) ) ) * cos( radians( ST_Y(posMedicion) ) - radians(?) ) + sin ( radians(?) ) * sin( radians( ST_X(posMedicion) ) ) )) as distancia from ' 
        + BDConstantes.TABLA_MEDICIONES.NOMBRE_TABLA +
        ' where '+BDConstantes.TABLA_MEDICIONES.FECHA+' between ? and ? having distancia <= ?';

        // primer ? = latitud del punto, segundo ? longitud del punto, tercer ? latitud del punto
        // cuarto ? = radio del circulo
        // los dos ultimos ? fecha inicio, fecha fin, ultimo ? radio

        return new Promise( (resolver, rechazar) => {
            this.laConexion.query( 
                textoSQL, 
                [latitud, longitud, latitud, fechaInicio,fechaFin , radio],
                function( err,res ) {
                    if(!err){
                        
                        let mediciones = new Array()
                        for(let i =0;i<res.length;i++){
                            mediciones.push(Modelo.Medicion.MedicionFromRawData(res[i]))
                        }
                        
                       let informeCalidadAire = Utilidades.calcularCalidadAire(mediciones);
                        


                       resolver(informeCalidadAire)

                    }else{
                        rechazar(err)
                    }
                    
                })
            })
        } // ()

    /**
     * Texto, Texto, R, R, R -> obtenerTodasMediciones -> Lista<informeCalidadAire>
     * 
     * @author Ruben Pardo Casanova
     * 11/11/2021
     * 
     * @param fechaInicio 'yyyy-MM-dd hh:mm:ss'
     * @param fechaFin 'yyyy-MM-dd hh:mm:ss'
     * @param latitud
     * @param longitud
     * @param radio
     * 
     * @returns devuelve una promesa con el informe de la calidad de aire de esa zona
     */
     obtenerCalidadAirePorTiempoYUsuario(fechaInicio,fechaFin, idUsuario) {

        
        var textoSQL ='select * from ' 
        + BDConstantes.TABLA_MEDICIONES.NOMBRE_TABLA +
        ' where '+ BDConstantes.TABLA_MEDICIONES.USUARIO +' = ? and ' +BDConstantes.TABLA_MEDICIONES.FECHA+' between ? and ? ';

        // primer ? = latitud del punto, segundo ? longitud del punto, tercer ? latitud del punto
        // cuarto ? = radio del circulo
        // los dos ultimos ? fecha inicio, fecha fin, ultimo ? radio

        return new Promise( (resolver, rechazar) => {
            this.laConexion.query( 
                textoSQL, 
                [ idUsuario, fechaInicio,fechaFin ],
                function( err,res,fields ) {
                    if(!err){
                        let mediciones = Array();
                        for(let i =0;i<res.length;i++){
                            mediciones.push(Modelo.Medicion.MedicionFromRawData(res[i]))
                        }
                        
                       let informeCalidadAire = Utilidades.calcularCalidadAire(mediciones);
                        


                       resolver(informeCalidadAire)

                    }else{
                        rechazar(err)
                    }
                    
                })
            })
        } // ()



        obtenerRegistrosEstadoSensor() {

            var textoSQL ='select * from ' 
            + BDConstantes.TABLA_REGISTRO_ESTADO_SENSOR.NOMBRE_TABLA +
            ' order by '+ BDConstantes.TABLA_REGISTRO_ESTADO_SENSOR.FECHA_HORA +' desc';    
            // primer ? = latitud del punto, segundo ? longitud del punto, tercer ? latitud del punto
            // cuarto ? = radio del circulo
            // los dos ultimos ? fecha inicio, fecha fin, ultimo ? radio
    
            return new Promise( (resolver, rechazar) => {
                this.laConexion.query( 
                    textoSQL, function( err,res,fields ) {
                        if(!err){
                            let registros = Array();
                            for(let i =0;i<res.length;i++){
                                registros.push(Modelo.RegistroEstadoSensor.RegistroFromRawData(res[i]))
                            }
                           resolver(registros)
    
                        }else{
                            rechazar(err)
                        }
                        
                    })
                })
            } // ()



    /**
     * Actualizar el campo leido del registro
     * @author Florescu, Lorena-Ioana
     * @version 24/11/2021
     * @param {N} id identificador del registro
     */
    actualizar_leido(id){

        //crear la sentencia
        var textoSQL = 'UPDATE ' +BDConstantes.TABLA_REGISTRO_ESTADO_SENSOR.NOMBRE_TABLA +
        ' SET ' + BDConstantes.TABLA_REGISTRO_ESTADO_SENSOR.LEIDO +"= 1 WHERE " + 
        BDConstantes.TABLA_REGISTRO_ESTADO_SENSOR.ID + '= ?';

        return new Promise( (resolver, rechazar) => {
            var query = this.laConexion.query( 
                textoSQL, 
                [id],
                function( err,res,fields ) {
                    ( err ? rechazar(err) : resolver() )
                })
            })


    }       

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
    // Texto, Texto
    // -->
    // iniciar_sesion() --> Usuario
    // .................................................................
    /**
     * 
     * @param {String} correo el correo del usuario
     * @param {String} contrasenya la contrasenya encriptada sha1
     * 
     * @returns promesa, si hay usuario lo devuelve, si no existe lanza error
     */
    iniciar_sesion(correo,contrasenya){
       var textoSQL = 'SELECT *, (SELECT '+ BDConstantes.TABLA_DATOS_USUARIO.POSICION_CASA 
        +' FROM '+ BDConstantes.TABLA_DATOS_USUARIO.NOMBRE_TABLA +' as du WHERE du.'+ BDConstantes.TABLA_DATOS_USUARIO.ID_USUARIO +' = u.id) as posCasa, (SELECT '+ BDConstantes.TABLA_DATOS_USUARIO.POSICION_TRABAJO +' FROM '
        + BDConstantes.TABLA_DATOS_USUARIO.NOMBRE_TABLA +' as du WHERE du.'+ BDConstantes.TABLA_DATOS_USUARIO.ID_USUARIO +' = u.id) as posTrabajo from ' + BDConstantes.TABLA_USUARIOS.NOMBRE_TABLA 
        + ' as u where ' + BDConstantes.TABLA_USUARIOS.CORREO + '= ? AND ' 
        + BDConstantes.TABLA_USUARIOS.CONTRASENYA + '= ?'

        /**
         * SELECT *, (SELECT posCasa FROM datos_usuario as du WHERE du.idUsuario = u.id) as posCasa, 
         * (SELECT posTrabajo FROM datos_usuario as du WHERE du.idUsuario = u.id) as posTrabajo FROM `usuario` 
         * as u WHERE correo = '' AND contrasenya = '';
         */
        return new Promise( (resolver, rechazar) => {
            this.laConexion.query( 
                textoSQL, 
                [correo,contrasenya],
                function( err,res,fields ) {

                    if(!err){ // si no hay datos los credenciales no son correctos
                        if(res.length != 0){
                            // return usuario
                            resolver(Modelo.Usuario.UsuarioFromQueryData(res[0]))
                        }else{
                            rechazar("No existe el usuario")
                        }
                    }else{
                        rechazar(err)
                    }
                    
                })
            })

    }// ()

    // .................................................................    
    // Usuario
    // -->
    // registrar_usuario() --> N
    // .................................................................
    /**
     * 
     * @param {Usuario} usuario el usuario a registrar
     * 
     * @returns promesa, si no ha habido problemas devuelve el nuevo usuario, por otra parte error
     */
     registrar_usuario(usuario){
        var textoSQL = 'INSERT INTO '+ BDConstantes.TABLA_USUARIOS.NOMBRE_TABLA 
         +' ('+ BDConstantes.TABLA_USUARIOS.NOMBRE +','+ BDConstantes.TABLA_USUARIOS.CORREO +','+ BDConstantes.TABLA_USUARIOS.CONTRASENYA +','
         + BDConstantes.TABLA_USUARIOS.TELEFONO +', '+ BDConstantes.TABLA_USUARIOS.ROL
         +') VALUES (?, ?, ?, ?, ?)'
 
         /**
          * INSERT INTO `usuario` ( `nombre`, `correo`, `contrasenya`, `telefono`, `rol`) 
          * VALUES ( 'normal 2', 'correo@gmail.com', '7110eda4d09e062aa5e4a390b0a572ac0d2c0220', '631254879', '1');
          */
         return new Promise( (resolver, rechazar) => {
             this.laConexion.query( 
                 textoSQL, 
                 [usuario.nombre,usuario.correo,usuario.contrasenya,usuario.telefono,usuario.rol],
                 function( err,res,fields ) {
                     if(!err){ 
                        // return usuario
                        resolver(res)
                     }else{
                         if(err.errno == 1062){// clave unica duplicada, en este caso seria el correo
                            rechazar("Este correo ya esta en uso")
                         }
                     }
                     
                 })
             })
 
     }// ()

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