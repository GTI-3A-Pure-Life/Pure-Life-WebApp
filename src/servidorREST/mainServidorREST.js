// .....................................................................
// mainServidorREST.js
// Fichero que inicializa el servidor REST
// Rubén Pardo Casanova 29/09/2021
// .....................................................................
const express = require('express')
const mysql = require( "mysql" );
const bodyParser = require('body-parser')
const cors = require('cors')
const Logica = require('../logica/Logica.js')
const BDCredenciales = require('../logica/Constantes/BDCredenciales.js')

//......................................................................
//......................................................................
function cargarLogica(){

    var laLogica = new Logica(  
        mysql.createConnection({
            host     : BDCredenciales.MYSQL.BD_HOST,
            user     : BDCredenciales.MYSQL.BD_USUARIO,
            password : BDCredenciales.MYSQL.BD_CONTRASENYA,
            database :  BDCredenciales.MYSQL.BD_NOMBRE
      })
    );


    return new Promise((resolver,rechazar)=>{
        laLogica.conectarBD(function(err){
            if(err){
                rechazar(err)
            }else{
                resolver(laLogica)
            }
        })// new
    })//Promise
}// ()


// .....................................................................
// main()
// .....................................................................
async function main() {
    // importamos la logica
    //var laLogica = await cargarLogica( "../bd/datos.bd" ) // base de datos sqlite
    var laLogica = await cargarLogica() // base de datos mysql
    
    // creo el servidor
    var servidorExpress = express()
    
    // para poder acceder a la carga de la petición http, asumiendo que es JSON
    servidorExpress.use(bodyParser.text({type :'application/json'}) )
    //servidorExpress.use(express.json());
    
    // permitir petciones externas (cors)
    servidorExpress.use(cors())
    // cargo las reglas REST
    var reglas = require("./ReglasREST.js")
   
    reglas.cargar(servidorExpress,laLogica)
 
    // arrancao el servidor
    var servicio = servidorExpress.listen( 8080, function() {
        console.log( "servidor REST escuchando en el puerto 8080 ")
    })

    // capturo control-c para cerrar el servicio ordenadamente
    process.on('SIGINT', function() {
        console.log (" terminando ")
        servicio.close ()
    })
} // ()


// .....................................................................
// .....................................................................
main()
// .....................................................................
// .....................................................................