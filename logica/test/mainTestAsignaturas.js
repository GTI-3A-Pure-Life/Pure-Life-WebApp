// ........................................................
// mainTestPersona.js
// ........................................................
const Logica = require( "../Logica.js" )
var assert = require ('assert')

// ........................................................
// main ()
// ........................................................
describe( "Test RECURSO Asignatura", function() {

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
    it( "insertar asignatura", async function() {
        var error = null
        try {
            await laLogica.insertarAsignatura({codigo: "0001", nombre: "Programación"} )
        } catch( err ) {
            error = err
        }
        assert( !error, "¿Has insertado los parametros codigo y nombre?" )
    }) // it

    // ....................................................
    // ....................................................
    it( "no puedo insertar una asignatura con codigo que ya está",async function() {
        var error = null
        try {
            await laLogica.insertarAsignatura({codigo: "0001", nombre: "Programación"} )
        } catch( err ) {
            error = err
        }
        assert( error, "¿Ha insertado el codigo que ya estaba 0001? (¿No ha pasado por el catch()?" )
    }) // it


    // ....................................................
    // ....................................................
    it( "obtener todas las asignaturas", async function() {
       var res = await laLogica.obtenerTodasAsignaturas()
        assert.equal( res.length, 1, "¿no hay 1 resulados?" )
        assert.equal( res[0].codigo, "0001", "¿no es 0001?" )
        assert.equal( res[0].nombre, "Programación", "¿no es Programación?" )
    }) // it


    // ....................................................
    // ....................................................
    it( "buscar asignatura por codigo", async function() {
        var res = await laLogica.buscarAsignaturaConCodigo( "0001" )
        assert.equal( res.length, 1, "¿no hay un resulado?" )
        assert.equal( res[0].codigo, "0001", "¿no es 0001?" )
        assert.equal( res[0].nombre, "Programación", "¿no es Programación?" )
    }) // it

    // ....................................................
    // ....................................................
    it( "no encontrar una persona por dni", async function() {
        var res = await laLogica.buscarAsignaturaConCodigo( "0002" )
        assert.equal( res.length, 0, "¿ha devuelto algo?" )
    }) // it


    // ....................................................
    // ....................................................
    it( "borrar todas las filas", async function() {
        await laLogica.borrarFilasDeTodasLasTablas()
    }) // it

    

    
}) // describe
