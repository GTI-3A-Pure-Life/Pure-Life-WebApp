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
describe( "Test RECURSO REGISTROS ESTADO SENSOR", function() {

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


    it( "borrar todas las filas de registros", async function() {
        await laLogica.borrarFilasDe(BDConstantes.TABLA_REGISTRO_ESTADO_SENSOR.NOMBRE_TABLA)
    }) // it´

     // ....................................................
    // ....................................................
    it("Insertar un registro bateria",async function(){
        
        var error = null
        try {
            // el valor bueno a cambiar son los id y el segundo numero
            res = await laLogica.guardarRegistroBateriaSensor(new Modelo.RegistroEstadoSensor(null,0,1,0,0,
                "GTI-3A-1",
            "2021-11-03 11:14:00"))
                

        } catch( err ) {
            error = err
           
        }
        assert( !error, "¿Has insertado los parametros correctos?, ¿el sensor existe?" )

    })// it

    // ....................................................
    // ....................................................
    it("Insertar un registro averiado",async function(){
        
        var error = null
        try {
            // el valor bueno a cambiar son los id y el tercer numero
            res = await laLogica.guardarRegistroAveriaSensor(new Modelo.RegistroEstadoSensor(null,0,0,1,0,
                "GTI-3A-1",
            "2021-11-03 11:14:01"))
                

        } catch( err ) {
            error = err
           
        }
        assert( !error, "¿Has insertado los parametros correctos?, ¿el sensor existe?" )

    })// it


    // ....................................................
    // ....................................................
    it("Insertar un registro bateria con el estado anterior",async function(){
        
        var error = null
        try {
            // el valor bueno a cambiar son los id y el segundo 0
            res = await laLogica.guardarRegistroBateriaSensor(new Modelo.RegistroEstadoSensor(null,0,1,0,0,
                "GTI-3A-1",
            "2021-11-03 11:14:02"))
                

        } catch( err ) {
            error = err
           
        }
        assert( error, "¿Es identico al anterior?" )
        assert( error.sqlState,45000, "¿El estado del error no es 4500?" )

    })// it

    // ....................................................
    // ....................................................
    it("Insertar un registro averia con el estado anterior",async function(){
        
        var error = null
        try {
            // el valor bueno a cambiar son los id y el segundo 0
            res = await laLogica.guardarRegistroAveriaSensor(new Modelo.RegistroEstadoSensor(null,0,0,1,0,
                "GTI-3A-1",
            "2021-11-03 11:14:03"))
                
           

        } catch( err ) {
            error = err
           
        }
        assert( error, "¿Es identico al anterior?" )
        assert( error.sqlState,45000, "¿El estado del error no es 4500?" )

    })// it
    
    // ....................................................
    // ....................................................
    it("Insertar un registro nuevo averiado",async function(){
        
        var error = null
        try {
            // el valor bueno a cambiar son los id y el tercer numero
            res = await laLogica.guardarRegistroAveriaSensor(new Modelo.RegistroEstadoSensor(null,0,0,0,0,
                "GTI-3A-1",
            "2021-11-03 11:14:04"))
                

        } catch( err ) {
            error = err
           
        }
        assert( !error, "¿Has insertado los parametros correctos?, ¿el sensor existe?" )

    })// it

    // ....................................................
    // ....................................................
    it("Insertar un registro nuevo bateria",async function(){
        
        var error = null
        try {
            // el valor bueno a cambiar son los id y el tercer numero
            res = await laLogica.guardarRegistroBateriaSensor(new Modelo.RegistroEstadoSensor(null,0,0,0,0,
                "GTI-3A-1",
            "2021-11-03 11:14:05"))
                

        } catch( err ) {
            error = err
           
        }
        assert( !error, "¿Has insertado los parametros correctos?, ¿el sensor existe?" )

    })// it*/
    

    
}) // describe