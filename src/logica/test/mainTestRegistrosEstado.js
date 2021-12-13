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
describe( "Test RECURSO REGISTROS ESTADO SENSOR", function() {

    // ....................................................
    // ....................................................
    var laLogica = null


    it("Insertar un registro descalibrado",async function(){
        
        const conexion = {
            query: async function(textoSQL,funcion){}
        }; // objeto mock, cuando llame a objetos que usan la conexion no pasara nada
        // yields = mockear el callback que se pasa por parametro a query
        const guardarRegistroDescalibradoSensorStub = sinon.stub(conexion,"query").yields(null,[]) 
        // creamos la logica con el metodo conexion moqueado
        let laLogica = new Logica(conexion);
        await laLogica.guardarRegistroCalibracionSensor(new Modelo.RegistroEstadoSensor(null,0,1,0,0,0,"GTI-3A-1", "2021-11-3 11:14:01"))

        assert.equal(guardarRegistroDescalibradoSensorStub.calledOnce,true,"No se llamo al metodo query?")
        assert.equal(guardarRegistroDescalibradoSensorStub.calledWith('insert into ' +
        'registro_estado_sensor(uuidSensor,fechaHora,descalibrado,averiado,pocaBateria,leido) ' +
        ' values ( ? , ?, ?,  IFNULL((SELECT r1.averiado FROM ' +
        'registro_estado_sensor as r1 ORDER BY fechaHora DESC LIMIT 1),0), ' +
        'IFNULL((SELECT r2.pocaBateria FROM registro_estado_sensor as r2 ' +
        'ORDER BY fechaHora DESC LIMIT 1),0),  ? );'),
        true,"La query no es se monto correctamente?")
        
        let valoresPreparedStatement = guardarRegistroDescalibradoSensorStub.args[0][1];
        assert.equal(valoresPreparedStatement[0],"GTI-3A-1","¿El sensor no es GTI-3A-1?")
        assert.equal(valoresPreparedStatement[1],'2021-11-3 11:14:01',"¿La fecha no es '2021-11-03 11:14:01'?")
        assert.equal(valoresPreparedStatement[2],1,"¿El campo descalibrado no es 1?")
        assert.equal(valoresPreparedStatement[3],0,"¿No se puso 0 en el campo leido?")


    })// it


     // ....................................................
    // ....................................................
    it("Insertar un registro bateria",async function(){
        
        const conexion = {
            query: async function(textoSQL,funcion){}
        }; // objeto mock, cuando llame a objetos que usan la conexion no pasara nada
        // yields = mockear el callback que se pasa por parametro a query
        const guardarRegistroBateriaSensorStub = sinon.stub(conexion,"query").yields(null,[]) 
        // creamos la logica con el metodo conexion moqueado
        let laLogica = new Logica(conexion);
        await laLogica.guardarRegistroBateriaSensor(new Modelo.RegistroEstadoSensor(null,0,0,1,0,0,"GTI-3A-1", "2021-11-3 11:14:01"))


        assert.equal(guardarRegistroBateriaSensorStub.calledOnce,true,"No se llamo al metodo query?")
        assert.equal(guardarRegistroBateriaSensorStub.calledWith('insert into ' +
        'registro_estado_sensor(uuidSensor,fechaHora,pocaBateria,averiado,descalibrado,leido) ' +
        ' values ( ? , ?, ?,  IFNULL((SELECT r1.averiado FROM ' +
        'registro_estado_sensor as r1 ORDER BY fechaHora DESC LIMIT 1),0), ' +
        'IFNULL((SELECT r2.descalibrado FROM registro_estado_sensor as r2 ' +
        'ORDER BY fechaHora DESC LIMIT 1),0),  ? );'),
        true,"La query no es se monto correctamente?")
        
        let valoresPreparedStatement = guardarRegistroBateriaSensorStub.args[0][1];
        assert.equal(valoresPreparedStatement[0],"GTI-3A-1","¿El sensor no es GTI-3A-1?")
        assert.equal(valoresPreparedStatement[1],'2021-11-3 11:14:01',"¿La fecha no es '2021-11-03 11:14:01'?")
        assert.equal(valoresPreparedStatement[2],1,"¿El campo pocaBateria no es 1?")
        assert.equal(valoresPreparedStatement[3],0,"¿No se puso 0 en el campo leido?")
    })// it

    // ....................................................
    // ....................................................
    it("Insertar un registro averiado",async function(){
        
        const conexion = {
            query: async function(textoSQL,funcion){}
        }; // objeto mock, cuando llame a objetos que usan la conexion no pasara nada
        // yields = mockear el callback que se pasa por parametro a query
        const guardarRegistroAveriaSensorStub = sinon.stub(conexion,"query").yields(null,[]) 
        // creamos la logica con el metodo conexion moqueado
        let laLogica = new Logica(conexion);
        await laLogica.guardarRegistroAveriaSensor(new Modelo.RegistroEstadoSensor(null,0,0,0,1,0,"GTI-3A-1", "2021-11-3 11:14:01"))


        assert.equal(guardarRegistroAveriaSensorStub.calledOnce,true,"No se llamo al metodo query?")
        assert.equal(guardarRegistroAveriaSensorStub.calledWith('insert into ' +
        'registro_estado_sensor(uuidSensor,fechaHora,averiado,pocaBateria,descalibrado,leido) ' +
        ' values ( ? , ?, ?,  IFNULL((SELECT r1.pocaBateria FROM ' +
        'registro_estado_sensor as r1 ORDER BY fechaHora DESC LIMIT 1),0), ' +
        'IFNULL((SELECT r2.descalibrado FROM registro_estado_sensor as r2 ' +
        'ORDER BY fechaHora DESC LIMIT 1),0),  ? );'),
        true,"La query no es se monto correctamente?")
        
        let valoresPreparedStatement = guardarRegistroAveriaSensorStub.args[0][1];
        assert.equal(valoresPreparedStatement[0],"GTI-3A-1","¿El sensor no es GTI-3A-1?")
        assert.equal(valoresPreparedStatement[1],'2021-11-3 11:14:01',"¿La fecha no es '2021-11-03 11:14:01'?")
        assert.equal(valoresPreparedStatement[2],1,"¿El campo averiado no es 1?")
        assert.equal(valoresPreparedStatement[3],0,"¿No se puso 0 en el campo leido?")

    })// it

    // ....................................................
    // ....................................................
    it("Obtener los todos los registros",async function(){
        
        const conexion = {
            query: async function(textoSQL,funcion){}
        }; // objeto mock, cuando llame a objetos que usan la conexion no pasara nada

        const resultadoQueryMock = [
             {
                id: 5,
                uuidSensor: 'GTI-3A-1',
                pocaBateria: 0,
                averiado: 1,
                descalibrado: 0,
                fechaHora: "2021-11-23T18:06:06.000Z",
                leido: 1
              },
               {
                id: 12,
                uuidSensor: 'GTI-3A-1',
                pocaBateria: 0,
                averiado: 0,
                descalibrado: 1,
                fechaHora: "2021-11-03T10:14:01.000Z",
                leido: 0
              }
        ] 

        // yields = mockear el callback que se pasa por parametro a query
        const obtenerRegistrosEstadoSensorStub = sinon.stub(conexion,"query").yields(null,resultadoQueryMock) 
        // creamos la logica con el metodo conexion moqueado
        let laLogica = new Logica(conexion);
        let res = await laLogica.obtenerRegistrosEstadoSensor()

        assert.equal(obtenerRegistrosEstadoSensorStub.calledOnce,true,"No se llamo al metodo query?")
        assert.equal(obtenerRegistrosEstadoSensorStub.calledWith('select * from registro_estado_sensor order by fechaHora desc'),
        true,"La query no es se monto correctamente?")
        
        assert.equal(res.length,2,"¿El sensor no es GTI-3A-1?")
        assert.equal(res[0].fechaHora,'2021-11-23 19:06:06',"¿No se formatearon bien los objetos (fecha)?")

    })// it

    // ....................................................
    // ....................................................
    it("Marcar como leido un registro",async function(){
        
        const conexion = {
            query: async function(textoSQL,funcion){}
        }; // objeto mock, cuando llame a objetos que usan la conexion no pasara nada
        // yields = mockear el callback que se pasa por parametro a query
        const actualizarLeidoStub = sinon.stub(conexion,"query").yields(null,[]) 
        // creamos la logica con el metodo conexion moqueado
        let laLogica = new Logica(conexion);
        await laLogica.actualizar_leido(1)

        assert.equal(actualizarLeidoStub.calledOnce,true,"No se llamo al metodo query?")
        assert.equal(actualizarLeidoStub.calledWith('UPDATE registro_estado_sensor SET leido= 1 WHERE id= ?'),
        true,"La query no es se monto correctamente?")
        
        let valoresPreparedStatement = actualizarLeidoStub.args[0][1];
        assert.equal(valoresPreparedStatement[0],"1","¿El id a acutalizar no es 1?")

    })// it
    

    
}) // describe