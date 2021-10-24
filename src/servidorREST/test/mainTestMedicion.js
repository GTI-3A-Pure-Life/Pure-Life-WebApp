// ........................................................
// mainTestMedicion.js
// Clase de tests para probar los endpoints
// Rubén Pardo Casanova 29/09/2021
// ........................................................
var request = require ('request')
var assert = require ('assert')
const Modelo = require( "../../Logica/Modelo.js" )
const { MedicionCO2 } = require('../../Logica/Modelo.js')
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
    it( "probar vacío GET /mediciones", function( hecho ) {
        request.get({ url : IP_PUERTO+"/mediciones",
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
    it( "probar PUT mediciones nueva /mediciones", function( hecho ) {
        
        var a = new Modelo.MedicionCO2(null, 1, '2021-09-29 2:00:00', new Modelo.Posicion(30,30), 4, 'GTI-3A-1')
        var b = new Modelo.MedicionCO2(null, 2, '2021-09-29 2:10:00', new Modelo.Posicion(30,30), 4, 'GTI-3A-1')
        
        var mediciones = Array();
        mediciones.push(a);
        mediciones.push(b);
   
        var listaJSONmediciones = MedicionCO2.listaMedicionesAJSON(mediciones)
   
       request.put({ url : IP_PUERTO+"/mediciones",
                      headers : { 'User-Agent' : 'Ruben', 'Content-Type' : 'application/json' },
                      body : JSON.stringify({res: listaJSONmediciones })
                     },
                    function( err, respuesta, carga ) {
                        assert.equal( err, null, "¿ha habido un error?" )
                        assert.equal( respuesta.statusCode, 201, "¿El código no es 201 (Created ok)" )

                        var solucion = JSON.parse( carga )
                        assert.equal( solucion.mensaje, "Mediciones creadas correctamente", "¿El mensaje no es 'Mediciones creadas correctamente'?" )
                        hecho()
                    } // callback// callback
        ) // .put
    }) // it

     // ....................................................
    // ....................................................
    it( "probar PUT medicion usuario no existente /medicion", function( hecho ) {
        
        var a = new Modelo.MedicionCO2(null, 0, '2021-09-29', new Modelo.Posicion(30,30), -1, 'GTI-3A-1')
        
        var mediciones = Array();
        mediciones.push(a);
        var listaJSONmediciones = MedicionCO2.listaMedicionesAJSON(mediciones)

        request.put({ url : IP_PUERTO+"/mediciones",
                      headers : { 'User-Agent' : 'Ruben', 'Content-Type' : 'application/json' },
                      body : JSON.stringify({res: listaJSONmediciones })
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
    it( "probar PUT mediciones sensor no existente /mediciones", function( hecho ) {
        
        var a = new Modelo.MedicionCO2(null, 0, '2021-09-29', new Modelo.Posicion(30,30), 4, 'GTI-3A-')
        
        var mediciones = Array();
        mediciones.push(a);
        var listaJSONmediciones = MedicionCO2.listaMedicionesAJSON(mediciones)

        request.put({ url : IP_PUERTO+"/mediciones",
                      headers : { 'User-Agent' : 'Ruben', 'Content-Type' : 'application/json' },
                      body : JSON.stringify({res: listaJSONmediciones })
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
    it( "probar GET /mediciones", function( hecho ) {
        request.get({ url : IP_PUERTO+"/mediciones",
                      headers : { 'User-Agent' : 'Ruben', 'Content-Type' : 'application/json' },
                     },
                    function( err, respuesta, carga ) {
                        assert.equal( err, null, "¿ha habido un error?" )
                        assert.equal( respuesta.statusCode, 200, "¿El código no es 200 (ok)" )

                        var solucion = JSON.parse( carga )
                        assert.equal( solucion.mensaje, "ok", "¿El mensaje no es 'ok'?" )

                        var listaMediciones = Modelo.MedicionCO2.jsonAListaMediciones(solucion.datos);
           
                        

                        // si el objeto esta vacio
                        assert.equal( listaMediciones.length, 2, "¿No hay datos?" )
                        assert.equal( listaMediciones[1].valor, 2, "¿No se ha convertido a objeto medicionco2 bien?" )
                        
                        hecho()
                    } // callback// callback
        ) // .get
    }) // it

    // ....................................................
    // ....................................................
    it( "probar GET /mediciones/ultimas/:cuantas", function( hecho ) {
        request.get({ url : IP_PUERTO+"/mediciones/ultimas/1",
                      headers : { 'User-Agent' : 'Ruben', 'Content-Type' : 'application/json' },
                     },
                    function( err, respuesta, carga ) {
                        assert.equal( err, null, "¿ha habido un error?" )
                        assert.equal( respuesta.statusCode, 200, "¿El código no es 200 (ok)" )

                        var solucion = JSON.parse( carga )
                        assert.equal( solucion.mensaje, "ok", "¿El mensaje no es 'ok'?" )

                        var listaMediciones = Modelo.MedicionCO2.jsonAListaMediciones(solucion.datos);
           
                        

                        // si el objeto esta vacio
                        assert.equal( listaMediciones.length, 1, "¿No hay datos?" )
                        assert.equal( listaMediciones[0].valor, 2, "¿No se ha convertido a objeto medicionco2 bien?" )
                        
                        hecho()
                    } // callback// callback
        ) // .get
    }) // it


}) // describe
