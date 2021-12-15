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

const sinon = require('sinon');


// ........................................................
// main ()
// ........................................................
describe( "Test RECURSO MEDICION", function() {

    // ....................................................
    // ....................................................
    



    // ....................................................
    // ....................................................
    it("Insertar mediciones correctas",async function(){
    

        // creamos el mock de la conexion
        const conexion = {
            query: async function(textoSQL,funcion){}
        }; // objeto mock, cuando llame a objetos que usan la conexion no pasara nada

        const publicarMedicionesStub = sinon.stub(conexion,"query").callsArgWith(1,null,[]) // index, error, resultado
        // creamos la logica con el metodo conexion moqueado
        let laLogica = new Logica(conexion);

        
        var mediciones = new Array();
        mediciones.push(new Modelo.Medicion(null, 50, '2021-09-29 01:00:00', new Modelo.Posicion(30,30), 29, 'GTI-3A-1',1));
        mediciones.push(new Modelo.Medicion(null, 50, '2021-09-29 02:00:00', new Modelo.Posicion(30,30), 29, 'GTI-3A-1',2));

        await laLogica.publicarMediciones(mediciones)
        // comprobamos que se crea bien la sentencia sql
        assert.equal(publicarMedicionesStub.calledWith("insert into medicion(fechaHora,posMedicion,valor,idUsuario,uuidSensor,tipoGas)  values ('2021-09-29 01:00:00',POINT(30,30),(50/(SELECT factorDescalibracion FROM sensor WHERE uuid = 'GTI-3A-1')),29,'GTI-3A-1',1),('2021-09-29 02:00:00',POINT(30,30),(50/(SELECT factorDescalibracion FROM sensor WHERE uuid = 'GTI-3A-1')),29,'GTI-3A-1',2)"),
        true,"No se monto bien la query?")

    })// it

    // ....................................................
    // ....................................................
    it("Obtener todas las mediciones",async function(){
      
    
        // creamos el mock de la conexion
        const conexion = {
            query: async function(textoSQL,funcion){}
        }; // objeto mock, cuando llame a objetos que usan la conexion no pasara nada
        

        // para falsear una respuesta de un metodo en concreto, en este caso a query
        
        // creamos el objeto fake que devuelve la BD
        // resultado que devuelve la BD
        let resultadoMock = [{
            "fechaHora": "2021-11-26 00:00:00",
            "posMedicion": {
              "x": 38.1,
              "y": -0.167
            },
            "valor": 0,
            "idUsuario": 13,
            "uuidSensor": "GTI-3A-1",
            "tipoGas": 1
        },{
            "fechaHora": "2021-11-26 01:00:00",
            "posMedicion": {
              "x": 38.99,
              "y": -0.167
            },
            "valor": 0,
            "idUsuario": 13,
            "uuidSensor": "GTI-3A-1",
            "tipoGas": 1
        }]

        
        //si solo  hago el stub al metodo query no se llama al metodo done de la promesa y da un timout
        // callsArgsWith es por si el metodo se esta llamando desde una promesa
        const obtenerTodasMedicionesStub = sinon.stub(conexion,"query").callsArgWith(1,null,resultadoMock) // index, error, resultado
        

        // creamos la logica con el metodo conexion moqueado
        let laLogica = new Logica(conexion);

        // devuelve objetos Medicion
        var res = await laLogica.obtenerTodasMediciones();

        assert.equal(res.length,2,"¿No hay 2 tuplas en la tabla mediciones?")
        assert.equal(res[1].posicion.latitud,38.99,"¿No ha transformado bien el punto a posicion (la x debe ser latitud)")
        assert.equal(obtenerTodasMedicionesStub.calledOnce,true,"No se llamo al metodo query?")
        // el texto sql se monto correctamente?
        assert.equal(obtenerTodasMedicionesStub.calledWith('select * from medicion'),true,"La query no es 'select * from medicion'?")

    })// it

    // ....................................................
    // ....................................................
    it("Obtener mediciones entre un rango de tiempo",async function(){
        
        
        const conexion = {
            query: async function(textoSQL,funcion){}
        }; // objeto mock, cuando llame a objetos que usan la conexion no pasara nada

        let resultadoMock = [
            {
                "fechaHora": "2021-11-26 00:00:00",
                "posMedicion": {
                    "x": 1,
                    "y": 2
                },
                "valor": 3,
                "idUsuario": 13,
                "uuidSensor": "GTI-3A-1",
                "tipoGas": 1
            },
            {
                "fechaHora": "2021-11-26 03:00:00",
                "posMedicion": {
                    "x": 0.00015,
                    "y": 0.00015
                },
                "valor": 20,
                "idUsuario": 13,
                "uuidSensor": "GTI-3A-1",
                "tipoGas": 1
            }
        ]   

        // yields = mockear el callback que se pasa por parametro a query
        const medicionesPorTiempo = sinon.stub(conexion,"query").yields(null,resultadoMock) 
        // creamos la logica con el metodo conexion moqueado
        let laLogica = new Logica(conexion);

        var res = await laLogica.obtenerMedicionesDeHasta('2021-11-26 02:00:00','2021-11-26 03:00:00');

        assert.equal(medicionesPorTiempo.calledOnce,true,"No se llamo al metodo query?")
        assert.equal(medicionesPorTiempo.calledWith('select * from medicion where fechaHora between ? and ?'),
        true,"La query no es 'select * from medicion where fechaHora between ? and ?'?")

        let valoresPreparedStatement = medicionesPorTiempo.args[0][1];
        assert.equal(valoresPreparedStatement[0],'2021-11-26 02:00:00',"¿La fecha inicio no es '2021-11-26 02:00:00'?")
        assert.equal(valoresPreparedStatement[1],'2021-11-26 03:00:00',"¿La fecha fin no es '2021-11-26 03:00:00'?")

       
        assert.equal(res.length,2,"¿No devolvio dos registros?")
        assert.equal(res[0].posicion.latitud,1,"¿No se convirtio los resultados de la query en Objetos Medicion?")

    })// it

    // ....................................................
    // ....................................................
    it("Obtener mediciones entre un rango de tiempo de un usuario",async function(){
        
        
        const conexion = {
            query: async function(textoSQL,funcion){}
        }; // objeto mock, cuando llame a objetos que usan la conexion no pasara nada

        let resultadoMock = [
            {
                "fechaHora": "2021-11-26 00:00:00",
                "posMedicion": {
                    "x": 1,
                    "y": 2
                },
                "valor": 3,
                "idUsuario": 13,
                "uuidSensor": "GTI-3A-1",
                "tipoGas": 1
            },
            {
                "fechaHora": "2021-11-26 03:00:00",
                "posMedicion": {
                    "x": 0.00015,
                    "y": 0.00015
                },
                "valor": 20,
                "idUsuario": 13,
                "uuidSensor": "GTI-3A-1",
                "tipoGas": 1
            }
        ]   

        // yields = mockear el callback que se pasa por parametro a query
        const medicionesPorTiempoYUsuario = sinon.stub(conexion,"query").yields(null,resultadoMock) 
        // creamos la logica con el metodo conexion moqueado
        let laLogica = new Logica(conexion);

        var res = await laLogica.obtenerMedicionesDeHastaPorUsuario('2021-11-26 02:00:00','2021-11-26 03:00:00',13);
        assert.equal(medicionesPorTiempoYUsuario.calledOnce,true,"No se llamo al metodo query?")
        assert.equal(medicionesPorTiempoYUsuario.calledWith('select * from medicion where idUsuario=? and fechaHora between ? and ?'),
        true,"La query no es 'select * from medicion where idUsuario=? and fechaHora between ? and ?'?")

        let valoresPreparedStatement = medicionesPorTiempoYUsuario.args[0][1];
       
        assert.equal(valoresPreparedStatement[0],13,"¿El idUsuario no es 13?")
        assert.equal(valoresPreparedStatement[1],'2021-11-26 02:00:00',"¿La fecha inicio no es '2021-11-26 02:00:00'?")
        assert.equal(valoresPreparedStatement[2],'2021-11-26 03:00:00',"¿La fecha fin no es '2021-11-26 03:00:00'?")

       
        assert.equal(res.length,2,"¿No devolvio dos registros?")
        assert.equal(res[0].posicion.latitud,1,"¿No se convirtio los resultados de la query en Objetos Medicion?")

    })// it


    it("Obtener calidad de aire rango de tiempo y zona",async function(){

        // creamos el mock de la conexion
        const conexion = {
            query: async function(textoSQL,funcion){}
        }; // objeto mock, cuando llame a objetos que usan la conexion no pasara nada

        let resultadoMock = [
            {
                "fechaHora": "2021-11-26 00:00:00",
                "posMedicion": {
                    "x": 0.00009,
                    "y": 0.00009
                },
                "valor": 3,
                "idUsuario": 13,
                "uuidSensor": "GTI-3A-1",
                "tipoGas": 1
            },
            {
                "fechaHora": "2021-11-26 03:00:00",
                "posMedicion": {
                    "x": 0.00015,
                    "y": 0.00015
                },
                "valor": 20,
                "idUsuario": 13,
                "uuidSensor": "GTI-3A-1",
                "tipoGas": 1
            },
            {
                "fechaHora": "2021-11-26 02:00:00",
                "posMedicion": {
                    "x": 0.0001,
                    "y": 0.0001
                },
                "valor": 0,
                "idUsuario": 13,
                "uuidSensor": "GTI-3A-1",
                "tipoGas": 2
            },
            {
                "fechaHora": "2021-11-26 03:00:00",
                "posMedicion": {
                    "x": 0,
                    "y": 0
                },
                "valor": 190,
                "idUsuario": 13,
                "uuidSensor": "GTI-3A-1",
                "tipoGas": 3
            },
            {
                "fechaHora": "2021-11-26 04:00:00",
                "posMedicion": {
                    "x": 0,
                    "y": 0
                },
                "valor": 0.032,
                "idUsuario": 13,
                "uuidSensor": "GTI-3A-1",
                "tipoGas": 4
            },
            {
                "fechaHora": "2021-11-26 04:01:00",
                "posMedicion": {
                    "x": 0,
                    "y": 0
                },
                "valor": 0,
                "idUsuario": 13,
                "uuidSensor": "GTI-3A-1",
                "tipoGas": 0.1
            }
        ]   

        // yields = mockear el callback que se pasa por parametro a query
        const calidadAireTiempoZonaStub = sinon.stub(conexion,"query").yields(null,resultadoMock) 
        // creamos la logica con el metodo conexion moqueado
        let laLogica = new Logica(conexion);

        

        var res = await laLogica.obtenerCalidadAirePorTiempoYZona('2021-11-26 00:00:00','2021-11-26 20:00:00',0,1,2);

        assert.equal(calidadAireTiempoZonaStub.calledOnce,true,"No se llamo al metodo query?")
        //console.log(calidadAireTiempoZonaStub.args);
        assert.equal(calidadAireTiempoZonaStub.calledWith('select *, ( 6371392.896 * acos ( cos ( radians(?) ) * cos( radians( ST_X(posMedicion) ) ) * cos( radians( ST_Y(posMedicion) ) - radians(?) ) + sin ( radians(?) ) * sin( radians( ST_X(posMedicion) ) ) )) as distancia from medicion where fechaHora between ? and ? having distancia <= ?'),
        true,"La query no es 'select *, ( 6371392.896 * acos ( cos ( radians(?) ) * cos( radians( ST_X(posMedicion) ) ) * cos( radians( ST_Y(posMedicion) ) - radians(?) ) + sin ( radians(?) ) * sin( radians( ST_X(posMedicion) ) ) )) as distancia from medicion where fechaHora between ? and ? having distancia <= ?'?")
        
        let valoresPreparedStatement = calidadAireTiempoZonaStub.args[0][1];
        assert.equal(valoresPreparedStatement[0],0, "El primer parametro no es la latitud (0)?")//latitud
        assert.equal(valoresPreparedStatement[1],1,"El segundo parametro no es la longitud (1)?")//longitud
        assert.equal(valoresPreparedStatement[2],0,"El tercer parametro no es la latitud (0)?")//latitud
        assert.equal(valoresPreparedStatement[3],'2021-11-26 00:00:00',"El cuarto parametro no es la fecha inicial (2021-11-26 00:00:00)?")//fecha ini
        assert.equal(valoresPreparedStatement[4],'2021-11-26 20:00:00',"El quinto parametro no es la fecha final (2021-11-26 20:00:00)?")//fecha fin
        assert.equal(valoresPreparedStatement[5],2,"El sexto parametro no es el radio (2)?")//radio

        assert.equal(res.length,4,"Debe volver 4 informes de calidad de aire")
        assert.equal(res[0].valor,167.05,"¿El AQI del co no es 103.69?")
        assert.equal(res[1].valor,0,"¿El AQI del no2 es 0?")
        assert.equal(res[2].valor,125,"¿El AQI del so2 no es 125?")
        assert.equal(res[3].valor,29.63,"¿El AQI del o3 no es 60.37?")
        

    })// it

    it("Obtener calidad de aire rango de tiempo y usuario",async function(){
        

        const conexion = {
            query: async function(textoSQL,funcion){}
        }; // objeto mock, cuando llame a objetos que usan la conexion no pasara nada

        let resultadoMock = [
            {
                "fechaHora": "2021-11-26 00:00:00",
                "posMedicion": {
                    "x": 0.00009,
                    "y": 0.00009
                },
                "valor": 3,
                "idUsuario": 13,
                "uuidSensor": "GTI-3A-1",
                "tipoGas": 1
            },
            {
                "fechaHora": "2021-11-26 03:00:00",
                "posMedicion": {
                    "x": 0.00015,
                    "y": 0.00015
                },
                "valor": 20,
                "idUsuario": 13,
                "uuidSensor": "GTI-3A-1",
                "tipoGas": 1
            },
            {
                "fechaHora": "2021-11-26 02:00:00",
                "posMedicion": {
                    "x": 0.0001,
                    "y": 0.0001
                },
                "valor": 0,
                "idUsuario": 13,
                "uuidSensor": "GTI-3A-1",
                "tipoGas": 2
            },
            {
                "fechaHora": "2021-11-26 03:00:00",
                "posMedicion": {
                    "x": 0,
                    "y": 0
                },
                "valor": 190,
                "idUsuario": 13,
                "uuidSensor": "GTI-3A-1",
                "tipoGas": 3
            },
            {
                "fechaHora": "2021-11-26 04:00:00",
                "posMedicion": {
                    "x": 0,
                    "y": 0
                },
                "valor": 0.032,
                "idUsuario": 13,
                "uuidSensor": "GTI-3A-1",
                "tipoGas": 4
            },
            {
                "fechaHora": "2021-11-26 04:01:00",
                "posMedicion": {
                    "x": 0,
                    "y": 0
                },
                "valor": 0,
                "idUsuario": 13,
                "uuidSensor": "GTI-3A-1",
                "tipoGas": 0.1
            }
        ]   

        // yields = mockear el callback que se pasa por parametro a query
        const calidadAireTiempoUsuarioStub = sinon.stub(conexion,"query").yields(null,resultadoMock) 
        // creamos la logica con el metodo conexion moqueado
        let laLogica = new Logica(conexion);

        

        var res = await laLogica.obtenerCalidadAirePorTiempoYUsuario('2021-11-26 00:00:00','2021-11-26 20:00:00',13);

        assert.equal(calidadAireTiempoUsuarioStub.calledOnce,true,"No se llamo al metodo query?")
        assert.equal(calidadAireTiempoUsuarioStub.calledWith('select * from medicion where idUsuario = ? and fechaHora between ? and ?'),
        true,"La query no es 'select * from medicion where idUsuario = ? and fechaHora between ? and ?'?")
        
        let valoresPreparedStatement = calidadAireTiempoUsuarioStub.args[0][1];
        assert.equal(valoresPreparedStatement[0],13,"¿El idUsuario no es 13?")
        assert.equal(valoresPreparedStatement[1],'2021-11-26 00:00:00',"¿La fecha inicio no es '2021-11-26 00:00:00'?")
        assert.equal(valoresPreparedStatement[2],'2021-11-26 20:00:00',"¿La fecha fin no es '2021-11-26 20:00:00'?")

        assert.equal(res.length,4,"Debe volver 4 informes de calidad de aire")
        assert.equal(res[0].valor,167.05,"¿El AQI del co no es 103.69?")
        assert.equal(res[1].valor,0,"¿El AQI del no2 es 0?")
        assert.equal(res[2].valor,125,"¿El AQI del so2 no es 125?")
        assert.equal(res[3].valor,29.63,"¿El AQI del o3 no es 60.37?")

    })// it


    

    
}) // describe