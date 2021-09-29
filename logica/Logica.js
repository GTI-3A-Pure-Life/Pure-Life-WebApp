// .....................................................................
// Logica.js
// .....................................................................
//const sqlite3 = require( "sqlite3" )
const mysql = require( "mysql" );
const Modelo = require("./Modelo.js");
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

        console.log("...");
        this.laConexion = mysql.createConnection({
            host     : 'localhost',
            user     : 'root',
            port: 3306,
            password : '',
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
            this.laConexion.run("delete from " + tabla + ";",(err)=> ( err ? rechazar(err) : resolver()))
        })
    } // ()

    // .................................................................
    // borrarFilasDeTodasLasTablas() -->
    // .................................................................
    async borrarFilasDeTodasLasTablas() {
        await this.borrarFilasDe( "Matricula" )
        await this.borrarFilasDe( "Asignatura" )
        await this.borrarFilasDe( "Persona" )
    } // ()

    
    // .................................................................
    // -->
    // obtenerTodasPersonas() --> 
    // <-- [{dni:Texto, nombre:Texto: apellidos:Texto}]
    // .................................................................
    obtenerTodasPersonas() {
        var textoSQL ='select * from Persona;'
        return new Promise( (resolver, rechazar) => {
            this.laConexion.query( textoSQL,( err, res ) => {
                ( err ? rechazar(err) : resolver(res) )
            })
        })//()

    }

    // .................................................................
    // datos:{dni:Texto, nombre:Texto: apellidos:Texto}
    // -->
    // insertarPersona() -->
    // .................................................................
    insertarPersona( datos ) {
        var textoSQL ='insert into Persona values( $dni, $nombre, $apellidos );'
        var valoresParaSQL = { $dni: datos.dni, $nombre: datos.nombre,$apellidos: datos.apellidos }
        return new Promise( (resolver, rechazar) => {
            this.laConexion.run( textoSQL, valoresParaSQL, function( err ) {
                    ( err ? rechazar(err) : resolver() )
                })
            })
        } // ()

    // .................................................................
    // datos:{dni:Texto}
    // -->
    // borrarPersona() -->
    // .................................................................
    borrarPersona( dni ) {
        var textoSQL ='delete from Persona where dni=$dni;'
        var valoresParaSQL = { $dni: dni}
        return new Promise( (resolver, rechazar) => {
            this.laConexion.run( textoSQL, valoresParaSQL, function( err,res ) {
                //this.changes == filas afectadas
                    ( err ? rechazar(err) : resolver(this.changes) )
                })
            })
    } // ()

    // .................................................................
    // dni:Texto
    // -->
    // buscarPersonaPorDNI() <--
    // <--
    // {dni:Texto, nombre:Texto: apellidos:Texto}
    // .................................................................
    buscarPersonaConDNI( dni ) {
        var textoSQL = "select * from Persona where dni=$dni";
        var valoresParaSQL = { $dni: dni }
        return new Promise( (resolver, rechazar) => {
            this.laConexion.all( textoSQL, valoresParaSQL,( err, res ) => {
                ( err ? rechazar(err) : resolver(res) )
            })
        })
    } // ()



    // .................................................................
    // -->
    // obtenerTodasAsignaturas() --> 
    // <-- [{codigo:Texto, nombre:Texto}]
    // .................................................................
    obtenerTodasAsignaturas( ) {
        var textoSQL ='select * from Asignatura;'
        return new Promise( (resolver, rechazar) => {
            this.laConexion.all( textoSQL,( err, res ) => {
                ( err ? rechazar(err) : resolver(res) )
            })
        })//()

    }

    // .................................................................
    // datos:{codigo:Texto, nombre:Texto}
    // -->
    // insertarAsignatura() -->
    // .................................................................
    insertarAsignatura( datos ) {
        var textoSQL ='insert into Asignatura values( $codigo, $nombre );'
        var valoresParaSQL = { $codigo: datos.codigo, $nombre: datos.nombre}
        return new Promise( (resolver, rechazar) => {
            this.laConexion.run( textoSQL, valoresParaSQL, function( err ) {
                    ( err ? rechazar(err) : resolver() )
                })
            })
    } // ()

    // .................................................................
    // codigo:Texto
    // -->
    // buscarPersonaPorDNI() <--
    // <--
    // {codigo:Texto, nombre:Texto}
    // .................................................................
    buscarAsignaturaConCodigo( codigo ) {
        var textoSQL = "select * from Asignatura where codigo=$codigo";
        var valoresParaSQL = { $codigo: codigo }
        return new Promise( (resolver, rechazar) => {
            this.laConexion.all( textoSQL, valoresParaSQL,( err, res ) => {
                ( err ? rechazar(err) : resolver(res) )
            })
        })
    } // ()


    // .................................................................
    // datos:{codigo:Texto, dni:Texto}
    // -->
    // insertarMatriculaAlumno() -->
    // .................................................................
    insertarMatriculaAlumno( datos ) {
        var textoSQL ='insert into Matricula values( $dni, $codigo );'
        var valoresParaSQL = { $dni: datos.dni, $codigo: datos.codigo}
        return new Promise( (resolver, rechazar) => {
            this.laConexion.run( textoSQL, valoresParaSQL, function( err ) {
                    ( err ? rechazar(err) : resolver() )
                })
            })
    } // ()

    // .................................................................
    // datos:{codigo:Texto, dni:Texto}
    // -->
    // insertarMatriculaAlumno() -->
    // .................................................................
    deleteMatriculaAlumno( datos ) {
        var textoSQL ='delete from Matricula where dni = $dni and codigo = $codigo;'
        var valoresParaSQL = { $dni: datos.dni, $codigo: datos.codigo}
        return new Promise( (resolver, rechazar) => {
            //this.changes == filas afectadas
            this.laConexion.run( textoSQL, valoresParaSQL, function( err ) {
                    ( err ? rechazar(err) : resolver(this.changes) )
                })
            })
    } // ()

    // .................................................................
    // codigoAsignatura:Texto
    // -->
    // obtenerAlumnosMatriculadosPorCodigoAsignatura() <--
    // <--
    // [{dni:Texto, nombre:Texto: apellidos:Texto}]
    // .................................................................
    obtenerAlumnosMatriculadosPorCodigoAsignatura( codigoAsignatura ) {
        var textoSQL = "select p.* from Asignatura a inner join Matricula m on a.codigo = m.codigo inner join Persona p on m.dni = p.dni where m.codigo=$codigoAsignatura";
        var valoresParaSQL = { $codigoAsignatura: codigoAsignatura }
        return new Promise( (resolver, rechazar) => {
            this.laConexion.all( textoSQL, valoresParaSQL,( err, res ) => {
                ( err ? rechazar(err) : resolver(res) )
            })
        })
    } // ()

    // .................................................................
    // apellido:Texto
    // -->
    // obtenerMatriculacionesAlumnoPorApellido() <--
    // <--
    // [{codigo:Texto,nombre:Texto}]
    // .................................................................
    obtenerMatriculacionesAlumnoPorApellido( apellidos ) {
        var textoSQL = "select a.codigo, a.nombre from Asignatura a inner join Matricula m on a.codigo = m.codigo inner join Persona p on m.dni = p.dni where p.apellidos = $apellidos;";
        var valoresParaSQL = { $apellidos: apellidos }
        return new Promise( (resolver, rechazar) => {
            this.laConexion.all( textoSQL, valoresParaSQL,( err, res ) => {
                ( err ? rechazar(err) : resolver(res) )
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