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
    // PERSONA
    // =====================================================================================================

    // .......................................................
    // GET /persona/<dni>
    // .......................................................
    servidorExpress.get('/persona/:dni', async function( peticion, respuesta ){
            console.log( " * GET /persona " )
            // averiguo el dni
            var dni = peticion.params.dni
            // llamo a la función adecuada de la lógica
            var res = await laLogica.buscarPersonaConDNI( dni )
            // si el array de resultados no tiene una casilla ...
            if( res.length != 1 ) {
                // 404: not found
                respuesta.status(404).send( JSON.stringify( {mensaje:"no encontré dni: " + dni,datos:{}} ) )
                return
            }
            // todo ok 
            respuesta.send( JSON.stringify( {mensaje:"ok",datos:res[0]} ) )
        }) // get /persona



    // .......................................................
    // GET /personas
    // .......................................................
    servidorExpress.get('/personas', async function( peticion, respuesta ){
        console.log( " * GET /personas " )
        // averiguo el dni
        var dni = peticion.params.dni
        // llamo a la función adecuada de la lógica
        var res = await laLogica.obtenerTodasPersonas( )
        // si el array de resultados no tiene una casilla ...
        if( res.length == 0 ) {
            // 204: realizado ok pero sin resultados
            respuesta.status(204).send();
            return
        }
        // todo ok 
        respuesta.send( JSON.stringify( {mensaje:"ok",datos:res} ) )
    }) // get /personas

    // .......................................................
    // PUT /persona
    // .......................................................
    servidorExpress.put('/persona', async function( peticion, respuesta ){
        console.log( " * PUT /persona " )
        // averiguo el dni
        var persona = JSON.parse(peticion.body);
        // llamo a la función adecuada de la lógica
        
        try{
            var res = await laLogica.insertarPersona(persona)
            // todo ok 
            respuesta.status(201).send( JSON.stringify( {mensaje:"Persona creada correctamente"} ) )
        }catch(error){
            // ya existe el dni
            if(error.message.includes("UNIQUE constraint failed")){
                respuesta.status(500).send( JSON.stringify( {mensaje:"Ya existe una persona con ese DNI"} ) )
            }else{
                respuesta.status(500).send( JSON.stringify( {mensaje:"Error desconocido"} ) )
            }
        }
    }) // put /persona

    // .......................................................
    // DELETE /persona
    // .......................................................
    servidorExpress.delete('/persona/:dni', async function( peticion, respuesta ){
        console.log( " * DELETE /persona/:dni " )
        // averiguo el dni
        var dni = peticion.params.dni
 
        // llamo a la función adecuada de la lógica
        var res = await laLogica.borrarPersona( dni )
        // res ==  filtas afectadas
        // si no se ha afectado ninguna es que no existe ese dni
        if( res != 1 ) {
            // 404: not found
            respuesta.status(404).send( JSON.stringify( {mensaje:"No encontré dni: " + dni,datos:{}} ) )
            return
        }
        // todo ok 
        respuesta.send( JSON.stringify( {mensaje:"Persona borrada correctamente"} ) )
        
    }) // delete /persona

    // =====================================================================================================
    // Asignatura
    // =====================================================================================================
    
    // .......................................................
    // GET /asignatura/<codigo>
    // .......................................................
    servidorExpress.get('/asignatura/:codigo', async function( peticion, respuesta ){
        console.log( " * GET /asignatura " )
        // averiguo el dni
        var codigo = peticion.params.codigo
        // llamo a la función adecuada de la lógica
        var res = await laLogica.buscarAsignaturaConCodigo( codigo )
        // si el array de resultados no tiene una casilla ...
        if( res.length != 1 ) {
            // 404: not found
            respuesta.status(404).send( JSON.stringify( {mensaje:"no encontré codigo: " + codigo,datos:{}} ) )
            return
        }
        // todo ok 
        respuesta.send( JSON.stringify( {mensaje:"ok",datos:res[0]} ) )
    }) // get /asignatura

    // .......................................................
    // GET /asignaturas
    // .......................................................
    servidorExpress.get('/asignaturas', async function( peticion, respuesta ){
        console.log( " * GET /asignaturas " )
        // llamo a la función adecuada de la lógica
        var res = await laLogica.obtenerTodasAsignaturas()
        // si el array de resultados no tiene una casilla ...
        if( res.length == 0 ) {
            // 204: realizado ok pero sin resultados
            respuesta.status(204).send();
            return
        }
        // todo ok 
        respuesta.send( JSON.stringify( {mensaje:"ok",datos:res} ) )
    }) // get /asignaturas

    // .......................................................
    // PUT /asignatura
    // .......................................................
    servidorExpress.put('/asignatura', async function( peticion, respuesta ){
        console.log( " * PUT /asignatura " )
        // averiguo el dni
        var asignatura = JSON.parse(peticion.body);
        // llamo a la función adecuada de la lógica
        
        try{
            var res = await laLogica.insertarAsignatura(asignatura)
            // todo ok 
            respuesta.status(201).send( JSON.stringify( {mensaje:"Asignatura creada correctamente"} ) )
        }catch(error){
            // ya existe el dni
            if(error.message.includes("UNIQUE constraint failed")){
                respuesta.status(500).send( JSON.stringify( {mensaje:"Ya existe una asignatura con ese Codigo"} ) )
            }else{
                respuesta.status(500).send( JSON.stringify( {mensaje:"Error desconocido:"+error} ) )
            }
        }
    }) // put /asignatura


    // =====================================================================================================
    //  Matriculación
    // =====================================================================================================

    // .......................................................
    // GET /matriculacion/<apellido>
    // .......................................................
    servidorExpress.get('/matriculacion/por-apellido/:apellido', async function( peticion, respuesta ){
        console.log( " * GET /matriculacion " )
        // averiguo el dni
        var apellido = peticion.params.apellido
        // llamo a la función adecuada de la lógica
        var res = await laLogica.obtenerMatriculacionesAlumnoPorApellido( apellido )
        // si el array de resultados no tiene una casilla ...
        if( res.length == 0 ) {
            // 204: no hay resultados
            respuesta.status(204).send()
            return
        }
        // todo ok 
        respuesta.send( JSON.stringify( {mensaje:"ok",datos:res} ) )
    }) // get /matriculacion

    // .......................................................
    // GET /matriculacion/<codigo>
    // .......................................................
    servidorExpress.get('/matriculacion/por-codigo/:codigo', async function( peticion, respuesta ){
        console.log( " * GET /matriculacion " )
        // averiguo el dni
        var codigo = peticion.params.codigo
        // llamo a la función adecuada de la lógica
        var res = await laLogica.obtenerAlumnosMatriculadosPorCodigoAsignatura( codigo )
        // si el array de resultados no tiene una casilla ...
        if( res.length == 0 ) {
            // 204: no hay resultados
            respuesta.status(204).send()
            return
        }
        // todo ok 
        respuesta.send( JSON.stringify( {mensaje:"ok",datos:res} ) )
    }) // get /matriculacion

    // .......................................................
    // PUT /matriculacion
    // .......................................................
    servidorExpress.put('/matriculacion', async function( peticion, respuesta ){
        console.log( " * PUT /matriculacion " )

        var matriculacion = JSON.parse(peticion.body);
    
        
        try{
            var res = await laLogica.insertarMatriculaAlumno(matriculacion)
            // todo ok 
            respuesta.status(201).send( JSON.stringify( {mensaje:"Persona matriculada correctamente"} ) )
        }catch(error){
            // ya existe el dni
            if(error.message.includes("UNIQUE constraint failed")){
                respuesta.status(500).send( JSON.stringify( {mensaje:"Esa persona ya está matriculada en esa asignatura"} ) )
            }
            // el codigo o el dni no existe
            else if(error.message.includes("FOREIGN KEY") && error.message.includes("IS INVALID")){
                respuesta.status(404).send( JSON.stringify( {mensaje:"No existe esa persona/asignatura"} ) )
            }else{
                respuesta.status(500).send( JSON.stringify( {mensaje:"Error desconocido:"+error} ) )
            }
        }
    }) // put /matriculacion

    // .......................................................
    // DELETE /matriculacion
    // .......................................................
    servidorExpress.delete('/matriculacion', async function( peticion, respuesta ){
        console.log( " * DELETE /matriculacion " )

        var matriculacion = JSON.parse(peticion.body);
    
        var res = await laLogica.deleteMatriculaAlumno(matriculacion)
     
        // si se ha modificado alguna lines se ha borrado
        if(res == 1){
            // todo ok 
            respuesta.status(200).send( JSON.stringify( {mensaje:"Persona desmatriculada correctamente"} ) )
        }else{
            // todo ok 
            respuesta.status(404).send( JSON.stringify( {mensaje:"La persona con dni: " + matriculacion.dni + " no está matriculada en la asignatura con código: "+ matriculacion.codigo} ) )
        }
        
    }) // delete /matriculacion


    
} // ()