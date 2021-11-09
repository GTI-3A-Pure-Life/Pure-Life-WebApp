// ........................................................
// mainTestMediciones.js 
// Tests de la logica de negocio
// 29/09/2021 - Rubén Pardo Casanova
// ........................................................
const Logica = require( "../Logica.js" )
const BDCredenciales = require( "../Constantes/BDCredenciales.js" )
const BDConstantes = require( "../Constantes/BDConstantes.js" )
const Modelo = require( "../Modelo.js" )
var assert = require ('assert')

// ........................................................
// main ()
// ........................................................
describe( "Test RECURSO USUARIO", function() {

    // ....................................................
    // ....................................................
    var laLogica = null

    // ....................................................
    // ....................................................
    it( "conectar a la base de datos", function( hecho ) {
        laLogica = new Logica(BDCredenciales.MYSQL.BD_NOMBRE,
        function( err ) {
            if ( err ) {
                throw new Error ("No he podido conectar con datos.db")
            }
            hecho()
        })
    }) // it




    // ....................................................
    // ....................................................
    it("Iniciar sesion con credenciales buenos",async function(){
        var error = null
        var u = null
        try{
            // Usuario raw query
            var queryUsuario = await laLogica.iniciar_sesion('normal@gmail.com','7110eda4d09e062aa5e4a390b0a572ac0d2c0220');
         

        } catch( err ) {
            error = err
        }
         u = Modelo.Usuario.UsuarioFromQueryData(queryUsuario); // Usuario
        assert.equal(error,null, "Hubo un error ¿No existe ese usuario?")
        assert.equal(u.id, 1, "¿No se formateo bien el usuario?")

    

    })// it


    // ....................................................
    // ....................................................
    it("Iniciar sesion con credenciales malos",async function(){
        var error = null
        var u = null
        try{
            // Usuario raw query
            var queryUsuario = await laLogica.iniciar_sesion('normal@gmail.com','--');
         

        } catch( err ) {
            error = err
        }
        
        assert.equal(error,"No existe el usuario", "Hubo un error ¿Existe ese usuario? ¿El mensaje no es 'No existe el usuario'")
      


    })// it
    
}) // describe