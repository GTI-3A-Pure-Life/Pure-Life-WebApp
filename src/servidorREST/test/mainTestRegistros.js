// ........................................................
// mainTestRegistros.js
// Clase de tests para probar los endpoints
// Pablo Enguix Llopis 03/11/2021
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
describe( "Test 2 RECURSO REGISTROS ESTADOS SENSOR : Recuerda arrancar el servidor y que la bd esté vacía\n(primero arrancar el test de logica y luego este para que la bd esté limpia)", function() {


    // ....................................................
    // ....................................................
   /* it( "probar que GET /prueba responde ¡Funciona!", function( hecho ) {
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
    it("Probar que post registro bateria funciona correctamente", function(hecho) {
        request.post({ url : IP_PUERTO+"/registro_estado_sensor/bateria",
        headers : { 'User-Agent' : 'Ruben', 'Content-Type' : 'application/json' },
        body : JSON.stringify({res: {
            "uuidSensor": "GTI-3A-1",
            "tieneBateriaBaja": 1,
            "fechaHora": "2021-10-29 12:39:00"
        } })
       },
      function( err, respuesta, carga ) {
          assert.equal( err, null, "¿ha habido un error?" )
          assert.equal( respuesta.statusCode, 201, "¿El código no es 201 (Created ok)" )

          var solucion = JSON.parse( carga )
          assert.equal( solucion.mensaje, "Registro creado correctamente", "¿El mensaje no es 'Registro creado correctamente'?" )
          hecho()
          // callback
      }) // post
    }) // it

    // ....................................................
    // ....................................................
    it("Probar que post registro bateria no duplica registros", function(hecho) {
        request.post({ url : IP_PUERTO+"/registro_estado_sensor/bateria",
        headers : { 'User-Agent' : 'Ruben', 'Content-Type' : 'application/json' },
        body : JSON.stringify({res: {
            "uuidSensor": "GTI-3A-1",
            "tieneBateriaBaja": 1,
            "fechaHora": "2021-10-29 12:40:00"
        } })
       },
      function( err, respuesta, carga ) {
          assert.equal( err, null, "¿ha habido un error?" )
          assert.equal( respuesta.statusCode, 200, "¿El código no es 200 (ok)" )

          hecho()
          // callback
      }) // post
    }) // it

    // ....................................................
    // ....................................................
    it("Probar que post registro bateria no hace registros en sensores inexistentes", function (hecho) {
        request.post({ url : IP_PUERTO+"/registro_estado_sensor/bateria",
        headers : { 'User-Agent' : 'Ruben', 'Content-Type' : 'application/json' },
        body : JSON.stringify({res: {
            "uuidSensor": "GTI-3A-2",
            "tieneBateriaBaja": 1,
            "fechaHora": "2021-10-29 12:41:00"
        } })
       },
      function( err, respuesta, carga ) {
          assert.equal( err, null, "¿ha habido un error?" )
          assert.equal( respuesta.statusCode, 500, "¿El código no es 500 (Error)" )

          var solucion = JSON.parse( carga )
          assert.equal( solucion.mensaje, "No existe este sensor", "¿El mensaje no es 'No existe este sensor'?" )
          hecho()
          // callback
      }) // post
    }) // it

    // registro/averiado

    // ....................................................
    // ....................................................
    it("Probar que post registro averiado funciona correctamente", function(hecho) {
        request.post({ url : IP_PUERTO+"/registro_estado_sensor/averiado",
        headers : { 'User-Agent' : 'Ruben', 'Content-Type' : 'application/json' },
        body : JSON.stringify({res: {
            "uuidSensor": "GTI-3A-1",
            "estaAveriado": 1,
            "fechaHora": "2021-10-29 15:39:00"
        } })
       },
      function( err, respuesta, carga ) {
          assert.equal( err, null, "¿ha habido un error?" )
          assert.equal( respuesta.statusCode, 201, "¿El código no es 201 (Created ok)" )

          var solucion = JSON.parse( carga )
          assert.equal( solucion.mensaje, "Registro creado correctamente", "¿El mensaje no es 'Registro creado correctamente'?" )
          hecho()
          // callback
      }) // post
    }) // it

    // ....................................................
    // ....................................................
    it("Probar que post registro averiado no duplica registros", function(hecho) {
        request.post({ url : IP_PUERTO+"/registro_estado_sensor/averiado",
        headers : { 'User-Agent' : 'Ruben', 'Content-Type' : 'application/json' },
        body : JSON.stringify({res: {
            "uuidSensor": "GTI-3A-1",
            "estaAveriado": 1,
            "fechaHora": "2021-10-29 15:40:00"
        } })
       },
      function( err, respuesta, carga ) {
          assert.equal( err, null, "¿ha habido un error?" )
          assert.equal( respuesta.statusCode, 200, "¿El código no es 200 (ok)" )

          hecho()
          // callback
      }) // post
    }) // it

    // ....................................................
    // ....................................................
    it("Probar que post registro averiado no hace registros en sensores inexistentes", function (hecho) {
        request.post({ url : IP_PUERTO+"/registro_estado_sensor/averiado",
        headers : { 'User-Agent' : 'Ruben', 'Content-Type' : 'application/json' },
        body : JSON.stringify({res: {
            "uuidSensor": "GTI-3A-2",
            "estaAveriado": 1,
            "fechaHora": "2021-10-29 15:41:00"
        } })
       },
      function( err, respuesta, carga ) {
          assert.equal( err, null, "¿ha habido un error?" )
          assert.equal( respuesta.statusCode, 500, "¿El código no es 500 (Error)" )

          var solucion = JSON.parse( carga )
          assert.equal( solucion.mensaje, "No existe este sensor", "¿El mensaje no es 'No existe este sensor'?" )
          hecho()
          // callback
      }) // post
    }) // it

    // ....................................................
    // ....................................................
    it("Probar que post registro bateria actualiza correctamente", function(hecho) {
        request.post({ url : IP_PUERTO+"/registro_estado_sensor/bateria",
        headers : { 'User-Agent' : 'Ruben', 'Content-Type' : 'application/json' },
        body : JSON.stringify({res: {
            "uuidSensor": "GTI-3A-1",
            "tieneBateriaBaja": 0,
            "fechaHora": "2021-10-29 12:39:00"
        } })
       },
      function( err, respuesta, carga ) {
          assert.equal( err, null, "¿ha habido un error?" )
          assert.equal( respuesta.statusCode, 201, "¿El código no es 201 (Created ok)" )

          var solucion = JSON.parse( carga )
          assert.equal( solucion.mensaje, "Registro creado correctamente", "¿El mensaje no es 'Registro creado correctamente'?" )
          hecho()
          // callback
      }) // post
    }) // it
*/
}) // describe