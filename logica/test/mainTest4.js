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
    it( "puedo obtener las matriculaciones de un alumno",async function() {
        await laLogica.insertarPersona({dni: "1234A", nombre: "Pepe",apellidos: "García Pérez" } )
        // creamos dos asignaturas
        await laLogica.insertarAsignatura({codigo: "13892", nombre: "Algebra"} )
        await laLogica.insertarAsignatura({codigo: "13893", nombre: "Algebra 2"} )
        // matriculamos al alumno en las dos
        await laLogica.insertarMatriculaAlumno({codigo: "13892", dni: "1234A"} )
        await laLogica.insertarMatriculaAlumno({codigo: "13893", dni: "1234A"} )

        var res = await laLogica.obtenerMatriculacionesAlumnoPorApellido( "García Pérez" )
        assert.equal( res.length, 2, "¿no hay un resulado? ¿no se han añadido todas?" )
        assert.equal( res[0].codigo, "13892", "¿no es 13892?" )
        assert.equal( res[1].codigo, "13893", "¿no es 13893?" )
    }) // it

    // ....................................................
    // ....................................................
    it( "no obtengo matriculaciones de un alumno que no existe",async function() {
        var res = await laLogica.obtenerMatriculacionesAlumnoPorApellido( "NO EXISTE" )
        assert.equal( res.length, 0, "¿El usuario 'NO EXISTE' existe? (¿No ha pasado por el catch()?" )
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