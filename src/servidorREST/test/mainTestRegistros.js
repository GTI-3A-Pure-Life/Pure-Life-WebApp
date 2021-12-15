// ........................................................
// mainTestRegistros.js
// Clase de tests para probar los endpoints
// Pablo Enguix Llopis 03/11/2021
// ........................................................

const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised);
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const rewire = require('rewire');

const bodyParser = require('body-parser')
const request = require('supertest');
//const sandbox = sinon.sandbox.create();


var app = rewire('../mainServidorREST').servidorExpress;
var Logica = require('../../logica/Logica.js');
const Modelo = require('../../logica/Modelo.js');
const { Posicion } = require('../../logica/Modelo.js');
// ........................................................
// main ()
// ........................................................
describe("==================================================\nTest 2 RECURSO REGISTROS ESTADOS SENSOR\n==================================================", function() {



    var laLogica;
    // preparamos el servidor falso para las pruebas
    this.beforeAll(()=>{
        laLogica = new Logica(null);
        app = rewire('../mainServidorREST').servidorExpress;
        app.use(bodyParser.text({type :'application/json'}))
        var reglas = rewire("../ReglasREST.js")
   
        reglas.cargar(app,laLogica)
    })

    // despues de cada test limpiamos el sinon
      afterEach(()=>{
        sinon.restore();
    })


    context('POST /registro_estado_sensor/bateria--------------------------------------------------', ()=>{
      

        it('Registro estado bateria correcto', (done)=>{
        
            // lo que espero con que se llame al metodo 
            let sensorId = "GTI-3A-1"
            let registroEsperableQueLlameGuardarRegistro = new Modelo.RegistroEstadoSensor(null, undefined, 0, 1, 0, 0, sensorId, "2021-12-12 14:34:47");

            // lo que espero que devuelva la peticion
            let jsonEsperado =  {"res": {"uuidSensor":sensorId, "tieneBateriaBaja":1, "fechaHora": "2021-12-12 14:34:47"}}

            // lo que le paso a la peticion
            let bodyPost = {"res": {"uuidSensor":sensorId, "tieneBateriaBaja":1, "fechaHora": "2021-12-12 14:34:47"}}

            let registrarStub = sinon.stub(laLogica, 'guardarRegistroBateriaSensor').resolves({});// devuelve el id
            request(app).post('/registro_estado_sensor/bateria')
                .send(bodyPost)
                .expect(200) // esperamos un 200
                .end((err, response)=>{

                    let parametrosFuncion = registrarStub.args[0] // se llama a la funcion con objeto registro

                    expect(parametrosFuncion[0]).to.eql(registroEsperableQueLlameGuardarRegistro)
                    expect(response.statusCode).equal(201)
                    expect(registrarStub).to.have.been.calledOnce; // se llamo a registrar_usuario
                    expect(response.text).to.equal('{"mensaje":"Registro creado correctamente"}'); // se llamo a registrar_usuario
                    done();
                })
        })

        it('Registro estado bateria igual al anterior', (done)=>{
        
           

             // lo que espero con que se llame al metodo 
             let sensorId = "GTI-3A-1"
             let registroEsperableQueLlameGuardarRegistro = new Modelo.RegistroEstadoSensor(null, undefined, 0, 1, 0, 0, sensorId, "2021-12-12 14:34:47");
 
             // lo que le paso a la peticion
             let bodyPost = {"res": {"uuidSensor":sensorId, "tieneBateriaBaja":1, "fechaHora": "2021-12-12 14:34:47"}}
 
             let registrarStub = sinon.stub(laLogica, 'guardarRegistroBateriaSensor').rejects({"sqlState":45000});// devuelve error del trigger
             request(app).post('/registro_estado_sensor/bateria')
                 .send(bodyPost)
                 .expect(200) 
                 .end((err, response)=>{
 
                     let parametrosFuncion = registrarStub.args[0] // se llama a la funcion con objeto registro
 
                     expect(parametrosFuncion[0]).to.eql(registroEsperableQueLlameGuardarRegistro)
                     expect(response.statusCode).equal(200)
                     expect(registrarStub).to.have.been.calledOnce; // se llamo a registrar_usuario
                     done();
                 })
        })

        it('Registro estado bateria incorrecto', (done)=>{
        
           // lo que espero con que se llame al metodo 
           let sensorId = "GTI-3A-1"
           let registroEsperableQueLlameGuardarRegistro = new Modelo.RegistroEstadoSensor(null, undefined, 0, 1, 0, 0, sensorId, "2021-12-12 14:34:47");


           // lo que le paso a la peticion
           let bodyPost = {"res": {"uuidSensor":sensorId, "tieneBateriaBaja":1, "fechaHora": "2021-12-12 14:34:47"}}

           let registrarStub = sinon.stub(laLogica, 'guardarRegistroBateriaSensor').rejects({errno:1452});// error de clave foranea no existe el id del sensor
           request(app).post('/registro_estado_sensor/bateria')
               .send(bodyPost)
               .expect(500) // esperamos un 200
               .end((err, response)=>{

                   let parametrosFuncion = registrarStub.args[0] // se llama a la funcion con objeto registro

                   expect(parametrosFuncion[0]).to.eql(registroEsperableQueLlameGuardarRegistro)
                   expect(response.statusCode).equal(500)
                   expect(registrarStub).to.have.been.calledOnce; // se llamo a registrar_usuario
                   expect(response.text).to.equal('{"mensaje":"No existe este sensor"}'); // se llamo a registrar_usuario
                   done();
               })
        })
    })

    context('POST /registro_estado_sensor/averiado--------------------------------------------------', ()=>{
      

        it('Registro estado averia correcto', (done)=>{
        
            // lo que espero con que se llame al metodo 
            let sensorId = "GTI-3A-1"
            let registroEsperableQueLlameGuardarRegistro = new Modelo.RegistroEstadoSensor(null, undefined, 0, 0, 1, 0, sensorId, "2021-12-12 14:34:47");

            // lo que le paso a la peticion
            let bodyPost = {"res": {"uuidSensor":sensorId, "estaAveriado":1, "fechaHora": "2021-12-12 14:34:47"}}

            let registrarStub = sinon.stub(laLogica, 'guardarRegistroAveriaSensor').resolves({});// devuelve el id
            request(app).post('/registro_estado_sensor/averiado')
                .send(bodyPost)
                .expect(200) // esperamos un 200
                .end((err, response)=>{

                    let parametrosFuncion = registrarStub.args[0] // se llama a la funcion con objeto registro
                    expect(parametrosFuncion[0]).to.eql(registroEsperableQueLlameGuardarRegistro)
                    expect(response.statusCode).equal(201)
                    expect(registrarStub).to.have.been.calledOnce; // se llamo a registrar_usuario
                    expect(response.text).to.equal('{"mensaje":"Registro creado correctamente"}'); // se llamo a registrar_usuario
                    done();
                })
        })

        it('Registro estado averia igual al anterior', (done)=>{
        
           

             // lo que espero con que se llame al metodo 
             let sensorId = "GTI-3A-1"
             let registroEsperableQueLlameGuardarRegistro = new Modelo.RegistroEstadoSensor(null, undefined, 0, 0, 1, 0, sensorId, "2021-12-12 14:34:47");
 
             // lo que le paso a la peticion
             let bodyPost = {"res": {"uuidSensor":sensorId, "estaAveriado":1, "fechaHora": "2021-12-12 14:34:47"}}
 
             let registrarStub = sinon.stub(laLogica, 'guardarRegistroAveriaSensor').rejects({"sqlState":45000});// devuelve error del trigger
             request(app).post('/registro_estado_sensor/averiado')
                 .send(bodyPost)
                 .expect(200) 
                 .end((err, response)=>{
 
                     let parametrosFuncion = registrarStub.args[0] // se llama a la funcion con objeto registro
 
                     expect(parametrosFuncion[0]).to.eql(registroEsperableQueLlameGuardarRegistro)
                     expect(response.statusCode).equal(200)
                     expect(registrarStub).to.have.been.calledOnce; // se llamo a registrar_usuario
                     done();
                 })
        })

        it('Registro estado averia incorrecto', (done)=>{
        
           // lo que espero con que se llame al metodo 
           let sensorId = "GTI-3A-1"
           let registroEsperableQueLlameGuardarRegistro = new Modelo.RegistroEstadoSensor(null, undefined, 0, 0, 1, 0, sensorId, "2021-12-12 14:34:47");


           // lo que le paso a la peticion
           let bodyPost = {"res": {"uuidSensor":sensorId, "estaAveriado":1, "fechaHora": "2021-12-12 14:34:47"}}

           let registrarStub = sinon.stub(laLogica, 'guardarRegistroAveriaSensor').rejects({errno:1452});// error de clave foranea no existe el id del sensor
           request(app).post('/registro_estado_sensor/averiado')
               .send(bodyPost)
               .expect(500) // esperamos un 200
               .end((err, response)=>{

                   let parametrosFuncion = registrarStub.args[0] // se llama a la funcion con objeto registro

                   expect(parametrosFuncion[0]).to.eql(registroEsperableQueLlameGuardarRegistro)
                   expect(response.statusCode).equal(500)
                   expect(registrarStub).to.have.been.calledOnce; // se llamo a registrar_usuario
                   expect(response.text).to.equal('{"mensaje":"No existe este sensor"}'); // se llamo a registrar_usuario
                   done();
               })
        })
    })

    context('POST /registro_estado_sensor/descalibrado--------------------------------------------------', ()=>{
      

        it('Registro estado descalibrado correcto', (done)=>{
        
            // lo que espero con que se llame al metodo 
            let sensorId = "GTI-3A-1"
            let registroEsperableQueLlameGuardarRegistro = new Modelo.RegistroEstadoSensor(null, undefined, 1, 0, 0, 0, sensorId, "2021-12-12 14:34:47");
            let factorDescalibracion = 0.9;
         

            // lo que le paso a la peticion
            let bodyPost = {"res": {"uuidSensor":sensorId, "descalibrado":1, "fechaHora": "2021-12-12 14:34:47","factorDescalibracion":0.9}}

            let registrarStub = sinon.stub(laLogica, 'guardarRegistroCalibracionSensor').resolves({});
            let guardarFactorCalibracionStub = sinon.stub(laLogica, 'guardarFactorCalibracionSensor').resolves({});
            request(app).post('/registro_estado_sensor/descalibrado')
                .send(bodyPost)
                .expect(200) // esperamos un 200
                .end((err, response)=>{

                    let parametrosFuncionRegistro = registrarStub.args[0] // se llama a la funcion guardar registro con objeto registro
                    let parametrosFuncionFactor = guardarFactorCalibracionStub.args[0] // se llama a la funcion guardar factor con un numero
         
                    expect(parametrosFuncionRegistro[0]).to.eql(registroEsperableQueLlameGuardarRegistro)
                    expect(parametrosFuncionFactor[0]).to.eql(factorDescalibracion)
                    expect(response.statusCode).equal(201)
                    expect(registrarStub).to.have.been.calledOnce; // se llamo al metodo

                    expect(guardarFactorCalibracionStub).to.have.been.calledOnce; // se llamo al metodo

                    expect(response.text).to.equal('{"mensaje":"Registro creado correctamente"}'); 
                    done();
                })
        })

        it('Registro estado descalibrado igual al anterior', (done)=>{
        
           

             // lo que espero con que se llame al metodo 
             let sensorId = "GTI-3A-1"
             let registroEsperableQueLlameGuardarRegistro = new Modelo.RegistroEstadoSensor(null, undefined, 1, 0, 0, 0, sensorId, "2021-12-12 14:34:47");
 
             // lo que le paso a la peticion
             let bodyPost = {"res": {"uuidSensor":sensorId, "descalibrado":1, "fechaHora": "2021-12-12 14:34:47"}}
 
             let registrarStub = sinon.stub(laLogica, 'guardarRegistroCalibracionSensor').rejects({"sqlState":45000});// devuelve error del trigger
             let guardarFactorCalibracionStub = sinon.stub(laLogica, 'guardarFactorCalibracionSensor').resolves({});
             request(app).post('/registro_estado_sensor/descalibrado')
                 .send(bodyPost)
                 .expect(200) 
                 .end((err, response)=>{
 
                     let parametrosFuncion = registrarStub.args[0] // se llama a la funcion con objeto registro
 
                     expect(parametrosFuncion[0]).to.eql(registroEsperableQueLlameGuardarRegistro)
                     expect(response.statusCode).equal(200)
                     expect(registrarStub).to.have.been.calledOnce; // se llamo a registrar_usuario
                     done();
                 })
        })

        it('Registro estado descalibrado incorrecto', (done)=>{
        
           // lo que espero con que se llame al metodo 
           let sensorId = "GTI-3A-1"
           let registroEsperableQueLlameGuardarRegistro = new Modelo.RegistroEstadoSensor(null, undefined, 1, 0, 0, 0, sensorId, "2021-12-12 14:34:47");


           // lo que le paso a la peticion
           let bodyPost = {"res": {"uuidSensor":sensorId, "descalibrado":1, "fechaHora": "2021-12-12 14:34:47"}}

           let registrarStub = sinon.stub(laLogica, 'guardarRegistroCalibracionSensor').rejects({errno:1452});// error de clave foranea no existe el id del sensor
           let guardarFactorCalibracionStub = sinon.stub(laLogica, 'guardarFactorCalibracionSensor').resolves({});
           
           request(app).post('/registro_estado_sensor/descalibrado')
               .send(bodyPost)
               .expect(500) // esperamos un 200
               .end((err, response)=>{

                   let parametrosFuncion = registrarStub.args[0] // se llama a la funcion con objeto registro

                   expect(parametrosFuncion[0]).to.eql(registroEsperableQueLlameGuardarRegistro)
                   expect(response.statusCode).equal(500)
                   expect(registrarStub).to.have.been.calledOnce; // se llamo a registrar_usuario
                   expect(response.text).to.equal('{"mensaje":"No existe este sensor"}'); // se llamo a registrar_usuario
                   done();
               })
        })
    })


    context('PUT /registro_estado_sensor/leido--------------------------------------------------', ()=>{
      

        it('Actualizar correctamente', (done)=>{
        
            // lo que espero con que se llame al metodo 
            let sensorId = "GTI-3A-1"
            let registroEsperableQueLlameGuardarRegistro = new Modelo.RegistroEstadoSensor(null, undefined, 1, 0, 0, 0, sensorId, "2021-12-12 14:34:47");

         

            // lo que le paso a la peticion
            let bodyPost = {"res": {"id":sensorId}}

            let registrarStub = sinon.stub(laLogica, 'actualizar_leido').resolves({});// devuelve el id
            request(app).put('/registro_estado_sensor/leido')
                .send(bodyPost)
                .expect(200) // esperamos un 200
                .end((err, response)=>{

                    let parametrosFuncion = registrarStub.args[0] // se llama a la funcion con objeto registro

                    expect(parametrosFuncion[0]).to.eql(sensorId)
                    expect(response.statusCode).equal(200)
                    expect(registrarStub).to.have.been.calledOnce; // se llamo a marcar_leido
                    expect(response.text).to.equal('{"mensaje":"Leido se ha actualizado correctamente"}'); 
                    done();
                })
        })

        it('El sensor no existe', (done)=>{
        
           

             // lo que espero con que se llame al metodo 
             let sensorId = "GTI-3A-1"
 
             // lo que le paso a la peticion
             let bodyPost = {"res": {"id":sensorId}}
 
             let registrarStub = sinon.stub(laLogica, 'actualizar_leido').rejects({"sqlState":1452});// devuelve error del trigger
             request(app).put('/registro_estado_sensor/leido')
                 .send(bodyPost)
                 .expect(500) 
                 .end((err, response)=>{
                    let parametrosFuncion = registrarStub.args[0] // se llama a la funcion con objeto registro
 
                    expect(parametrosFuncion[0]).to.eql(sensorId)
                    expect(response.statusCode).equal(500)
                    expect(registrarStub).to.have.been.calledOnce; // se llamo a marcar_leido
                    expect(response.text).to.equal('{"mensaje":"Error desconocido"}'); 
                    done();
                 })
        })

    })

    context('GET /registro_estado_sensor--------------------------------------------------', ()=>{
      

        it('Obtener todos los registros', (done)=>{
        
            let arrayResultadoMock = new Array();
            arrayResultadoMock.push(new Modelo.RegistroEstadoSensor(null, 13, 1, 0, 0, 0, "GTI-3A-1", "2021-12-12 14:34:47"))

            let resultadoPeticionEsperable = [
                {
                  "id": 13,
                  "uuidSensor": "GTI-3A-1",
                  "fechaHora": "2021-12-12 14:34:47",
                  "pocaBateria": 0,
                  "averiado": 0,
                  "descalibrado": 1,
                  "leido": 0
                }]
         

            let registrarStub = sinon.stub(laLogica, 'obtenerRegistrosEstadoSensor').resolves(arrayResultadoMock);// devuelve el id
            request(app).get('/registro_estado_sensor')
                .expect(200)
                .end((err, response)=>{

                    expect(response.statusCode).equal(200)
                    expect(registrarStub).to.have.been.calledOnce;
                    expect(response.body).to.eql(resultadoPeticionEsperable); 
                    done();
                })
        })

        it('Obtener ningun registro', (done)=>{

            let registrarStub = sinon.stub(laLogica, 'obtenerRegistrosEstadoSensor').resolves([]);// devuelve el id
            request(app).get('/registro_estado_sensor')
                .expect(204)
                .end((err, response)=>{

                    expect(response.statusCode).equal(204)
                    expect(registrarStub).to.have.been.calledOnce;
                    expect(response.body).to.eql({}); 
                    done();
                })
        })

        it('Registro estado averia incorrecto', (done)=>{
        
           // lo que espero con que se llame al metodo 
           let sensorId = "GTI-3A-1"
          
           // lo que le paso a la peticion
           let bodyPost = {"res": {"id":sensorId}}

           let marcarLeidoStub = sinon.stub(laLogica, 'actualizar_leido').rejects({errno:1452});// error de clave foranea no existe el id del sensor
           request(app).put('/registro_estado_sensor/leido')
               .send(bodyPost)
               .expect(500) // esperamos un 200
               .end((err, response)=>{

                   let parametrosFuncion = marcarLeidoStub.args[0] // se llama a la funcion con objeto registro

                   expect(parametrosFuncion[0]).to.eql(sensorId)
                   expect(response.statusCode).equal(500)
                   expect(marcarLeidoStub).to.have.been.calledOnce; // se llamo a registrar_usuario
                   expect(response.text).to.equal('{"mensaje":"Error desconocido"}'); // se llamo a registrar_usuario
                   done();
               })
        })
    })
}) // describe