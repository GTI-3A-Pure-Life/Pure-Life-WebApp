// ........................................................
// mainTestMedicion.js
// Clase de tests para probar los endpoints
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
    it( "probar POST mediciones nueva /mediciones", function( hecho ) {
        
       
        var mediciones = Array();
        mediciones.push(new Modelo.Medicion(null, 3, '2021-09-29 00:00:00', new Modelo.Posicion(38.995591,-0.16732), 29, 'GTI-3A-1',1));
        mediciones.push(new Modelo.Medicion(null, 4, '2021-09-29 01:00:00', new Modelo.Posicion(38.995591,-0.16732), 29, 'GTI-3A-1',1));
        mediciones.push(new Modelo.Medicion(null, 3, '2021-09-29 02:00:00', new Modelo.Posicion(38.995591,-0.16732), 29, 'GTI-3A-1',1));
        mediciones.push(new Modelo.Medicion(null, 20, '2021-09-29 03:00:00', new Modelo.Posicion(38.995591,-0.16732), 29, 'GTI-3A-1',1));
        mediciones.push(new Modelo.Medicion(null, 22, '2021-09-29 04:00:00', new Modelo.Posicion(38.995591,-0.16732), 29, 'GTI-3A-1',1));
        mediciones.push(new Modelo.Medicion(null, 3, '2021-09-29 05:00:00', new Modelo.Posicion(38.995591,-0.16732), 29, 'GTI-3A-1',1));
        mediciones.push(new Modelo.Medicion(null, 4, '2021-09-29 06:00:00', new Modelo.Posicion(38.995591,-0.16732), 29, 'GTI-3A-1',1));
        mediciones.push(new Modelo.Medicion(null, 1, '2021-09-29 07:00:00', new Modelo.Posicion(38.995591,-0.16732), 29, 'GTI-3A-1',1));
        mediciones.push(new Modelo.Medicion(null, 28, '2021-09-29 16:00:00', new Modelo.Posicion(50.995591,-0.16732), 29, 'GTI-3A-1',1));
        mediciones.push(new Modelo.Medicion(null, 0, '2021-09-29 02:00:00', new Modelo.Posicion(38.995366,-0.167041), 29, 'GTI-3A-1',2));
        mediciones.push(new Modelo.Medicion(null, 200, '2021-09-29 02:00:00', new Modelo.Posicion(80.995366,-0.167041), 29, 'GTI-3A-1',2));
        mediciones.push(new Modelo.Medicion(null, 190, '2021-09-29 03:00:00', new Modelo.Posicion(38.995591,-0.16732), 29, 'GTI-3A-1',3));
        mediciones.push(new Modelo.Medicion(null, 0.032, '2021-09-29 04:00:00', new Modelo.Posicion(38.995591,-0.16732), 29, 'GTI-3A-1',4));
        mediciones.push(new Modelo.Medicion(null, 0.1, '2021-09-29 04:01:00', new Modelo.Posicion(80.995591,-0.16732), 29, 'GTI-3A-1',4));

        var listaJSONmediciones = Modelo.Medicion.listaMedicionesAJSON(mediciones)
        
       request.post({ url : IP_PUERTO+"/mediciones",
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
    it( "probar POST medicion usuario no existente /medicion", function( hecho ) {
        
        var a = new Modelo.Medicion(null, 0, '2021-09-29', new Modelo.Posicion(30,30), -1, 'GTI-3A-1',1)
        
        var mediciones = Array();
        mediciones.push(a);
        var listaJSONmediciones = Modelo.Medicion.listaMedicionesAJSON(mediciones)

        request.post({ url : IP_PUERTO+"/mediciones",
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
    it( "probar POST mediciones sensor no existente /mediciones", function( hecho ) {
        
        var a = new Modelo.Medicion(null, 0, '2021-09-29', new Modelo.Posicion(30,30), 4, 'GTI-3A-',1)
        
        var mediciones = Array();
        mediciones.push(a);
        
        var listaJSONmediciones = Modelo.Medicion.listaMedicionesAJSON(mediciones)

        request.post({ url : IP_PUERTO+"/mediciones",
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

                        var listaMediciones = Modelo.Medicion.jsonAListaMediciones(solucion);
           
                        

                        // si el objeto esta vacio
                        assert.equal( listaMediciones.length, 14, "¿No hay 13 registros?" )
                        assert.equal( listaMediciones[13].valor, 0.1, "¿No se ha convertido a objeto medicion bien?" )
                        
                        hecho()
                    } // callback// callback
        ) // .get
    }) // it

    // ....................................................
    // ....................................................
    it( "probar GET /mediciones/:fecha_inicio/:fecha_fin", function( hecho ) {
        request.get({ url : IP_PUERTO+"/mediciones/2021-09-29 00:00:00/2021-09-29 03:00:00",
                      headers : { 'User-Agent' : 'Ruben', 'Content-Type' : 'application/json' },
                     },
                    function( err, respuesta, carga ) {
                        assert.equal( err, null, "¿ha habido un error?" )
                        assert.equal( respuesta.statusCode, 200, "¿El código no es 200 (ok)" )

                        var solucion = JSON.parse( carga )

                        var listaMediciones = Modelo.Medicion.jsonAListaMediciones(solucion);
           
                        

                        // si el objeto esta vacio
                        assert.equal( listaMediciones.length, 7, "¿No hay 7 registros ?" )
                        assert.equal( listaMediciones[6].valor, 190, "¿No se ha convertido a objeto medicion bien?" )
                        
                        hecho()
                    } // callback// callback
        ) // .get
    }) // it

     // ....................................................
    // ....................................................
    it( "probar GET /calidad_aire/usuario?fecha_inicio:Texto&fecha_fin:Texto&idUsuario:N", function( hecho ) {
        request.get({ url : IP_PUERTO+"/calidad_aire/usuario?fecha_inicio=2021-09-29 00:00:00&fecha_fin=2021-09-29 23:59:00&idUsuario=29",
                      headers : { 'User-Agent' : 'Ruben', 'Content-Type' : 'application/json' },
                     },

                    
                    function( err, respuesta, carga ) {
                        assert.equal( err, null, "¿ha habido un error?" )
                        assert.equal( respuesta.statusCode, 200, "¿El código no es 200 (ok)" )
                
                        var solucion = JSON.parse( carga )

                        assert.equal( solucion.length, 4, "¿No estan los 4 informes de calidad de aire ?" )
                        assert.equal( solucion[0].valor, 118.28, "¿El primer valor no es 92.74?" )
                        assert.equal( solucion[3].valor, 60.37, "¿El primer valor no es 60.37?" )
                        
                        hecho()
                    } // callback// callback
        ) // .get
    }) // it

     // ....................................................
    // ....................................................
    it( "probar GET /calidad_aire/zona?fecha_inicio:Texto&fecha_fin:Texto&latitud:R?longitud:R?radio:R", function( hecho ) {
        request.get({ url : IP_PUERTO+"/calidad_aire/zona?fecha_inicio=2021-09-29 00:00:00&fecha_fin=2021-09-29 23:59:00&latitud=38.995591&longitud=-0.167129&radio=18",
                      headers : { 'User-Agent' : 'Ruben', 'Content-Type' : 'application/json' },
                     },

                    
                    function( err, respuesta, carga ) {
                        assert.equal( err, null, "¿ha habido un error?" )
                        assert.equal( respuesta.statusCode, 200, "¿El código no es 200 (ok)" )

                        var solucion = JSON.parse( carga )
                
                        assert.equal( solucion.length, 4, "¿No estan los 4 informes de calidad de aire ?" )
                        assert.equal( solucion[0].valor, 90.73, "¿El primer valor no es 90.73?" )
                        assert.equal( solucion[3].valor, 29.63, "¿El primer valor no es 20.63?" )
                        
                        hecho()
                    } // callback// callback
        ) // .get
    }) // it




}) // describe
