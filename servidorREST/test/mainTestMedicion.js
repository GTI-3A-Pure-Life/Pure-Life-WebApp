// ........................................................
// mainTestMedicion.js
// Rubén Pardo Casanova 29/09/2021
// ........................................................
var request = require ('request')
var assert = require ('assert')
const Modelo = require( "../../Logica/Modelo.js" )
// ........................................................
// ........................................................
const IP_PUERTO="http://localhost:8080"

// ........................................................
// main ()
// ........................................................
describe( "Test 1 RECURSO MEDICION : Recuerda arrancar el servidor y que la bd esté vacía\n(primero arrancar el test de logica y luego este para que la bd esté limpia)", function() {
    
  
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
    it( "probar PUT medicion nueva /medicion", function( hecho ) {
        
        var a = new Modelo.MedicionCO2(null, 0, '2021-09-29', new Modelo.Posicion(30,30), 4, 'GTI-3A-1')
        
        
        request.put({ url : IP_PUERTO+"/medicion",
                      headers : { 'User-Agent' : 'Ruben', 'Content-Type' : 'application/json' },
                      body : a.toJSON()
                     },
                    function( err, respuesta, carga ) {
                        assert.equal( err, null, "¿ha habido un error?" )
                        assert.equal( respuesta.statusCode, 201, "¿El código no es 201 (Created ok)" )

                        var solucion = JSON.parse( carga )
                        assert.equal( solucion.mensaje, "Medicion creada correctamente", "¿El mensaje no es 'Medicion creada correctamente'?" )
                        hecho()
                    } // callback// callback
        ) // .put
    }) // it

     // ....................................................
    // ....................................................
    it( "probar PUT medicion usuario no existente /medicion", function( hecho ) {
        
        var a = new Modelo.MedicionCO2(null, 0, '2021-09-29', new Modelo.Posicion(30,30), -1, 'GTI-3A-1')
        
        
        request.put({ url : IP_PUERTO+"/medicion",
                      headers : { 'User-Agent' : 'Ruben', 'Content-Type' : 'application/json' },
                      body : a.toJSON()
                     },
                    function( err, respuesta, carga ) {
                        assert.equal( err, null, "¿ha habido un error?" )
                        assert.equal( respuesta.statusCode, 500, "¿El código no es 500 (Error)" )

                        var solucion = JSON.parse( carga )
                        assert.equal( solucion.mensaje, "El usuario o sensor no existe", "¿El mensaje no es 'El usuario o sensor no existe'?" )
                        hecho()
                    } // callback// callback


        ) // .put
    }) // it


    // ....................................................
    // ....................................................
    it( "probar PUT medicion sensor no existente /medicion", function( hecho ) {
        
        var a = new Modelo.MedicionCO2(null, 0, '2021-09-29', new Modelo.Posicion(30,30), 4, 'GTI-3A-')
        
        
        request.put({ url : IP_PUERTO+"/medicion",
                      headers : { 'User-Agent' : 'Ruben', 'Content-Type' : 'application/json' },
                      body : a.toJSON()
                     },
                     function( err, respuesta, carga ) {
                        assert.equal( err, null, "¿ha habido un error?" )
                        assert.equal( respuesta.statusCode, 500, "¿El código no es 500 (Error)" )

                        var solucion = JSON.parse( carga )
                        assert.equal( solucion.mensaje, "El usuario o sensor no existe", "¿El mensaje no es 'El usuario o sensor no existe'?" )
                        hecho()
                    } // callback// callback
        ) // .put
    }) // it

}) // describe
