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
describe( "Test 1 RECURSO PERSONAS : Recuerda arrancar el servidor y que la bd esté vacía\n(primero arrancar el test de logica y luego este para que la bd esté limpia)", function() {
    
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
    it( "probar vacío GET /persona/<dni>", function( hecho ) {
        request.get({ url : IP_PUERTO+"/persona/1234B",
                      headers : { 'User-Agent' : 'Ruben', 'Content-Type' : 'application/json' },
                     },
        function( err, respuesta, carga ) {
            assert.equal( err, null, "¿ha habido un error?" )
            assert.equal( respuesta.statusCode, 404, "¿El código no es 404 (NOT FOUND)" )
            var solucion = JSON.parse(carga)
            assert.equal( solucion.mensaje, "no encontré dni: 1234B" , "¿El mensaje no es 'no encontré dni: 1234B'?" )
        
            // si el objeto esta vacio
            assert.equal( !Object.keys(solucion.datos).length, true, "¿Hay datos?" )
            
            hecho() 
                
        } // callback
        ) // .get
    }) // it
    

    // ....................................................
    // ....................................................
    it( "probar PUT persona nueva /persona", function( hecho ) {
        var datosPersona = { dni : "1234A", nombre : "Jose", apellidos : "García Pérez"}
        request.put({ url : IP_PUERTO+"/persona",
                      headers : { 'User-Agent' : 'Ruben', 'Content-Type' : 'application/json' },
                      body : JSON.stringify( datosPersona )
                     },
                    function( err, respuesta, carga ) {
                        assert.equal( err, null, "¿ha habido un error?" )
                        assert.equal( respuesta.statusCode, 201, "¿El código no es 201 (Created ok)" )

                        var solucion = JSON.parse( carga )
                        assert.equal( solucion.mensaje, "Persona creada correctamente", "¿El mensaje no es 'Persona creada correctamente'?" )
                        hecho()
                    } // callback// callback
        ) // .put
    }) // it

     // ....................................................
    // ....................................................
    it( "probar PUT persona existente /persona", function( hecho ) {
        var datosPersona = { dni : "1234A", nombre : "Pepa", apellidos : "García Pérez"}
        request.put({ url : IP_PUERTO+"/persona",
                      headers : { 'User-Agent' : 'Ruben', 'Content-Type' : 'application/json' },
                      body : JSON.stringify( datosPersona )
                     },
                    function( err, respuesta, carga ) {
                        assert.equal( err, null, "¿ha habido un error?" )
                        assert.equal( respuesta.statusCode, 500, "¿El código no es 500 (Error)" )

                        var solucion = JSON.parse( carga )
                        assert.equal( solucion.mensaje, "Ya existe una persona con ese DNI", "¿El mensaje no es 'Ya existe una persona con ese DNI'?" )
                        hecho()
                    } // callback// callback
        ) // .put
    }) // it


    // ....................................................
    // ....................................................
    it( "probar GET /persona/<dni>", function( hecho ) {
        // { dni : "1234A", nombre : "Jose", apellidos : "García Pérez"}
        request.get({ url : IP_PUERTO+"/persona/1234A",
                      headers : { 'User-Agent' : 'Ruben', 'Content-Type' : 'application/json' },
                    
                     },
        function( err, respuesta, carga ) {
            assert.equal( err, null, "¿ha habido un error?" )
            assert.equal( respuesta.statusCode, 200, "¿El código no es 200 (OK)" )
            var solucion = JSON.parse( carga )  
            assert.equal( solucion.mensaje, "ok", "¿El mensaje no es ok?" )
            assert.equal( solucion.datos.nombre, "Jose", "¿El nombre no es Jose?" )
            assert.equal( solucion.datos.apellidos, "García Pérez", "¿El nombre no es García Pérez?" )
            hecho()
        } // callback
        ) // .get
    }) // it

   
    // ....................................................
    // ....................................................
    it( "probar GET /personas", function( hecho ) {
        request.get({ url : IP_PUERTO+"/personas",
                      headers : { 'User-Agent' : 'Ruben', 'Content-Type' : 'application/json' },
                     },
                    function( err, respuesta, carga ) {
                        assert.equal( err, null, "¿ha habido un error?" )
                        assert.equal( respuesta.statusCode, 200, "¿El código no es 200 (ok)" )

                        var solucion = JSON.parse( carga )
                        assert.equal( solucion.mensaje, "ok", "¿El mensaje no es 'ok'?" )

                        // si tiene length es que hay una lista de objetos, vacía, con uno, etc...
                        assert.notEqual(solucion.datos.length, null,"¿No devuelve una lista?")

                        hecho()
                    } // callback// callback
        ) // .get
    }) // it

    // ....................................................
    // ....................................................
    it( "probar DELETE /persona/<dni>", function( hecho ) {
        request.delete({ url : IP_PUERTO+"/persona/1234A",
                      headers : { 'User-Agent' : 'Ruben', 'Content-Type' : 'application/json' },
                     },
                    function( err, respuesta, carga ) {
                        assert.equal( err, null, "¿ha habido un error?" )
                        assert.equal( respuesta.statusCode, 200, "¿El código no es 200 (ok)" )

                        var solucion = JSON.parse( carga )
                        assert.equal( solucion.mensaje, "Persona borrada correctamente", "¿El mensaje no es 'Persona borrada correctamente'?" )

                        hecho()
                    } // callback// callback
        ) // .delete
    }) // it


    // ....................................................
    // ....................................................
    it( "probar DELETE no existe /persona/<dni>", function( hecho ) {
        request.delete({ url : IP_PUERTO+"/persona/1234A",
                      headers : { 'User-Agent' : 'Ruben', 'Content-Type' : 'application/json' },
                     },
                    function( err, respuesta, carga ) {
                        assert.equal( err, null, "¿ha habido un error?" )
                        assert.equal( respuesta.statusCode, 404, "¿El código no es 404 (NOT FOUND)" )

                        var solucion = JSON.parse( carga )
                        assert.equal( solucion.mensaje, "No encontré dni: 1234A", "¿El mensaje no es 'No encontré dni: 1234A'?" )

                        hecho()
                    } // callback// callback
        ) // .delete
    }) // it

    // ....................................................
    // ....................................................
    it( "probar GET /personas vacio", function( hecho ) {
        request.get({ url : IP_PUERTO+"/personas",
                      headers : { 'User-Agent' : 'Ruben', 'Content-Type' : 'application/json' },
                     },
                    function( err, respuesta, carga ) {
                        assert.equal( err, null, "¿ha habido un error?" )
                        assert.equal( respuesta.statusCode, 204, "¿El código no es 200 (ok no content)" )

                        hecho()
                    } // callback// callback
        ) // .get
    }) // it

}) // describe
