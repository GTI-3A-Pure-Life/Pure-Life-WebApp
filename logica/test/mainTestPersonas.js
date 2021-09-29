// ........................................................
// mainTestPersona.js
// ........................................................
const Logica = require( "../Logica.js" )
var assert = require ('assert')

// ........................................................
// main ()
// ........................................................
describe( "Test RECURSO Persona", function() {

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
    it( "insertar persona", async function() {
        var error = null
        try {
            await laLogica.insertarPersona({dni: "1234A", nombre: "Pepe",apellidos: "Pérez Pérez" } )
        } catch( err ) {
            error = err
        }
        assert( !error, "¿Has insertado un dni que ya estaba 1234A? (¿Ha pasado por el catch()?" )
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
    it( "obtener todas las persona", async function() {
       await laLogica.insertarPersona({dni: "1234B", nombre: "Pepa",apellidos: "Pérez Pérez" } )
        
       var res = await laLogica.obtenerTodasPersonas()
        assert.equal( res.length, 2, "¿no hay 2 resulados?" )
        assert.equal( res[1].dni, "1234B", "¿no es 1234B?" )
        assert.equal( res[1].nombre, "Pepa", "¿no es Pepa?" )
    }) // it

    // ....................................................
    // ....................................................
    it( "borrar persona por dni", async function() { 
        var res =  await laLogica.borrarPersona( "1234B" )         
        assert( res , 1, "¿No se ha borrado alguna linea?" )
    }) // it

    // ....................................................
    // ....................................................
    it( "borrar persona por dni que no existe", async function() { 
        var res =  await laLogica.borrarPersona( "1234B" )   
        
        // el assert no coge 0,0
        // lo pongo asi para que pase el test. Marcelino ha dado el visto bueno :)
        assert(res==0, true, "¿Se ha borrado alguna linea?" )
    }) // it


    // ....................................................
    // ....................................................
    it( "buscar persona por dni", async function() {
        var res = await laLogica.buscarPersonaConDNI( "1234A" )
        assert.equal( res.length, 1, "¿no hay un resulado?" )
        assert.equal( res[0].dni, "1234A", "¿no es 1234A?" )
        assert.equal( res[0].nombre, "Pepe", "¿no es Pepe?" )
    }) // it

    // ....................................................
    // ....................................................
    it( "no encontrar una persona por dni", async function() {
        var res = await laLogica.buscarPersonaConDNI( "1234B" )
        assert.equal( res.length, 0, "¿ha devuelto algo?" )
    }) // it


    
    // ....................................................
    // ....................................................
    it( "borrar todas las filas", async function() {
        await laLogica.borrarFilasDeTodasLasTablas()
    }) // it


    
}) // describe
