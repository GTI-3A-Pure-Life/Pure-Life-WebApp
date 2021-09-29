// ........................................................
// mainTestMediciones.js 
// 29/09/2021 - Rubén Pardo Casanova
// ........................................................
const Logica = require( "../Logica.js" )
const BDCredenciales = require( "../Constantes/BDCredenciales.js" )
const Modelo = require( "../Modelo.js" )
var assert = require ('assert')

// ........................................................
// main ()
// ........................................................
describe( "Test RECURSO MEDICIONCO2", function() {

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
    it("Obtener todas las mediciones",async function(){
        
        // Lista<MedicionCO2>
        var res = await laLogica.obtenerTodasMediciones();
        assert.equal(res.length,2,"¿No hay dos tuplas en la tabla mediciones?")

    })// it

    // ....................................................
    // ....................................................
   /* it( "borrar todas las filas", async function() {
        await laLogica.borrarFilasDeTodasLasTablas()
    }) // it

    // ....................................................
    // ....................................................
    it( "borrar todas las filas", async function() {
        await laLogica.borrarFilasDeTodasLasTablas()
    }) // it*/

    

    
}) // describe