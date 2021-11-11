// ........................................................
// mainTestMediciones.js 
// Tests de los endpoints de usuarios
// 09/11/2021 - Rubén Pardo Casanova
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
describe( "Test 3 USUARIO (login y registro) : Recuerda arrancar el servidor y que la bd esté vacía\n(primero arrancar el test de logica y luego este para que la bd esté limpia)", function() {


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
    it("Probar post/usuario/registrarse", function(hecho) {
        request.post({ url : IP_PUERTO+"/usuario/registrarse",
        headers : { 'User-Agent' : 'Ruben', 'Content-Type' : 'application/json' },
        body : JSON.stringify({"res":{nombre:"desde rest",telefono:"1234",rol:1,correo:"usuario3@gmail.com",contrasenya:"7110eda4d09e062aa5e4a390b0a572ac0d2c0220"}})
       },
      function( err, respuesta, carga ) {
          assert.equal( err, null, "¿ha habido un error?" )
          assert.equal( respuesta.statusCode, 200, "¿El código no es 200 (ok)" )

          var solucion = JSON.parse( carga )
          assert.equal( solucion.id > 0, true, "¿No devolvió ningun id?" )
          hecho()
          // callback
      }) // post
    }) // it

     // ....................................................
    // ....................................................
    it("Probar post/usuario/registrarse pero con correo ya en uso", function(hecho) {
        request.post({ url : IP_PUERTO+"/usuario/registrarse",
        headers : { 'User-Agent' : 'Ruben', 'Content-Type' : 'application/json' },
        body : JSON.stringify({"res":{nombre:"desde rest",telefono:"1234",rol:1,correo:"usuario3@gmail.com",contrasenya:"7110eda4d09e062aa5e4a390b0a572ac0d2c0220"}})
       },
      function( err, respuesta, carga ) {
          assert.equal( err, null, "¿ha habido un error?" )
          assert.equal( respuesta.statusCode, 400, "¿El código no es 400 (BAD REQUEST)" )

          var solucion = JSON.parse( carga )
          assert.equal( solucion.mensaje, "Este correo ya esta en uso", "¿El correo no es 'Este correo ya esta en uso'?" )
          hecho()
          // callback
      }) // post
    }) // it


    // ....................................................
    // ....................................................
    it("Probar post/usuario/iniciar_sesion", function(hecho) {
        request.post({ url : IP_PUERTO+"/usuario/iniciar_sesion",
        headers : { 'User-Agent' : 'Ruben', 'Content-Type' : 'application/json' },
        body : JSON.stringify({res:{correo:"usuario3@gmail.com",contrasenya:"7110eda4d09e062aa5e4a390b0a572ac0d2c0220"}})
       },
      function( err, respuesta, carga ) {
          assert.equal( err, null, "¿ha habido un error?" )
          assert.equal( respuesta.statusCode, 200, "¿El código no es 200 (ok)" )

          var solucion = JSON.parse( carga )
          assert.equal( solucion.correo, "usuario3@gmail.com", "¿El correo no es 'usuario@gmail.com'?" )
          hecho()
          // callback
      }) // post
    }) // it

    // ....................................................
    // ....................................................
    it("Probar post/usuario/iniciar_sesion credenciales erroneos", function(hecho) {
        request.post({ url : IP_PUERTO+"/usuario/iniciar_sesion",
        headers : { 'User-Agent' : 'Ruben', 'Content-Type' : 'application/json' },
        body : JSON.stringify({res:{correo:"usuario3@gmail.com",contrasenya:"---"}})
       },
      function( err, respuesta, carga ) {
          assert.equal( err, null, "¿ha habido un error?" )
          assert.equal( respuesta.statusCode, 401, "¿El código no es 401 (NOT AUTORITHED)" )

          var solucion = JSON.parse( carga )
          assert.equal( solucion.mensaje, "No existe el usuario", "¿El correo no es 'ENo existe el usuario'?" )
          hecho()
          // callback
      }) // post
    }) // it*/

    

    

}) // describe