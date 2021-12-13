// ........................................................
// mainTestMedicion.js
// Clase de tests para probar los endpoints
// Rubén Pardo Casanova 29/09/2021
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
describe( "==================================================\nTest 1 RECURSO MEDICION\n==================================================", function() {
    
  
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
    
    context('GET /mediciones--------------------------------------------------', ()=>{
        let obtenerStub, errorStub;

        it('Obtener mediciones devuelve un array', (done)=>{
        
            // si obtener mediciones devuelve un array de mediciones esperamos un 200 y un formato json en el body
            let resultadoMediciones = new Array();
            resultadoMediciones.push(new Modelo.Medicion(null, 50, '2021-09-29 01:00:00', new Modelo.Posicion(30,30), 29, 'GTI-3A-1',1));
            resultadoMediciones.push(new Modelo.Medicion(null, 50, '2021-09-29 02:00:00', new Modelo.Posicion(30,30), 29, 'GTI-3A-1',2));
           
            let jsonEsperado =  [{
                fechaHora: '2021-09-29 01:00:00',
                posMedicion: { latitud: 30, longitud: 30 },
                valor: 50,
                idUsuario: 29,
                uuidSensor: 'GTI-3A-1',
                tipoGas: 1
              },
              {
                fechaHora: '2021-09-29 02:00:00',
                posMedicion: { latitud: 30, longitud: 30 },
                valor: 50,
                idUsuario: 29,
                uuidSensor: 'GTI-3A-1',
                tipoGas: 2
              }]

            obtenerStub = sinon.stub(laLogica, 'obtenerTodasMediciones').resolves(resultadoMediciones);
            request(app).get('/mediciones')
                .expect(200) // esperamos un 200
                .end((err, response)=>{

                    expect(response.statusCode).equal(200)
                    expect(obtenerStub).to.have.been.calledOnce; // se llamo a obtenerTodasMediciones
                    expect(response.body.length).equal(2); // json de 2 elementos
                    expect(response.body).to.eql(jsonEsperado); // json bien montado
                    done();
                })
        })

        it('Obtener mediciones no devuelve nada', (done)=>{
        
            // si obtener mediciones devuelve un array de mediciones esperamos un 204 sin body
            let resultadoMediciones = new Array();
            
            let jsonEsperado =  {}

            obtenerStub = sinon.stub(laLogica, 'obtenerTodasMediciones').resolves(resultadoMediciones);
            request(app).get('/mediciones')
                .expect(204) // esperamos un 200
                .end((err, response)=>{

                    expect(response.statusCode).equal(204)
                    expect(obtenerStub).to.have.been.calledOnce; // se llamo a obtenerTodasMediciones
                    expect(response.body).to.eql(jsonEsperado); // json bien montado
                    done();
                })
        })
    })

    context('POST /mediciones--------------------------------------------------', ()=>{

        it('publicar mediciones correctas', (done)=>{
        
            // lo que le paso a la funcion
            let bodyPost ={"res": [
                    {
                        "fechaHora":"2021-12-12T13:34:47+00:00", 
                        "posMedicion":{"latitud":1.2,"longitud":0},
                        "valor": 0, 
                        "idUsuario":13, 
                        "uuidSensor":"GTI-3A-1",
                        "tipoGas":1
                    }] }
            // lo que espero con que se llame al metodo publicar 
            let medicionesEsperablesQueLlamanAPublicar = [new Modelo.Medicion(null,0,'2021-12-12 14:34:47',new Posicion(1.2,0),13,'GTI-3A-1',1)]

            let publicarStub = sinon.stub(laLogica, 'publicarMediciones').resolves({});

            request(app).post('/mediciones')
                .send(bodyPost)
                .expect(201)
                .end((err, response)=>{

                    expect(response.statusCode).equal(201)

                    let parametrosFuncion = publicarStub.args[0] // se llama a la funcion con el json formateado a una lista de mediciones

                    expect(publicarStub).to.have.been.calledOnce; // se llamo a publicar mediciones
                    expect(parametrosFuncion[0]).to.eql(medicionesEsperablesQueLlamanAPublicar)// mediciones que se le pasan a publicar mediciones
                    expect(response.text).equal('{"mensaje":"Mediciones creadas correctamente"}'); // mensaje de ok
                    done();
                })
        })

        it('publicar mediciones incorrecta (usuario/sensor no existe)', (done)=>{
        
            // lo que le paso a la funcion
            let bodyPost ={"res": [
                    {
                        "fechaHora":"2021-12-12T13:34:47+00:00", 
                        "posMedicion":{"latitud":1.2,"longitud":0},
                        "valor": 0, 
                        "idUsuario":13, 
                        "uuidSensor":"GTI-3A-1",
                        "tipoGas":1
                    }] }
            // lo que espero con que se llame al metodo publicar 
            let medicionesEsperablesQueLlamanAPublicar = [new Modelo.Medicion(null,0,'2021-12-12 14:34:47',new Posicion(1.2,0),13,'GTI-3A-1',1)]

            let publicarStub = sinon.stub(laLogica, 'publicarMediciones').rejects({errno:1452});// error sql clave foranea no existe

            request(app).post('/mediciones')
                .send(bodyPost)
                .expect(201)
                .end((err, response)=>{

                    expect(response.statusCode).equal(500)

                    let parametrosFuncion = publicarStub.args[0] // se llama a la funcion con el json formateado a una lista de mediciones

                    expect(publicarStub).to.have.been.calledOnce; // se llamo a publicar mediciones
                    expect(parametrosFuncion[0]).to.eql(medicionesEsperablesQueLlamanAPublicar)// mediciones que se le pasan a publicar mediciones
                    expect(response.text).equal('{"mensaje":"El usuario o sensor no existe"}'); // mensaje de ok
                    done();
                })
        })

    })


    context('GET /mediciones/:fecha_inicio/:fecha_fin--------------------------------------------------', ()=>{
        let obtenerStub, errorStub;

        it('ObtenerMedicionesDeHasta devuelve un array', (done)=>{
        
            // si obtenerMedicionesDeHasta devuelve un array de mediciones esperamos un 200 y un formato json en el body
            let resultadoMediciones = new Array();
            resultadoMediciones.push(new Modelo.Medicion(null, 50, '2021-09-29 01:00:00', new Modelo.Posicion(30,30), 29, 'GTI-3A-1',1));
            resultadoMediciones.push(new Modelo.Medicion(null, 50, '2021-09-29 02:00:00', new Modelo.Posicion(30,30), 29, 'GTI-3A-1',2));
           
            let jsonEsperado =  [{
                fechaHora: '2021-09-29 01:00:00',
                posMedicion: { latitud: 30, longitud: 30 },
                valor: 50,
                idUsuario: 29,
                uuidSensor: 'GTI-3A-1',
                tipoGas: 1
              },
              {
                fechaHora: '2021-09-29 02:00:00',
                posMedicion: { latitud: 30, longitud: 30 },
                valor: 50,
                idUsuario: 29,
                uuidSensor: 'GTI-3A-1',
                tipoGas: 2
              }]

            obtenerStub = sinon.stub(laLogica, 'obtenerMedicionesDeHasta').resolves(resultadoMediciones);
            request(app).get('/mediciones/2021-09-29 01:00:00/2021-09-29 02:00:00')
                .expect(200) // esperamos un 200
                .end((err, response)=>{
                    expect(response.statusCode).equal(200)
                    let parametrosFuncionObtener = obtenerStub.args[0]
                    expect(parametrosFuncionObtener[0]).to.eql('2021-09-29 01:00:00')// fecha ini
                    expect(parametrosFuncionObtener[1]).to.eql('2021-09-29 02:00:00')// fecha fin
                    expect(obtenerStub).to.have.been.calledOnce; // se llamo a obtenerTodasMediciones
                    expect(response.body.length).equal(2); // json de 2 elementos
                    expect(response.body).to.eql(jsonEsperado); // json bien montado
                    done();
                })
        })

        it('ObtenerMedicionesDeHasta no devuelve nada', (done)=>{
        
            // si obtenerMedicionesDeHasta no devuelve un array de mediciones esperamos un 204 y body vacio
            let resultadoMediciones = new Array();
            
           
            let jsonEsperado =  {}

            obtenerStub = sinon.stub(laLogica, 'obtenerMedicionesDeHasta').resolves(resultadoMediciones);
            request(app).get('/mediciones/2021-09-29 01:00:00/2021-09-29 02:00:00')
                .expect(204) // esperamos un 204
                .end((err, response)=>{
                    expect(response.statusCode).equal(204)
                    let parametrosFuncionObtener = obtenerStub.args[0]
                    expect(parametrosFuncionObtener[0]).to.eql('2021-09-29 01:00:00')// fecha ini
                    expect(parametrosFuncionObtener[1]).to.eql('2021-09-29 02:00:00')// fecha fin
                    expect(obtenerStub).to.have.been.calledOnce; // se llamo a obtenerTodasMediciones
                    expect(response.body).to.eql(jsonEsperado); // json bien montado
                    done();
                })
        })
    })

    context('GET /mediciones/usuario--------------------------------------------------', ()=>{
        let obtenerStub, errorStub;

        it('obtenerMedicionesDeHastaPorUsuario devuelve un array', (done)=>{
        
            // si obtenerMedicionesDeHastaPorUsuario devuelve un array de mediciones esperamos un 200 y un formato json en el body
            let resultadoMediciones = new Array();
            resultadoMediciones.push(new Modelo.Medicion(null, 50, '2021-09-29 01:00:00', new Modelo.Posicion(30,30), 29, 'GTI-3A-1',1));
            resultadoMediciones.push(new Modelo.Medicion(null, 50, '2021-09-29 02:00:00', new Modelo.Posicion(30,30), 29, 'GTI-3A-1',2));
           
            let jsonEsperado =  [{
                fechaHora: '2021-09-29 01:00:00',
                posMedicion: { latitud: 30, longitud: 30 },
                valor: 50,
                idUsuario: 29,
                uuidSensor: 'GTI-3A-1',
                tipoGas: 1
              },
              {
                fechaHora: '2021-09-29 02:00:00',
                posMedicion: { latitud: 30, longitud: 30 },
                valor: 50,
                idUsuario: 29,
                uuidSensor: 'GTI-3A-1',
                tipoGas: 2
              }]

            obtenerStub = sinon.stub(laLogica, 'obtenerMedicionesDeHastaPorUsuario').resolves(resultadoMediciones);
            //GET /mediciones/usuario?idUsuario=idUsuario&fecha_inicio=fechaInicio&fecha_fin=fechaFin
            request(app).get('/mediciones/usuario?idUsuario=29&fecha_inicio=2021-09-29 01:00:00&fecha_fin=2021-09-29 02:00:00')
                .expect(200) // esperamos un 200
                .end((err, response)=>{
                    expect(response.statusCode).equal(200)
                    let parametrosFuncionObtener = obtenerStub.args[0]
                    expect(parametrosFuncionObtener[0]).to.eql('2021-09-29 01:00:00')// fecha ini
                    expect(parametrosFuncionObtener[1]).to.eql('2021-09-29 02:00:00')// fecha fin
                    expect(parametrosFuncionObtener[2]).equal('29')// idUsuario
                    expect(obtenerStub).to.have.been.calledOnce; // se llamo a obtenerTodasMediciones
                    expect(response.body.length).equal(2); // json de 2 elementos
                    expect(response.body).to.eql(jsonEsperado); // json bien montado
                    done();
                })
        })

        it('obtenerMedicionesDeHastaPorUsuario no devuelve nada', (done)=>{
        
            // si obtenerMedicionesDeHastaPorUsuario no devuelve un array de mediciones esperamos un 204 y body vacio
            let resultadoMediciones = new Array();
            
           
            let jsonEsperado =  {}

            obtenerStub = sinon.stub(laLogica, 'obtenerMedicionesDeHastaPorUsuario').resolves(resultadoMediciones);
            request(app).get('/mediciones/usuario?idUsuario=29&fecha_inicio=2021-09-29 01:00:00&fecha_fin=2021-09-29 02:00:00')
                .expect(204) // esperamos un 200
                .end((err, response)=>{
                    expect(response.statusCode).equal(204)
                    let parametrosFuncionObtener = obtenerStub.args[0]
                    expect(parametrosFuncionObtener[0]).to.eql('2021-09-29 01:00:00')// fecha ini
                    expect(parametrosFuncionObtener[1]).to.eql('2021-09-29 02:00:00')// fecha fin
                    expect(parametrosFuncionObtener[2]).equal('29')// idUsuario
                    expect(obtenerStub).to.have.been.calledOnce; // se llamo a obtenerTodasMediciones
                    expect(response.body).to.eql(jsonEsperado); // json bien montado
                    done();
                })
        })
    })

    context('GET /calidad_aire/usuario--------------------------------------------------', ()=>{
        let obtenerStub, errorStub;

        it('obtenerCalidadAirePorTiempoYUsuario devuelve un array', (done)=>{
        
            // si obtenerCalidadAirePorTiempoYUsuario devuelve un array de mediciones esperamos un 200 y un formato json en el body
            let resultadoCalidadAire = new Array();
            resultadoCalidadAire.push(new Modelo.InformeCalidadAire(10, 1));
            resultadoCalidadAire.push(new Modelo.InformeCalidadAire(20, 2));
            resultadoCalidadAire.push(new Modelo.InformeCalidadAire(30, 3));
            resultadoCalidadAire.push(new Modelo.InformeCalidadAire(40, 4));
           
            let jsonEsperado =  [
                { valor: 10, tipoGas: 1 },
                { valor: 20, tipoGas: 2 },
                { valor: 30, tipoGas: 3 },
                { valor: 40, tipoGas: 4 }
              ]

            obtenerStub = sinon.stub(laLogica, 'obtenerCalidadAirePorTiempoYUsuario').resolves(resultadoCalidadAire);
            //GET /calidad_aire/usuario?fecha_inicio:Texto&fecha_fin:Texto&idUsuario:N
            request(app).get('/calidad_aire/usuario?idUsuario=29&fecha_inicio=2021-09-29 01:00:00&fecha_fin=2021-09-29 02:00:00')
                .expect(200) // esperamos un 200
                .end((err, response)=>{

                    expect(response.statusCode).equal(200)

                    let parametrosFuncionObtener = obtenerStub.args[0]

                    expect(parametrosFuncionObtener[0]).to.eql('2021-09-29 01:00:00')// fecha ini
                    expect(parametrosFuncionObtener[1]).to.eql('2021-09-29 02:00:00')// fecha fin
                    expect(parametrosFuncionObtener[2]).equal('29')// idUsuario
                    expect(obtenerStub).to.have.been.calledOnce; // se llamo a obtenerTodasMediciones
                    expect(response.body.length).equal(4); // json de 2 elementos
                    expect(response.body).to.eql(jsonEsperado); // json bien montado*/
                    done();
                })
        })

        it('Devolver 500 cuando al endpoint le faltan parametros', (done)=>{
        
            // si obtenerMedicionesDeHastaPorUsuario no devuelve un array de mediciones esperamos un 204 y body vacio
            let resultadoMediciones = new Array();
            

            obtenerStub = sinon.stub(laLogica, 'obtenerMedicionesDeHastaPorUsuario').resolves(resultadoMediciones);
            request(app).get('/calidad_aire/usuario?fecha_inicio=2021-09-29 01:00:00&fecha_fin=2021-09-29 02:00:00')
                .expect(500)
                .end((err, response)=>{
                    expect(response.statusCode).equal(500)
                    expect(obtenerStub).to.have.not.been.calledOnce; // no se llamo a obtenerTodasMediciones
                    expect(response.text).equal('{"mensaje":"Faltan datos o algun parametro esta mal escrito"}'); // mensaje de error
                    done();
                })
        })
    })

    context('GET /calidad_aire/zona--------------------------------------------------', ()=>{
        let obtenerStub, errorStub;

        it('obtenerCalidadAirePorTiempoYUsuario devuelve un array', (done)=>{
        
            // si obtenerCalidadAirePorTiempoYUsuario devuelve un array de mediciones esperamos un 200 y un formato json en el body
            let resultadoCalidadAire = new Array();
            resultadoCalidadAire.push(new Modelo.InformeCalidadAire(10, 1));
            resultadoCalidadAire.push(new Modelo.InformeCalidadAire(20, 2));
            resultadoCalidadAire.push(new Modelo.InformeCalidadAire(30, 3));
            resultadoCalidadAire.push(new Modelo.InformeCalidadAire(40, 4));
           
            let jsonEsperado =  [
                { valor: 10, tipoGas: 1 },
                { valor: 20, tipoGas: 2 },
                { valor: 30, tipoGas: 3 },
                { valor: 40, tipoGas: 4 }
              ]

            obtenerStub = sinon.stub(laLogica, 'obtenerCalidadAirePorTiempoYZona').resolves(resultadoCalidadAire);
            //GET /calidad_aire/zona?fecha_inicio:Texto&fecha_fin:Texto&latitud:R&longitud:R&radio:R"
            request(app).get('/calidad_aire/zona?&fecha_inicio=2021-09-29 01:00:00&fecha_fin=2021-09-29 02:00:00&latitud=0&longitud=1&radio=2')
                .expect(200) // esperamos un 200
                .end((err, response)=>{

                    expect(response.statusCode).equal(200)

                    let parametrosFuncionObtener = obtenerStub.args[0]

                    expect(parametrosFuncionObtener[0]).to.eql('2021-09-29 01:00:00')// fecha ini
                    expect(parametrosFuncionObtener[1]).to.eql('2021-09-29 02:00:00')// fecha fin
                    expect(parametrosFuncionObtener[2]).to.eql('0')// latitud
                    expect(parametrosFuncionObtener[3]).to.eql('1')// longitud
                    expect(parametrosFuncionObtener[4]).to.eql('2')// radio
                    expect(obtenerStub).to.have.been.calledOnce; // se llamo a obtenerTodasMediciones
                    expect(response.body.length).equal(4); // json de 2 elementos
                    expect(response.body).to.eql(jsonEsperado); // json bien montado*/
                    done();
                })
        })

        it('Devolver 500 cuando al endpoint le faltan parametros', (done)=>{
        
            // si obtenerMedicionesDeHastaPorUsuario no devuelve un array de mediciones esperamos un 204 y body vacio
            let resultadoMediciones = new Array();
            
            // GET /calidad_aire/zona?fecha_inicio:Texto&fecha_fin:Texto&latitud:R&longitud:R&radio:R"
            obtenerStub = sinon.stub(laLogica, 'obtenerCalidadAirePorTiempoYZona').resolves(resultadoMediciones);
            request(app).get('/calidad_aire/zona?fecha_inicio=2021-09-29 01:00:00&fecha_fin=2021-09-29 02:00:00&radio=2')
                .expect(500)
                .end((err, response)=>{
                    expect(response.statusCode).equal(500)
                    expect(obtenerStub).to.have.not.been.calledOnce; // no se llamo a obtenerTodasMediciones
                    expect(response.text).equal('{"mensaje":"Faltan datos o algun parametro esta mal escrito"}'); // mensaje de error
                    done();
                })
        })
    })


}) // describe
