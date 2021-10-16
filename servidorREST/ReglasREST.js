// .....................................................................
// ReglasREST.js
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
    // PUT /mediciones
    // .......................................................
    servidorExpress.put('/mediciones', async function( peticion, respuesta ){
        console.log( " * PUT /mediciones " )
        // construyo el array de mediciones
        var mediciones = new Array();
        var listaMedicionesJSON = JSON.parse(peticion.body).res;
        var mediciones = Modelo.MedicionCO2.jsonAListaMediciones(listaMedicionesJSON);
           
        try{
            var res = await laLogica.publicarMedicionesCO2(mediciones)
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
    // get /mediciones/ultimas/<cuantas>
    // .......................................................
    servidorExpress.get('/mediciones/ultimas/:cuantas', async function( peticion, respuesta ){
        console.log( " * GET /mediciones/ultimas/:cuantas " )
        
         // averiguo cuantas pidio
         var cuantas = peticion.params.cuantas

        try{
            var res = await laLogica.obtenerUltimasMediciones(cuantas)
            // todo ok 
            // si el array de resultados no tiene una casilla ...
            if( res.length == 0 ) {
                // 204: realizado ok pero sin resultados
                respuesta.status(204).send();
                return
            }
            // todo ok 
            respuesta.send( JSON.stringify( {mensaje:"ok",datos:res} ) )

        }catch(error){

            respuesta.status(500).send( JSON.stringify( {mensaje:error} ) )
        }
    }) // get /mediciones

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
            respuesta.send( JSON.stringify( {mensaje:"ok",datos:res} ) )

        }catch(error){

            respuesta.status(500).send( JSON.stringify( {mensaje:error} ) )
        }
    }) // get /mediciones


    
} // ()