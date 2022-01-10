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
const nodemailer = require('nodemailer');
require("dotenv").config();
const { request } = require('chai');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });
const path = require("path")

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
        
        try{
            // construyo el array de mediciones
            var mediciones = new Array();
            var listaMedicionesJSON = JSON.parse(peticion.body)["res"];
            var mediciones = Modelo.Medicion.jsonAListaMediciones(listaMedicionesJSON);


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
            // Lista<Medicion>
            var mediciones = await laLogica.obtenerTodasMediciones()
            
            // todo ok 
            // si el array de resultados no tiene una casilla ...
            if( mediciones.length == 0 ) {
                // 204: realizado ok pero sin resultados
                respuesta.status(204).send();
                return
            }
            // todo ok 
            respuesta.send(Modelo.Medicion.listaMedicionesAJSON(mediciones))

        }catch(error){
            respuesta.status(500).send(  {mensaje:error}  )
        }
    }) // get /mediciones

    // .......................................................
    // get /mediciones?idUsuario="+idUsuario+"&fecha_inicio="+fechaInicio+"&fecha_fin="+fechaFin,
    // .......................................................
    servidorExpress.get('/mediciones/usuario', async function( peticion, respuesta ){
        console.log( " * GET /mediciones/usuario?idUsuario=idUsuario&fecha_inicio=fechaInicio&fecha_fin=fechaFin" )
        
        let fechaInicio = peticion.query.fecha_inicio;
        let fechaFin = peticion.query.fecha_fin;
        let idUsuario = peticion.query.idUsuario;
        
        try{
            var mediciones = await laLogica.obtenerMedicionesDeHastaPorUsuario(fechaInicio,fechaFin,idUsuario)
            
            // todo ok 
            // si el array de resultados no tiene una casilla ...
            if( mediciones.length == 0 ) {
                // 204: realizado ok pero sin resultados
                respuesta.status(204).send();
                return
            }
            // todo ok 
            respuesta.send(Modelo.Medicion.listaMedicionesAJSON(mediciones))

        }catch(error){

            respuesta.status(500).send(  {mensaje:error}  )
        }
    }) // get /mediciones/usuario

     // .......................................................
    // get /mediciones?idUsuario="+idUsuario+"&fecha_inicio="+fechaInicio+"&fecha_fin="+fechaFin,
    // .......................................................
    servidorExpress.get('/mediciones/:fecha_inicio/:fecha_fin', async function( peticion, respuesta ){
        console.log( " * GET mediciones/:fecha_inicio/:fecha_fin" )
        
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
            
            respuesta.send(Modelo.Medicion.listaMedicionesAJSON(res))

        }catch(error){

            respuesta.status(500).send(  {mensaje:error}  )
        }
    }) // get /mediciones/usuario


    // .......................................................
    // GET/calidad_aire/usuario?fecha_inicio:Texto&fecha_fin:Texto&idUsuario:N
    // .......................................................
    servidorExpress.get('/calidad_aire/usuario', async function( peticion, respuesta ){
        console.log( " * GET /calidad_aire/usuario?fecha_inicio:Texto&fecha_fin:Texto&idUsuario:N" )
        
        let fechaInicio = peticion.query.fecha_inicio;
        let fechaFin = peticion.query.fecha_fin;
        let idUsuario = peticion.query.idUsuario;

        if(fechaInicio==null || fechaFin==null || idUsuario==null){
            respuesta.status(500).send(  {mensaje:"Faltan datos o algun parametro esta mal escrito"}  )
        }else{
            try{
                var res = await laLogica.obtenerCalidadAirePorTiempoYUsuario(fechaInicio,fechaFin,idUsuario)
                
                
                // todo ok 
                respuesta.send(res)

            }catch(error){

                respuesta.status(500).send(  {mensaje:error}  )
            }
        }
    }) // GET/calidad_aire/usuario?fecha_inicio:Texto&fecha_fin:Texto&idUsuario:N

     // .......................................................
    // GET/calidad_aire/zona?fecha_inicio:Texto&fecha_fin:Texto&latitud:R?longitud:R?radio:R
    // .......................................................
    servidorExpress.get('/calidad_aire/zona', async function( peticion, respuesta ){
        console.log( " * GET /calidad_aire/zona?fecha_inicio:Texto&fecha_fin:Texto&latitud:R&longitud:R&radio:R" )
        
        let fechaInicio = peticion.query.fecha_inicio;
        let fechaFin = peticion.query.fecha_fin;
        let latitud = peticion.query.latitud;
        let longitud = peticion.query.longitud;
        let radio = peticion.query.radio;

        if(fechaInicio==null || fechaFin==null || latitud==null || longitud==null || radio==null){
            respuesta.status(500).send(  {mensaje:"Faltan datos o algun parametro esta mal escrito"}  )
        }else{
            try{
                var res = await laLogica.obtenerCalidadAirePorTiempoYZona(fechaInicio,fechaFin,latitud,longitud,radio)
                
                
                // todo ok 
                respuesta.send(res)
    
            }catch(error){
    
                respuesta.status(500).send(  {mensaje:error}  )
            }
        }
        
        
    }) // GET/calidad_aire/zona?fecha_inicio:Texto&fecha_fin:Texto&latitud:R?longitud:R?radio:R


    servidorExpress.get('/registro_estado_sensor', async function( peticion, respuesta ){
        console.log( " * GET /registro_estado_sensor" )
        
        try{
            var res = await laLogica.obtenerRegistrosEstadoSensor()
            
            // todo ok 
            // si el array de resultados no tiene una casilla ...
            if( res.length == 0 ) {
                // 204: realizado ok pero sin resultados
                respuesta.status(204).send();
                return
            }
            // todo ok 
            let a = Modelo.RegistroEstadoSensor.formatearRawData(res);
            respuesta.send(a)

        }catch(error){

            respuesta.status(500).send(  {mensaje:error}  )
        }
    }) // get /mediciones/usuario

    // .......................................................
    // post /registro_estado_sensor/bateria
    // .......................................................
    servidorExpress.post('/registro_estado_sensor/bateria', async function(peticion, respuesta) {

        console.log("POST */registro/bateria");
        // creo el registro
        

        try {
            let json = JSON.parse(peticion.body)["res"];
            let registro = new Modelo.RegistroEstadoSensor(null, json.id, 0, json.tieneBateriaBaja, 0, 0, json.uuidSensor, json.fechaHora);
            
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
        

        try {
            // creo el registro
            let json = JSON.parse(peticion.body)["res"];
            let registro = new Modelo.RegistroEstadoSensor(null, json.id, 0, 0, json.estaAveriado, 0, json.uuidSensor, json.fechaHora);
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
    // post /registro_estado_sensor/averiado
    // .......................................................
    servidorExpress.post('/registro_estado_sensor/descalibrado', async function(peticion, respuesta) {

        console.log("POST */registro/descalibrado");
        

        try {
            // creo el registro
            let json = JSON.parse(peticion.body)["res"];
            let registro = new Modelo.RegistroEstadoSensor(null, json.id, json.descalibrado, 0, 0, 0, json.uuidSensor, json.fechaHora);
            let factorDescalibracion = json["factorDescalibracion"]
        
            await laLogica.guardarFactorCalibracionSensor(factorDescalibracion,json.uuidSensor);
            await laLogica.guardarRegistroCalibracionSensor(registro);
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
    // put /registro_estado_sensor/leido
    // @author Florescu, Lorena-Ioana
    // @version 24/11/2021
    // .......................................................
    servidorExpress.put('/registro_estado_sensor/leido', async function(peticion, respuesta) {

        console.log("PUT */registro/leido");
        // creo el registro
        let json = JSON.parse(peticion.body)["res"];
        let id = json.id;

        try {
            await laLogica.actualizar_leido(id);
            // todo ok
            respuesta.status(200).send( JSON.stringify( {mensaje:"Leido se ha actualizado correctamente"} ) )
        } catch (error) {
            
            respuesta.status(500).send( JSON.stringify( {mensaje:"Error desconocido"} ) )
            
        }
    })// post /registro_estado_sensor/leido

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
            if(error == "No existe el usuario") { 
                respuesta.status(401).send({mensaje:error.name});
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
        let token = body["res"]["token"];
        // creamos el usuarios
        let usuario = new Modelo.Usuario(null,null,correo,contrasenya,nombre,null,telefono,1, false, token)
        try {
            let usuarioRes = await laLogica.registrar_usuario(usuario);
            // todo ok
            respuesta.status(200).send({usuario: usuarioRes} )
        } catch (error) {
            if(error == "Este correo ya esta en uso") { 
                respuesta.status(400).send({mensaje:error.name});
            }else{
                respuesta.status(500).send( JSON.stringify( {mensaje:"Error desconocido"} ) )
            }
            
        }
    })// post /usuario/registrarse


    servidorExpress.get('/usuario/verificar/:token', async function(peticion, respuesta) {
        console.log("GET */usuario/verificar/:token");
        // obtenemos los datos de la peticion
        let token = peticion.params.token;

        try {
            let verificadoRes = await laLogica.obtenerUsuarioPorToken(token)
            verificadoRes.verificado = 1;
            await laLogica.verificar_usuario(verificadoRes.id, verificadoRes.verificado)
            //respuesta.status(200).sendFile(path.resolve(__dirname, "verificado.html"))
            respuesta.status(200).sendFile(path.resolve("C:/Users/Pablo/Desktop/Pure-Life-UX/src", "verificado.html"))

        } catch (error) {
            respuesta.status(500).send( JSON.stringify( {mensaje:"Error desconocido"} ) )
        }
    })

    servidorExpress.post('/usuario/mandar_correo', async function(peticion, respuesta) {
        console.log("POST */usuario/mandar_correo");
        // obtenemos los datos de la peticion
        let body = JSON.parse(peticion.body);
        let nombre = body["res"]["nombre"];
        let correo = body["res"]["correo"];
        let token = body["res"]["token"];

        transporter.sendMail({
            from: "no-reply@purelife.com",
            to: correo,
            subject: "Por favor, verifique su cuenta PureLife",
            html: `<h1>Estás a un paso de formar parte de PureLife</h1>
            <h2>Hola ${nombre}</h2>
            <p>Gracias por registrarte en PureLife. Por favor confirma tu dirección de email clicando en el siguiente enlace</p>
            <a href=http://localhost:8080/usuario/verificar/${token}> Clica aquí para verificar tu cuenta</a>
            </div>`
        }).catch(err => console.log(err));
        respuesta.status(201).send();
    })
}