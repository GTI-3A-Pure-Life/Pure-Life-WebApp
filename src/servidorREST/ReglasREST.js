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

    servidorExpress.post('/registro_estado_sensor/bateria', async function(peticion, respuesta) {

        console.log("POST */registro/bateria");
        let json = JSON.parse(peticion.body)["res"];
        let registro = new Modelo.RegistroEstadoSensor(null, 0, json.tieneBateriaBaja, 0, 0, json.uuidSensor, json.fechaHora);
// Luego tendré que parsear el resultado
        try {
            await laLogica.guardarRegistroBateriaSensor(registro);

            respuesta.status(201).send( JSON.stringify( {mensaje:"Registro creado correctamente"} ) )
        } catch (error) {
            if(error.sqlState == 45000) { // El trigger paró el insert porque el anterior es igual
                respuesta.status(200).send();
            } 

            else if(error.errno == 1452){ // 1452 es el codigo de error en una clave ajena
                respuesta.status(500).send( JSON.stringify( {mensaje:"No existe este sensor"} ) )
            }
            else{
                respuesta.status(500).send( JSON.stringify( {mensaje:"Error desconocido"} ) )
            }
        }
    })
    
} // ()