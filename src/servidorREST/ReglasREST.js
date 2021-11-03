// .....................................................................
// ReglasREST.js
// Clase donde estan definidos todos los endpoints de REST
// Rubén Pardo Casanova 29/09/2021
// .....................................................................
const { json } = require('express')
const Modelo = require('../logica/Modelo.js')

module.exports.cargar = function( servidorExpress, laLogica ) {


    

    // .......................................................
    // GET /prueba
    // .......................................................
    servidorExpress.get('/prueba/', function( peticion, respuesta ){
        console.log( " * GET /prueba " )
        respuesta.send( "¡Funciona!" )
    }) // get /prueba
    
    
    // =====================================================================================================
    // MEDICION CO2
    // =====================================================================================================


    // .......................................................
    // POST /mediciones
    // .......................................................
    servidorExpress.post('/mediciones', async function( peticion, respuesta ){
        console.log( " * POST /mediciones " )
        // construyo el array de mediciones
        var mediciones = new Array();
        var listaMedicionesJSON = JSON.parse(peticion.body)["res"];
        var mediciones = Modelo.Medicion.jsonAListaMediciones(listaMedicionesJSON);

           
        try{
            var res = await laLogica.publicarMediciones(mediciones)
            // todo ok 
            respuesta.status(201).send( JSON.stringify( {mensaje:"Mediciones creadas correctamente"} ) )
        }catch(error){
            
            if(error.errno == 1452){ // 1452 es el codigo de error en una clave ajena
                respuesta.status(500).send( JSON.stringify( {mensaje:"El usuario o sensor no existe"} ) )
            }else{
                respuesta.status(500).send( JSON.stringify( {mensaje:"Error desconocido"} ) )
            }
        }
    }) // put /mediciones

   


    // .......................................................
    // get /mediciones
    // .......................................................
    servidorExpress.get('/mediciones', async function( peticion, respuesta ){
        console.log( " * GET /mediciones " )
        
        
        try{
            var res = await laLogica.obtenerTodasMediciones()
            
            
            // todo ok 
            // si el array de resultados no tiene una casilla ...
            if( res.length == 0 ) {
                // 204: realizado ok pero sin resultados
                respuesta.status(204).send();
                return
            }
            // todo ok 
            
            let a = Modelo.Medicion.formatearRAWBDData(res);
            respuesta.send(a)

        }catch(error){

            respuesta.status(500).send(  {mensaje:error}  )
        }
    }) // get /mediciones


    
} // ()