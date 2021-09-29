// ........................................................
// mainTestPersona.js
// ........................................................
const Logica = require( "../Logica.js" )
var assert = require ('assert')

// ........................................................
// main ()
// ........................................................
describe( "Test RECURSO Matricula", function() {

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
    it( "puedo insertar una matriculacion a un alumno",async function() {

        var error = null
        try {
            await laLogica.insertarPersona({dni: "1234A", nombre: "Nombre",apellidos: "Apellido" } )
            // creamos la asignatura
            await laLogica.insertarAsignatura({codigo: "13892", nombre: "Algebra"} )
            // matriculamos al alumno
            await laLogica.insertarMatriculaAlumno({codigo: "13892", dni: "1234A"} )

        } catch( err ) {
            error = err
        }
        assert( !error, "¿Has matriculado al alumno a una asignatura que no tenía? (¿Ha pasado por el catch()?" )
    }) // it

    // ....................................................
    // ....................................................
    it( "no puedo insertar la misma matriculacion a un alumno",async function() {
        var error = null
       
       try{
            // matriculamos al alumno en una que ya tiene
            await laLogica.insertarMatriculaAlumno({codigo: "13892", dni: "1234A"} )
       }catch(err){
            error = err
       }
       assert( error, "¿Ha insertado la asignatura que ya tenía asginada, 13892? (¿No ha pasado por el catch()?" )
    }) // it


    // ....................................................
    // ....................................................
    it( "puedo obtener las matriculaciones de un alumno",async function() {

        var res = await laLogica.obtenerMatriculacionesAlumnoPorApellido( "Apellido" )
        assert.equal( res.length, 1, "¿no hay un resulado? ¿no se han añadido todas?" )
        assert.equal( res[0].codigo, "13892", "¿no es 13892?" )
        assert.equal( res[0].nombre, "Algebra", "¿no es Algebra?" )
    }) // it

    // ....................................................
    // ....................................................
    it( "no obtengo matriculaciones de un alumno que no existe",async function() {
        var res = await laLogica.obtenerMatriculacionesAlumnoPorApellido( "NO EXISTE" )
        assert.equal( res.length, 0, "¿El usuario 'NO EXISTE' existe?" )
    }) // it

    // ....................................................
    // ....................................................
    it( "puedo obtener los alumnos de una asignatura",async function() {

        var res = await laLogica.obtenerAlumnosMatriculadosPorCodigoAsignatura( "13892" )
        assert.equal( res.length, 1, "¿no hay un resulado? ¿no se han añadido todas?" )
        assert.equal( res[0].nombre, "Nombre", "¿no es Nombre?" )
        assert.equal( res[0].apellidos, "Apellido", "¿no es Apellido?" )
    }) // it

    // ....................................................
    // ....................................................
    it( "no obtengo los alumnos de una asignatura que no existe",async function() {
        var res = await laLogica.obtenerAlumnosMatriculadosPorCodigoAsignatura( "NO EXISTE" )
        assert.equal( res.length, 0, "¿La asignatura 'NO EXISTE' existe?" )
    }) // it


    // ....................................................
    // ....................................................
    it( "puedo borrar una matriculacion a un alumno",async function() {

        var error = null
        try {
        
            // des matricular al alumno
            var res = await laLogica.deleteMatriculaAlumno({codigo: "13892", dni: "1234A"} )

        } catch( err ) {
            console.log(err);
            
            error = err
        }
        assert( !error, "¿Has desmatriculado al alumno de una asignatura que tenía? (¿Ha pasado por el catch()?" )
        assert( res, 1, "¿No se ha borrado ningun registro?" )
    }) // it


    // ....................................................
    // ....................................................
    it( "borrar todas las filas", async function() {
        await laLogica.borrarFilasDeTodasLasTablas()
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
