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
describe( "Test 2 RECURSO ASIGNATURAS : Recuerda arrancar el servidor y que la bd esté vacía\n(primero arrancar el test de logica y luego este para que la bd esté limpia)", function() {
    
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
    it( "probar vacío GET /asignatura/<codigo>", function( hecho ) {
        request.get({ url : IP_PUERTO+"/asignatura/0002",
                      headers : { 'User-Agent' : 'Ruben', 'Content-Type' : 'application/json' },
                     },
        function( err, respuesta, carga ) {
            assert.equal( err, null, "¿ha habido un error?" )
            assert.equal( respuesta.statusCode, 404, "¿El código no es 404 (NOT FOUND)" )
            var solucion = JSON.parse(carga)
            assert.equal( solucion.mensaje, "no encontré codigo: 0002" , "¿El mensaje no es 'no encontré codigo: 0002'?" )
        
            // si el objeto esta vacio
            assert.equal( !Object.keys(solucion.datos).length, true, "¿Hay datos?" )
            
            hecho() 
                
        } // callback
        ) // .get
    }) // it
    

    // ....................................................
    // ....................................................
    it( "probar PUT asignatura nueva /asignatura", function( hecho ) {
        var datosAsignatura = { codigo : "0001", nombre : "Mates"}
        request.put({ url : IP_PUERTO+"/asignatura",
                      headers : { 'User-Agent' : 'Ruben', 'Content-Type' : 'application/json' },
                      body : JSON.stringify( datosAsignatura ),
                      method:"PUT"
                     },
                    function( err, respuesta, carga ) {
                        assert.equal( err, null, "¿ha habido un error?" )
                        assert.equal( respuesta.statusCode, 201, "¿El código no es 201 (Created ok)" )

                        var solucion = JSON.parse( carga )
                        assert.equal( solucion.mensaje, "Asignatura creada correctamente", "¿El mensaje no es 'Asignatura creada correctamente'?" )
                        hecho()
                    } // callback// callback
        ) // .put
    }) // it

     // ....................................................
    // ....................................................
    it( "probar PUT persona existente /asingatura", function( hecho ) {
        var datosAsignatura = { codigo : "0001", nombre : "Mates"}
        request.put({ url : IP_PUERTO+"/asignatura",
                      headers : { 'User-Agent' : 'Ruben', 'Content-Type' : 'application/json' },
                      body : JSON.stringify( datosAsignatura )
                     },
                    function( err, respuesta, carga ) {
                        assert.equal( err, null, "¿ha habido un error?" )
                        assert.equal( respuesta.statusCode, 500, "¿El código no es 500 (Error)" )

                        var solucion = JSON.parse( carga )
                        assert.equal( solucion.mensaje, "Ya existe una asignatura con ese Codigo", "¿El mensaje no es 'Ya existe una asignatura con ese Codigo'?" )
                        hecho()
                    } // callback// callback
        ) // .put
    }) // it


    // ....................................................
    // ....................................................
    it( "probar GET /asignatura/<codigo>", function( hecho ) {
        // { dni : "1234A", nombre : "Jose", apellidos : "García Pérez"}
        request.get({ url : IP_PUERTO+"/asignatura/0001",
                      headers : { 'User-Agent' : 'Ruben', 'Content-Type' : 'application/json' },
                    
                     },
        function( err, respuesta, carga ) {
            assert.equal( err, null, "¿ha habido un error?" )
            assert.equal( respuesta.statusCode, 200, "¿El código no es 200 (OK)" )
            var solucion = JSON.parse( carga )  
            assert.equal( solucion.mensaje, "ok", "¿El mensaje no es ok?" )
            assert.equal( solucion.datos.codigo, "0001", "¿El nombre no es 0001?" )
            assert.equal( solucion.datos.nombre, "Mates", "¿El nombre no es Mates?" )
            hecho()
        } // callback
        ) // .get
    }) // it

   
    // ....................................................
    // ....................................................
    it( "probar GET /asignaturas", function( hecho ) {
        request.get({ url : IP_PUERTO+"/asignaturas",
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

}) // describe
