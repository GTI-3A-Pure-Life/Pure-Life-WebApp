// ........................................................
// mainTest1.js
// ........................................................
const Logica = require( "../Logica.js" )
var assert = require ('assert')

// ........................................................
// main ()
// ........................................................
describe( "Test 2: insertar una asignatura", function() {

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
    it( "puedo insertar una asingatura",async function() {
        await laLogica.insertarAsignatura({codigo: "13892", nombre: "Algebra"} )
        var res = await laLogica.buscarAsignaturaConCodigo( "13892" )
        assert.equal( res.length, 1, "¿no hay un resulado?" )
        assert.equal( res[0].codigo, "13892", "¿no es 13892?" )
        assert.equal( res[0].nombre, "Algebra", "¿no es Algebra?" )
    }) // it

    // ....................................................
    // ....................................................
    it( "no puedo insertar una asignatura con codigo que ya está",async function() {
        var error = null
        try {
            await laLogica.insertarAsignatura({codigo: "13892", nombre: "Alegbra21" })
        } catch( err ) {
            error = err
        }
        assert( error, "¿Ha insertado el codigo que ya estaba 13892? (¿No ha pasado por el catch()?" )
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