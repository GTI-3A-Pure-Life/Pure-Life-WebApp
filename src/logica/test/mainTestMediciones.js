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
    it("Insertar mediciones correctas",async function(){
        
        var error = null
        try {
            var mediciones = new Array();
            mediciones.push(new Modelo.Medicion(null, 50, '2021-09-29 01:00:00', new Modelo.Posicion(30,30), 29, 'GTI-3A-1',1));
            mediciones.push(new Modelo.Medicion(null, 50, '2021-09-29 02:00:00', new Modelo.Posicion(30,30), 29, 'GTI-3A-1',2));
            mediciones.push(new Modelo.Medicion(null, 50, '2021-09-29 03:00:00', new Modelo.Posicion(30,30), 29, 'GTI-3A-1',3));
            mediciones.push(new Modelo.Medicion(null, 50, '2021-09-29 04:00:00', new Modelo.Posicion(30,30), 29, 'GTI-3A-1',4));

            await laLogica.publicarMediciones(mediciones)
        } catch( err ) {
            error = err
        }
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
        assert.equal(res.length,4,"¿No hay 4 tuplas en la tabla mediciones?")

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
    it("Obtener mediciones entre un rango de tiempo",async function(){
        
        // Lista<MedicionCO2>
        var res = await laLogica.obtenerMedicionesDeHasta('2021-09-29 02:00:00','2021-09-29 03:00:00');
        assert.equal(res.length,2,"¿No devolvio dos registros?")

    })// it


    it("Obtener calidad de aire rango de tiempo y zona",async function(){
        
        var error = null
        try {
            var mediciones = new Array();
            mediciones.push(new Modelo.Medicion(null, 3, '2021-09-29 00:00:00', new Modelo.Posicion(38.995591,-0.16732), 29, 'GTI-3A-1',1));
            mediciones.push(new Modelo.Medicion(null, 4, '2021-09-29 01:00:00', new Modelo.Posicion(38.995591,-0.16732), 29, 'GTI-3A-1',1));
            mediciones.push(new Modelo.Medicion(null, 3, '2021-09-29 02:00:00', new Modelo.Posicion(38.995591,-0.16732), 29, 'GTI-3A-1',1));
            mediciones.push(new Modelo.Medicion(null, 20, '2021-09-29 03:00:00', new Modelo.Posicion(38.995591,-0.16732), 29, 'GTI-3A-1',1));
            mediciones.push(new Modelo.Medicion(null, 22, '2021-09-29 04:00:00', new Modelo.Posicion(38.995591,-0.16732), 29, 'GTI-3A-1',1));
            mediciones.push(new Modelo.Medicion(null, 3, '2021-09-29 05:00:00', new Modelo.Posicion(38.995591,-0.16732), 29, 'GTI-3A-1',1));
            mediciones.push(new Modelo.Medicion(null, 4, '2021-09-29 06:00:00', new Modelo.Posicion(38.995591,-0.16732), 29, 'GTI-3A-1',1));
            mediciones.push(new Modelo.Medicion(null, 1, '2021-09-29 07:00:00', new Modelo.Posicion(38.995591,-0.16732), 29, 'GTI-3A-1',1));
            mediciones.push(new Modelo.Medicion(null, 28, '2021-09-29 16:00:00', new Modelo.Posicion(50.995591,-0.16732), 29, 'GTI-3A-1',1));
            mediciones.push(new Modelo.Medicion(null, 0, '2021-09-29 02:00:00', new Modelo.Posicion(38.995366,-0.167041), 29, 'GTI-3A-1',2));
            mediciones.push(new Modelo.Medicion(null, 200, '2021-09-29 02:00:00', new Modelo.Posicion(80.995366,-0.167041), 29, 'GTI-3A-1',2));
            mediciones.push(new Modelo.Medicion(null, 190, '2021-09-29 03:00:00', new Modelo.Posicion(38.995591,-0.16732), 29, 'GTI-3A-1',3));
            mediciones.push(new Modelo.Medicion(null, 0.032, '2021-09-29 04:00:00', new Modelo.Posicion(38.995591,-0.16732), 29, 'GTI-3A-1',4));
            mediciones.push(new Modelo.Medicion(null, 0.1, '2021-09-29 04:01:00', new Modelo.Posicion(80.995591,-0.16732), 29, 'GTI-3A-1',4));

            await laLogica.publicarMediciones(mediciones)

            var res = await laLogica.obtenerCalidadAirePorTiempoYZona('2021-09-29 00:00:00','2021-09-29 20:00:00',38.995591,-0.167129,18);
           
            await laLogica.borrarFilasDe(BDConstantes.TABLA_MEDICIONES.NOMBRE_TABLA)

        } catch( err ) {
            error = err
            console.log(error);
        }

        assert.equal(res[0].valor,90.73,"¿El AQI del co no es 103.69?")
        assert.equal(res[1].valor,0,"¿El AQI del no2 es 0?")
        assert.equal(res[2].valor,125,"¿El AQI del so2 no es 125?")
        assert.equal(res[3].valor,29.63,"¿El AQI del o3 no es 60.37?")

    })// it

    it("Obtener calidad de aire rango de tiempo y usuario",async function(){
        
        var error = null
        try {
            var mediciones = new Array();
            mediciones.push(new Modelo.Medicion(null, 3, '2021-09-29 00:00:00', new Modelo.Posicion(38.995591,-0.16732), 29, 'GTI-3A-1',1));
            mediciones.push(new Modelo.Medicion(null, 4, '2021-09-29 01:00:00', new Modelo.Posicion(38.995591,-0.16732), 29, 'GTI-3A-1',1));
            mediciones.push(new Modelo.Medicion(null, 3, '2021-09-29 02:00:00', new Modelo.Posicion(38.995591,-0.16732), 29, 'GTI-3A-1',1));
            mediciones.push(new Modelo.Medicion(null, 20, '2021-09-29 03:00:00', new Modelo.Posicion(38.995591,-0.16732), 29, 'GTI-3A-1',1));
            mediciones.push(new Modelo.Medicion(null, 22, '2021-09-29 04:00:00', new Modelo.Posicion(38.995591,-0.16732), 29, 'GTI-3A-1',1));
            mediciones.push(new Modelo.Medicion(null, 3, '2021-09-29 05:00:00', new Modelo.Posicion(38.995591,-0.16732), 29, 'GTI-3A-1',1));
            mediciones.push(new Modelo.Medicion(null, 4, '2021-09-29 06:00:00', new Modelo.Posicion(38.995591,-0.16732), 29, 'GTI-3A-1',1));
            mediciones.push(new Modelo.Medicion(null, 1, '2021-09-29 07:00:00', new Modelo.Posicion(38.995591,-0.16732), 29, 'GTI-3A-1',1));
            // esta medicion no sale por fuera de rango
            mediciones.push(new Modelo.Medicion(null, 28, '2021-09-29 16:00:00', new Modelo.Posicion(50.995591,-0.16732), 29, 'GTI-3A-1',1));

            mediciones.push(new Modelo.Medicion(null, 0, '2021-09-29 02:00:00', new Modelo.Posicion(38.995366,-0.167041), 29, 'GTI-3A-1',2));
            // fuera de rango
            mediciones.push(new Modelo.Medicion(null, 200, '2021-09-29 02:00:00', new Modelo.Posicion(80.995366,-0.167041), 29, 'GTI-3A-1',2));
            mediciones.push(new Modelo.Medicion(null, 190, '2021-09-29 03:00:00', new Modelo.Posicion(38.995591,-0.16732), 29, 'GTI-3A-1',3));
            mediciones.push(new Modelo.Medicion(null, 0.032, '2021-09-29 04:00:00', new Modelo.Posicion(38.995591,-0.16732), 29, 'GTI-3A-1',4));
            mediciones.push(new Modelo.Medicion(null, 0.1, '2021-09-29 04:01:00', new Modelo.Posicion(80.995591,-0.16732), 29, 'GTI-3A-1',4));

            await laLogica.publicarMediciones(mediciones)

            var res = await laLogica.obtenerCalidadAirePorTiempoYUsuario('2021-09-29 00:00:00','2021-09-29 20:00:00',29);
           
            await laLogica.borrarFilasDe(BDConstantes.TABLA_MEDICIONES.NOMBRE_TABLA)

        } catch( err ) {
            error = err
            console.log(error);
        }

        assert.equal(res[0].valor,118.28,"¿El AQI del co no es 92.74?")
        assert.equal(res[1].valor,41.67,"¿El AQI del no2 es 0?")
        assert.equal(res[2].valor,125,"¿El AQI del so2 no es 125?")
        assert.equal(res[3].valor,60.37,"¿El AQI del o3 no es 60.37?")

    })// it

    // ....................................................
    // ....................................................
    it( "borrar todas las filas de mediciones", async function() {
        await laLogica.borrarFilasDe(BDConstantes.TABLA_MEDICIONES.NOMBRE_TABLA)
    }) // it

    

    
}) // describe