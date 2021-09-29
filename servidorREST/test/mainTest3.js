// ........................................................
// mainTest1.js
// ........................................................
var request = require ('request')
var assert = require ('assert')
// ........................................................
// ........................................................
const IP_PUERTO="http://localhost:8080"

// ........................................................
// main ()
// ........................................................
describe( "Test 3 RECURSO MATRICULACION : Recuerda arrancar el servidor y que la bd esté vacía\n(primero arrancar el test de logica y luego este para que la bd esté limpia)", function() {
    
    // ....................................................
    // ....................................................
    it( "probar que GET /prueba responde ¡Funciona!", function( hecho ) {
        request.get(
            { url : IP_PUERTO+"/prueba", headers : { 'User-Agent' : 'Ruben' }},          
            function( err, respuesta, carga ) {
                assert.equal( err, null, "¿ha habido un error?" )
                assert.equal( respuesta.statusCode, 200, "¿El código no es 200 (OK)" )
                assert.equal( carga, "¡Funciona!", "¿La carga no es ¡Funciona!?" )
                hecho()
            } // callback()
        ) // .get
    }) // it
    

    

    // ....................................................
    // ....................................................
    it( "probar PUT matriculacion nueva /matricualcion", function( hecho ) {
        var datosPersona = { dni : "1234A", nombre : "Nombre", apellidos : "Apellido"}
        request.put({ url : IP_PUERTO+"/persona",
                      headers : { 'User-Agent' : 'Ruben', 'Content-Type' : 'application/json' },
                      body : JSON.stringify( datosPersona )
                     },
                    function( err, respuesta, carga ) {} // callback// callback
        ) // .put


        var datosAsignatura = { codigo : "0001", dni : "1234A"}
        request.put({ url : IP_PUERTO+"/matriculacion",
                      headers : { 'User-Agent' : 'Ruben', 'Content-Type' : 'application/json' },
                      body : JSON.stringify( datosAsignatura ),
                      method:"PUT"
                     },
                    function( err, respuesta, carga ) {
                        assert.equal( err, null, "¿ha habido un error?" )
                        assert.equal( respuesta.statusCode, 201, "¿El código no es 201 (Created ok)" )
                       
                        var solucion = JSON.parse( carga )
                        assert.equal( solucion.mensaje, "Persona matriculada correctamente", "¿El mensaje no es 'Persona matriculada correctamente'?" )
                        hecho()
                    } // callback// callback
        ) // .put
    }) // it

    // ....................................................
    // ....................................................
    it( "probar PUT matriculacion existente /matricualcion", function( hecho ) {
        var datosMatriculacion = { codigo : "0001", dni : "1234A"}
        request.put({ url : IP_PUERTO+"/matriculacion",
                      headers : { 'User-Agent' : 'Ruben', 'Content-Type' : 'application/json' },
                      body : JSON.stringify( datosMatriculacion ),
                      method:"PUT"
                     },
                    function( err, respuesta, carga ) {
                        assert.equal( err, null, "¿ha habido un error?" )
                        assert.equal( respuesta.statusCode, 500, "¿El código no es 500 (Error)" )

                        var solucion = JSON.parse( carga )
                        assert.equal( solucion.mensaje, "Esa persona ya está matriculada en esa asignatura", "¿El mensaje no es 'Esa persona ya está matriculada en esa asignatura'?" )
                        hecho()


                    } // callback// callback
        ) // .put
    }) // it



    // ....................................................
    // ....................................................
    it( "probar GET /matriculacion/por-apellido/<apellido>", function( hecho ) {
        request.get({ url : IP_PUERTO+"/matriculacion/por-apellido/Apellido",
                      headers : { 'User-Agent' : 'Ruben', 'Content-Type' : 'application/json' },
                     },
        function( err, respuesta, carga ) {
            assert.equal( err, null, "¿ha habido un error?" )
            assert.equal( respuesta.statusCode, 200, "¿El código no es 200 (OK)" )

            var respuesta = JSON.parse(carga);

            assert.equal(respuesta.mensaje,"ok","¿El mensaje no es 'ok'?")
            assert.equal(respuesta.datos.length,1,"¿No hay datos?")
            assert.equal(respuesta.datos[0].codigo,"0001","¿El codigo no es 0001?")
            assert.equal(respuesta.datos[0].nombre,"Mates","¿El nombre no es Mates?")
         
            hecho() 
                
        } // callback
        ) // .get
    }) // it
    
    // ....................................................
    // ....................................................
    it( "probar GET /matriculacion/por-codigo/<codigo>", function( hecho ) {
        request.get({ url : IP_PUERTO+"/matriculacion/por-codigo/0001",
                      headers : { 'User-Agent' : 'Ruben', 'Content-Type' : 'application/json' },
                     },
        function( err, respuesta, carga ) {
            assert.equal( err, null, "¿ha habido un error?" )
            assert.equal( respuesta.statusCode, 200, "¿El código no es 200 (OK)" )

            var respuesta = JSON.parse(carga);

            assert.equal(respuesta.mensaje,"ok","¿El mensaje no es 'ok'?")
            assert.equal(respuesta.datos.length,1,"¿No hay datos?")
            assert.equal(respuesta.datos[0].dni,"1234A","¿El dni no es 1234A?")
            assert.equal(respuesta.datos[0].nombre,"Nombre","¿El nombre no es Nombre?")
            assert.equal(respuesta.datos[0].apellidos,"Apellido","¿El apellido no es Apellido?")
         
            hecho() 
                
        } // callback
        ) // .get
    }) // it


    // ....................................................
    // ....................................................
    it( "probar DELETE /matriculacion", function( hecho ) {
        var datosMatriculacion = { codigo : "0001", dni : "1234A"}
        request.delete({ url : IP_PUERTO+"/matriculacion",
                      headers : { 'User-Agent' : 'Ruben', 'Content-Type' : 'application/json' },
                      body: JSON.stringify(datosMatriculacion)
                     },
                    function( err, respuesta, carga ) {
                        assert.equal( err, null, "¿ha habido un error?" )
                        assert.equal( respuesta.statusCode, 200, "¿El código no es 200 (ok)" )
                        console.log("carga delete matr existe");
                        console.log(carga);
                        var solucion = JSON.parse( carga )
                        assert.equal( solucion.mensaje, "Persona desmatriculada correctamente", "¿El mensaje no es 'Persona desmatriculada correctamente'?" )

                        hecho()
                    } // callback// callback
        ) // .delete
    }) // it

    // ....................................................
    // ....................................................
    it( "probar DELETE /matriculacion que no existe", function( hecho ) {
        var datosMatriculacion = { codigo : "NO EXISTE", dni : "1234A"}
        request.delete({ url : IP_PUERTO+"/matriculacion",
                      headers : { 'User-Agent' : 'Ruben', 'Content-Type' : 'application/json' },
                      body: JSON.stringify(datosMatriculacion)
                     },
                    function( err, respuesta, carga ) {
                        assert.equal( err, null, "¿ha habido un error?" )
                        assert.equal( respuesta.statusCode, 404, "¿El código no es 404 (NOT FOUND)" )
                        
                        console.log("carga delete matr no existe");
                        console.log(carga);
                        
                        

                        var solucion = JSON.parse( carga )
                        assert.equal( solucion.mensaje, "La persona con dni: 1234A no está matriculada en la asignatura con código: NO EXISTE", 
                                    "¿El mensaje no es 'La persona con dni: 1234A no está matriculada en la asignatura con código: NO EXISTE'?" )

                        hecho()
                    } // callback// callback
        ) // .delete
    }) // it


    // ....................................................
    // ....................................................
    it( "probar vacío GET /matriculacion/por-apellido/<apellido>", function( hecho ) {
        request.get({ url : IP_PUERTO+"/matriculacion/por-apellido/Apellido",
                      headers : { 'User-Agent' : 'Ruben', 'Content-Type' : 'application/json' },
                     },
        function( err, respuesta, carga ) {
            assert.equal( err, null, "¿ha habido un error?" )
            assert.equal( respuesta.statusCode, 204, "¿El código no es 204 (OK NO CONTENT)" )
         
            hecho() 
                
        } // callback
        ) // .get
    }) // it
    
    // ....................................................
    // ....................................................
    it( "probar vacío GET /matriculacion/por-codigo/<codigo>", function( hecho ) {
        request.get({ url : IP_PUERTO+"/matriculacion/por-codigo/Codigo",
                      headers : { 'User-Agent' : 'Ruben', 'Content-Type' : 'application/json' },
                     },
        function( err, respuesta, carga ) {
            assert.equal( err, null, "¿ha habido un error?" )
            assert.equal( respuesta.statusCode, 204, "¿El código no es 204 (OK NO CONTENT)" )
         
            hecho() 
                
        } // callback
        ) // .get
    }) // it
 

}) // describe
