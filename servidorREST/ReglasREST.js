// .....................................................................
// ReglasREST.js
// .....................................................................
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
    // PUT /persona
    // .......................................................
    servidorExpress.put('/medicion', async function( peticion, respuesta ){
        console.log( " * PUT /medicion " )
        // averiguo el dni
        var medicion = new Modelo.MedicionCO2(peticion.body);
        // llamo a la función adecuada de la lógica
        
        try{
            var res = await laLogica.publicarMedicionCO2(medicion)
            // todo ok 
            respuesta.status(201).send( JSON.stringify( {mensaje:"Medicion creada correctamente"} ) )
        }catch(error){
            
            if(error.errno == 1452){ // 1452 es el codigo de error en una clave ajena
                respuesta.status(500).send( JSON.stringify( {mensaje:"El usuario o sensor no existe"} ) )
            }else{
                respuesta.status(500).send( JSON.stringify( {mensaje:"Error desconocido"} ) )
            }
        }
    }) // put /persona

   


    
} // ()