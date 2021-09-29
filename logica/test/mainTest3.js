// ........................................................
// mainTest1.js
// ........................................................
const Logica = require( "../Logica.js" )
var assert = require ('assert')

// ........................................................
// main ()
// ........................................................
describe( "Test 3: insertar una matriculación", function() {

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
    it( "puedo insertar una matriculacion",async function() {
        await laLogica.insertarPersona({dni: "1234A", nombre: "Pepe",apellidos: "García Pérez" } )
        await laLogica.insertarAsignatura({codigo: "13892", nombre: "Algebra"} )
        await laLogica.insertarMatriculaAlumno({codigo: "13892", dni: "1234A"} )
        var res = await laLogica.obtenerAlumnosMatriculadosPorCodigoAsignatura( "13892" )
        assert.equal( res.length, 1, "¿no hay un resulado?" )
        assert.equal( res[0].nombre, "Pepe", "¿no es Pepe?" )
        assert.equal( res[0].apellidos, "García Pérez", "¿no es García Pérez?" )
        assert.equal( res[0].dni, "1234A", "¿no es 1234A?" )
    }) // it

    // ....................................................
    // ....................................................
    it( "no puedo matricular al alumno en una asingatura dos veces",async function() {
        var error = null
        try {
            await laLogica.insertarMatriculaAlumno({codigo: "13892", dni: "1234A"} )
        } catch( err ) {
            error = err
        }
        assert( error, "¿Ha matriculado el alumno 1234A la asignatura 13892? (¿No ha pasado por el catch()?" )
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