// .....................................................................
// mainServidorREST.js
// .....................................................................
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Logica = require('../logica/Logica.js')
const BDCredenciales = require('../logica/Constantes/BDCredenciales.js')

//......................................................................
//......................................................................
function cargarLogica(fichero){
    return new Promise((resolver,rechazar)=>{
        var laLogica =  new Logica(fichero,function(err){
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
    var laLogica = await cargarLogica( BDCredenciales.MYSQL.BD_NOMBRE ) // base de datos mysql
    
    // creo el servidor
    var servidorExpress = express()
    
    // para poder acceder a la carga de la petición http, asumiendo que es JSON
    servidorExpress.use(bodyParser.text({type :'application/json'}) )
    
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