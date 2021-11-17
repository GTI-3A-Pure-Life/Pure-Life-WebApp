// .......................................................
// ReglasREST.js
// Clase donde estan definidos todos los endpoints de REST
// Rubén Pardo Casanova 29/09/2021
// 
// Modificado por Pablo Enguix Llopis 04/11/2021
// Añadimos metodos POST/registro/bateria y POST /registro/averia
//.........................................................

const {json} = require('express')
const Modelo = require('../logica/Modelo.js')

module.exports.cargar = function(servidorExpress, laLogica){
    
    // .......................................................
    // GET /prueba
    // .......................................................
    servidorExpress.get('/prueba', async function( peticion, respuesta ){
        console.log( " * GET /prueba " )
        respuesta.send("¡Funciona!")
        
    }) // put /mediciones


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

    // .......................................................
    // get /mediciones
    // .......................................................
    servidorExpress.get('/mediciones/:fecha_inicio/:fecha_fin', async function( peticion, respuesta ){
        console.log( " * GET /mediciones/:fecha_inicio/:fecha_fin" )
        
        let fechaInicio = peticion.params.fecha_inicio;
        let fechaFin = peticion.params.fecha_fin;
        
        try{
            var res = await laLogica.obtenerMedicionesDeHasta(fechaInicio,fechaFin)
            
            
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

    // .......................................................
    // post /registro_estado_sensor/bateria
    // .......................................................
    servidorExpress.post('/registro_estado_sensor/bateria', async function(peticion, respuesta) {

        console.log("POST */registro/bateria");
        // creo el registro
        let json = JSON.parse(peticion.body)["res"];
        let registro = new Modelo.RegistroEstadoSensor(null, 0, json.tieneBateriaBaja, 0, 0, json.uuidSensor, json.fechaHora);

        try {
            await laLogica.guardarRegistroBateriaSensor(registro);
            // todo ok
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
    })// post /registro_estado_sensor/bateria

    // .......................................................
    // post /registro_estado_sensor/averiado
    // .......................................................
    servidorExpress.post('/registro_estado_sensor/averiado', async function(peticion, respuesta) {

        console.log("POST */registro/averiado");
        // creo el registro
        let json = JSON.parse(peticion.body)["res"];
        let registro = new Modelo.RegistroEstadoSensor(null, 0, 0, json.estaAveriado, 0, json.uuidSensor, json.fechaHora);

        try {
            await laLogica.guardarRegistroAveriaSensor(registro);
            // todo ok
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
    })// post /registro_estado_sensor/averiado


    // .......................................................
    // POST /usuario/iniciar_sesion
    // .......................................................
    servidorExpress.post('/usuario/iniciar_sesion', async function(peticion, respuesta) {

        console.log("POST */usuario/iniciar_sesion");
        // creo el registro
        let correo = JSON.parse(peticion.body)["res"]["correo"];
        let contrasenya = JSON.parse(peticion.body)["res"]["contrasenya"];

        try {
            let usuario = await laLogica.iniciar_sesion(correo,contrasenya);
            // todo ok
            respuesta.status(200).send( usuario.toJSON() )
        } catch (error) {
            if(error == "No existe el usuario") { // El trigger paró el insert porque el anterior es igual
                respuesta.status(401).send({mensaje:error});
            }else{
                respuesta.status(500).send( JSON.stringify( {mensaje:"Error desconocido"} ) )
            }
            
        }
    })// post /usuario/iniciar_sesion

    // .......................................................
    // POST /usuario/registrarse
    // .......................................................
    servidorExpress.post('/usuario/registrarse', async function(peticion, respuesta) {

        console.log("POST */usuario/registrarse");
        // obtenemos los datos de la peticion
        let body = JSON.parse(peticion.body);
        let correo = body["res"]["correo"];
        let contrasenya = body["res"]["contrasenya"];
        let nombre = body["res"]["nombre"];
        let telefono = body["res"]["telefono"];
        let rol = body["res"]["rol"];
        // creamos el usuarios
        let usuario = new Modelo.Usuario(null,null,correo,contrasenya,nombre,null,telefono,rol)
        try {
            let idUsuario = await laLogica.registrar_usuario(usuario);
            // todo ok
            respuesta.status(200).send({id:idUsuario} )
        } catch (error) {
            if(error == "Este correo ya esta en uso") { // El trigger paró el insert porque el anterior es igual
                respuesta.status(400).send({mensaje:error});
            }else{
                respuesta.status(500).send( JSON.stringify( {mensaje:"Error desconocido"} ) )
            }
            
        }
    })// post /usuario/registrarse

}