// ........................................................
// mainTest1.js
// ........................................................
const Logica = require( "../Logica.js" )
var assert = require ('assert')

// ........................................................
// main ()
// ........................................................
describe( "Test 1: insertar una persona", function() {

    // ....................................................
    // ....................................................
    var laLogica = null

    // ....................................................
    // ....................................................
    it( "conectar a la base de datos", function( hecho ) {
        laLogica = new Logica("../bd/datos.bd",
        function( err ) {
            if ( err ) {
                throw new Error ("No he podido conectar con datos.db")
            }
            hecho()
        })
    }) // it

    // ....................................................
    // ....................................................
    it( "borrar todas las filas", async function() {
        await laLogica.borrarFilasDeTodasLasTablas()
    }) // it

    // ....................................................
    // ....................................................
    it( "puedo insertar una persona",async function() {
        await laLogica.insertarPersona({dni: "1234A", nombre: "Pepe",apellidos: "García Pérez" } )
        var res = await laLogica.buscarPersonaConDNI( "1234A" )
        assert.equal( res.length, 1, "¿no hay un resulado?" )
        assert.equal( res[0].dni, "1234A", "¿no es 1234A?" )
        assert.equal( res[0].nombre, "Pepe", "¿no es Pepe?" )
    }) // it

    // ....................................................
    // ....................................................
    it( "no puedo insertar una persona con dni que ya está",async function() {
        var error = null
        try {
            await laLogica.insertarPersona({dni: "1234A", nombre: "Pepa",apellidos: "Pérez Pérez" } )
        } catch( err ) {
            error = err
        }
        assert( error, "¿Ha insertado el dni que ya estaba 1234A? (¿No ha pasado por el catch()?" )
    }) // it

    // ....................................................
    // ....................................................
    it( "cerrar conexión a la base de datos",async function() {
        try {
            await laLogica.cerrar()
        } catch( err ) {
        // assert.equal( 0, 1, "cerrar conexión a BD fallada: " + err)
        throw new Error( "cerrar conexión a BD fallada: " + err)
        }
    }) // it
    
}) // describe