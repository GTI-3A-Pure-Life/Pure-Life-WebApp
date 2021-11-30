// ........................................................
// mainTestMediciones.js 
// Tests de la logica de negocio
// 09/11/2021 - Rubén Pardo Casanova
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
    /*var laLogica = null

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
    it( "borrar todas las filas de usuarios", async function() {
        await laLogica.borrarFilasDe(BDConstantes.TABLA_USUARIOS.NOMBRE_TABLA)
    }) // it


    // ....................................................
    // ....................................................
    it("Registrar nuevo usuario",async function(){
        var error = null
        var u = null
        try{
            var usuario = new Modelo.Usuario(null,null,"usuario@gmail.com","7110eda4d09e062aa5e4a390b0a572ac0d2c0220","prueba",null,"632145789",1)
            var res = await laLogica.registrar_usuario(usuario); // devuelve el id

            assert(res>0,true,"¿No ha devuelto el id del usuario registrado?")
         

        } catch( err ) {
            error = err
        }
    

    })// it

    // ....................................................
    // ....................................................
    it("Registrar nuevo usuario con correo ya existente",async function(){
        var error = null
        var u = null
        try{
            var usuario = new Modelo.Usuario(null,null,"usuario@gmail.com","7110eda4d09e062aa5e4a390b0a572ac0d2c0220","prueba",null,"632145789",1)
            var res = await laLogica.registrar_usuario(usuario); // devuelve el id

          

        } catch( err ) {
            error = err
            assert(error,"Este correo ya esta en uso","¿El error no es 'Este correo ya esta en uso'?")
        }
    

    })// it

    // ....................................................
    // ....................................................
    it("Iniciar sesion con credenciales buenos",async function(){
        var error = null
        var u = null
        try{
            // Usuario raw query
            var queryUsuario = await laLogica.iniciar_sesion('usuario@gmail.com','7110eda4d09e062aa5e4a390b0a572ac0d2c0220');
         

        } catch( err ) {
            error = err
        }
         u = Modelo.Usuario.UsuarioFromQueryData(queryUsuario); // Usuario
        assert.equal(error,null, "Hubo un error ¿No existe ese usuario?")
        assert.equal(u.correo, "usuario@gmail.com", "¿No se formateo bien el usuario? ¿El correo no es usuario@gmail.com?")
        assert.equal(u.nombre, "prueba", "¿No se formateo bien el usuario? ¿El nombre no es prueba?")

    

    })// it


    // ....................................................
    // ....................................................
    it("Iniciar sesion con credenciales malos",async function(){
        var error = null
        var u = null
        try{
            // Usuario raw query
            var queryUsuario = await laLogica.iniciar_sesion('usuario@gmail.com','--');
         

        } catch( err ) {
            error = err
        }
        
        assert.equal(error,"No existe el usuario", "Hubo un error ¿Existe ese usuario? ¿El mensaje no es 'No existe el usuario'")
      


    })// it*/
    
}) // describe