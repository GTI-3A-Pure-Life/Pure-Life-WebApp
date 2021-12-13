// ........................................................
// mainTestMediciones.js 
// Tests de los endpoints de usuarios
// 09/11/2021 - Rubén Pardo Casanova
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
describe("==================================================\nTest 3 RECURSO USUARIO\n==================================================", function() {


    
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


    context('POST /usuario/registrarse--------------------------------------------------', ()=>{
      

        it('Credenciales correctos', (done)=>{
        
            // lo que espero con que se llame al metodo registrar 
            let usuarioEsperableQueLlameARegistrar = new Modelo.Usuario(null,null,"correo","1234","nombre",null,"4321",1)

            // lo que espero que devuelva la peticion
            let jsonEsperado =  {"usuario":1}

            // lo que le paso a la peticion
            let bodyPost = {"res": {"correo":"correo", "contrasenya":"1234", "nombre":"nombre", "telefono":"4321","rol":"1"}}

            let registrarStub = sinon.stub(laLogica, 'registrar_usuario').resolves(1);// devuelve el id
            request(app).post('/usuario/registrarse')
                .send(bodyPost)
                .expect(200) // esperamos un 200
                .end((err, response)=>{

                    let parametrosFuncion = registrarStub.args[0] // se llama a la funcion con objeto usuario

                    expect(parametrosFuncion[0]).to.eql(usuarioEsperableQueLlameARegistrar)
                    expect(response.statusCode).equal(200)
                    expect(registrarStub).to.have.been.calledOnce; // se llamo a registrar_usuario
                    expect(response.body).to.eql(jsonEsperado); // json bien montado
                    done();
                })
        })

        it('Credenciales ya en uso', (done)=>{
        
           

            // si obtener mediciones devuelve un array de mediciones esperamos un 204 sin body
            let bodyPost = {"res": {"correo":"correo", "contrasenya":"1234", "nombre":"nombre", "telefono":"4321","rol":"1"}}

            let registrarStub = sinon.stub(laLogica, 'registrar_usuario').rejects("Este correo ya esta en uso");
            request(app).post('/usuario/registrarse')
                .send(bodyPost)
                .expect(400) // esperamos un 200
                .end((err, response)=>{

                    expect(response.statusCode).equal(400)
                    expect(registrarStub).to.have.been.calledOnce; // se llamo a registrar
                    expect(response.text).to.eql('{"mensaje":"Este correo ya esta en uso"}'); // 
                    done();
                })
        })
    })

    context('POST /usuario/iniciar_sesion--------------------------------------------------', ()=>{
      

        it('Credenciales correctos', (done)=>{
        
            let resultadoMockIniciarSesion = new Modelo.Usuario(new Posicion(0,0),null,"correo","1234","nombre",null,"4321",1)

            // lo que espero que devuelva la peticion
            let jsonEsperado =  '{"id":null,"rol":1,"correo":"correo","nombre":"nombre","posCasa":{"latitud":0,"longitud":0},"posTrabajo":null,"contrasenya":"1234","telefono":"4321"}'

            // lo que le paso a la peticion
            let bodyPost = {"res":{"correo":"usuario@gmail.com","contrasenya":"7110eda4d09e062aa5e4a390b0a572ac0d2c0220"}}

            let inciarSesionStub = sinon.stub(laLogica, 'iniciar_sesion').resolves(resultadoMockIniciarSesion);// devuelve el id
            request(app).post('/usuario/iniciar_sesion')
                .send(bodyPost)
                .expect(200) // esperamos un 200
                .end((err, response)=>{

                    let parametrosFuncion = inciarSesionStub.args[0] // se llama a la funcion de iniciar sesion con usuario y contra

                    expect(parametrosFuncion[0]).to.eql("usuario@gmail.com")// correo
                    expect(parametrosFuncion[1]).to.eql("7110eda4d09e062aa5e4a390b0a572ac0d2c0220")// contrasenya
                    expect(response.statusCode).equal(200)
                    expect(inciarSesionStub).to.have.been.calledOnce; // se llamo a iniciar_sesion
                    expect(response.text).equal(jsonEsperado); // json bien montado
                    done();
                })
        })

        it('No existe el usuario', (done)=>{
        
            // si obtener mediciones devuelve un array de mediciones esperamos un 204 sin body
            let bodyPost = {"res": {"correo":"correo", "contrasenya":"1234", "nombre":"nombre", "telefono":"4321","rol":"1"}}

            let registrarStub = sinon.stub(laLogica, 'iniciar_sesion').rejects("No existe el usuario");
            request(app).post('/usuario/iniciar_sesion')
                .send(bodyPost)
                .expect(401) 
                .end((err, response)=>{

                    expect(response.statusCode).equal(401)
                    expect(registrarStub).to.have.been.calledOnce; // se llamo a iniciar sesion
                    expect(response.text).to.eql('{"mensaje":"No existe el usuario"}'); // 
                    done();
                })
        })
    })  

}) // describe