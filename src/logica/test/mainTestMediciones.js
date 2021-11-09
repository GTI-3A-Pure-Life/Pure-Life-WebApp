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
describe( "Test RECURSO MEDICION", function() {

    // ....................................................
    // ....................................................
   /* var laLogica = null

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
    it( "borrar todas las filas de mediciones", async function() {
        await laLogica.borrarFilasDe(BDConstantes.TABLA_MEDICIONES.NOMBRE_TABLA)
    }) // it

    // ....................................................
    // ....................................................
    it("Obtener todas las mediciones sin ninguna en la bd",async function(){
        
        // Lista<MedicionCO2>
        var res = await laLogica.obtenerTodasMediciones();
        assert.equal(res.length, 0, "¿Hay alguna medicion guardada?")

    })// it

    // ....................................................
    // ....................................................
    it("Insertar una mediciones correcta",async function(){
        
        var error = null
        try {
            var mediciones = new Array();
            mediciones.push(new Modelo.Medicion(null, 50, '2021-09-29 13:13:13', new Modelo.Posicion(30,30), 1, 'GTI-3A-1',1));
            mediciones.push(new Modelo.Medicion(null, 50, '2021-09-29 13:13:13', new Modelo.Posicion(30,30), 1, 'GTI-3A-1',1));
            await laLogica.publicarMediciones(mediciones)
        } catch( err ) {
            error = err
        }
        console.log(error);
        assert( !error, "¿Has insertado los parametros correctos?, ¿El usuario y el sensor existen?" )

    })// it

    // ....................................................
    // ....................................................
    it("Insertar una medición incorrecta",async function(){
        
        var error = null
        try {
            await laLogica.publicarMedicionCO2(new Modelo.MedicionCO2(null, 50, '2021-09-29', new Modelo.Posicion(30,30), -1, 'GTI-3A-1'))
        } catch( err ) {
            error = err
        }
        assert( error, "¿Has insertado los parametros correctos?, ¿El usuario y el sensor existen?" )

    })// it

    // ....................................................
    // ....................................................
    it("Obtener todas las mediciones",async function(){
        
        // Lista<MedicionCO2>
        var res = await laLogica.obtenerTodasMediciones();
        assert.equal(res.length,2,"¿No hay dos tuplas en la tabla mediciones?")

    })// it

     // ....................................................
    // ....................................................
    it("Obtener ultima medicion",async function(){
        
        // Lista<MedicionCO2>
        var res = await laLogica.obtenerUltimasMediciones(1);
        assert.equal(res.length,1,"¿Devolvió mas de un registro de mediciones?")

    })// it

    // ....................................................
    // ....................................................
    it( "borrar todas las filas de mediciones", async function() {
        await laLogica.borrarFilasDe(BDConstantes.TABLA_MEDICIONES.NOMBRE_TABLA)
    }) // it*/

    

    
}) // describe