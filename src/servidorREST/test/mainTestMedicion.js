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

const request = require('supertest');
//const sandbox = sinon.sandbox.create();


var app = rewire('../mainServidorREST').servidorExpress;
var Logica = require('../../logica/Logica.js');
const Modelo = require('../../logica/Modelo.js')
// ........................................................
// ........................................................
const IP_PUERTO="http://localhost:8080"

// ........................................................
// main ()
// ........................................................
describe( "Test 1 RECURSO MEDICION", function() {
    
  
    var laLogica;
    this.beforeAll(()=>{
        laLogica = new Logica(null);
        app = rewire('../mainServidorREST').servidorExpress;
        var reglas = rewire("../ReglasREST.js")
   
        reglas.cargar(app,laLogica)
    })

      afterEach(()=>{
        sinon.restore();
    })
    

    context('GET /mediciones', ()=>{
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


                    expect(obtenerStub).to.have.been.calledOnce; // se llamo a obtenerTodasMediciones
                    expect(response.body.length).equal(2); // json de 2 elementos
                    expect(response.body).to.eql(jsonEsperado); // json bien montado
                    done();
                })
        })
    })


     // ....................................................
    // ....................................................
   /* it( "probar vacío GET /mediciones", function( hecho ) {

    

       request(app)

        respuesta.done()
       /* request.get({ url : IP_PUERTO+"/mediciones",
                      headers : { 'User-Agent' : 'Ruben', 'Content-Type' : 'application/json' },
                     },
        function( err, respuesta, carga ) {
            assert.equal( err, null, "¿ha habido un error?" )
            assert.equal( respuesta.statusCode, 204, "¿El código no es 204 (OK NO CONTENT)" )

            hecho() 
                
        } // callback
        ) // .get
    }) // it
    */
    // ....................................................
    // ....................................................
   /* it( "probar POST mediciones nueva /mediciones", function( hecho ) {
        
       
        var mediciones = Array();
        mediciones.push(new Modelo.Medicion(null, 3, '2021-11-22 00:00:00', new Modelo.Posicion(38.995591,-0.16732),38, 'GTI-3A-1',1));
        mediciones.push(new Modelo.Medicion(null, 4, '2021-11-22 01:00:00', new Modelo.Posicion(38.995591,-0.16732), 38, 'GTI-3A-1',1));
        mediciones.push(new Modelo.Medicion(null, 3, '2021-11-22 02:00:00', new Modelo.Posicion(38.995591,-0.16732), 38, 'GTI-3A-1',1));
        mediciones.push(new Modelo.Medicion(null, 20, '2021-11-22 03:00:00', new Modelo.Posicion(38.995591,-0.16732), 38, 'GTI-3A-1',1));
        mediciones.push(new Modelo.Medicion(null, 22, '2021-11-22 04:00:00', new Modelo.Posicion(38.995591,-0.16732), 38, 'GTI-3A-1',1));
        mediciones.push(new Modelo.Medicion(null, 3, '2021-11-22 05:00:00', new Modelo.Posicion(38.995591,-0.16732), 38, 'GTI-3A-1',1));
        mediciones.push(new Modelo.Medicion(null, 4, '2021-11-22 06:00:00', new Modelo.Posicion(38.995591,-0.16732), 38, 'GTI-3A-1',1));
        mediciones.push(new Modelo.Medicion(null, 1, '2021-11-22 07:00:00', new Modelo.Posicion(38.995591,-0.16732), 38, 'GTI-3A-1',1));
        mediciones.push(new Modelo.Medicion(null, 28, '2021-11-22 16:00:00', new Modelo.Posicion(50.995591,-0.16732), 38, 'GTI-3A-1',1));
        mediciones.push(new Modelo.Medicion(null, 0, '2021-11-22 02:00:00', new Modelo.Posicion(38.995366,-0.167041), 38, 'GTI-3A-1',2));
        mediciones.push(new Modelo.Medicion(null, 200, '2021-11-22 02:00:00', new Modelo.Posicion(80.995366,-0.167041), 38, 'GTI-3A-1',2));
        mediciones.push(new Modelo.Medicion(null, 190, '2021-11-22 03:00:00', new Modelo.Posicion(38.995591,-0.16732),38, 'GTI-3A-1',3));
        mediciones.push(new Modelo.Medicion(null, 0.032, '2021-11-22 04:00:00', new Modelo.Posicion(38.995591,-0.16732), 38, 'GTI-3A-1',4));
        mediciones.push(new Modelo.Medicion(null, 0.1, '2021-11-22 04:01:00', new Modelo.Posicion(80.995591,-0.16732), 38, 'GTI-3A-1',4));

        var listaJSONmediciones = Modelo.Medicion.listaMedicionesAJSON(mediciones)
        
       request.post({ url : IP_PUERTO+"/mediciones",
                      headers : { 'User-Agent' : 'Ruben', 'Content-Type' : 'application/json' },
                      body : JSON.stringify({res: listaJSONmediciones })
                     },
                    function( err, respuesta, carga ) {
                        assert.equal( err, null, "¿ha habido un error?" )
                        assert.equal( respuesta.statusCode, 201, "¿El código no es 201 (Created ok)" )
                        
                        var solucion = JSON.parse( carga )
                        assert.equal( solucion.mensaje, "Mediciones creadas correctamente", "¿El mensaje no es 'Mediciones creadas correctamente'?" )
                        hecho()
                    } // callback// callback
        ) // .put
    }) // it

    // ....................................................
    // ....................................................
    it( "probar POST medicion usuario no existente /medicion", function( hecho ) {
        
        var a = new Modelo.Medicion(null, 0, '2021-11-22', new Modelo.Posicion(30,30), -1, 'GTI-3A-1',1)
        
        var mediciones = Array();
        mediciones.push(a);
        var listaJSONmediciones = Modelo.Medicion.listaMedicionesAJSON(mediciones)

        request.post({ url : IP_PUERTO+"/mediciones",
                      headers : { 'User-Agent' : 'Ruben', 'Content-Type' : 'application/json' },
                      body : JSON.stringify({res: listaJSONmediciones })
                     },
                    function( err, respuesta, carga ) {
                        assert.equal( err, null, "¿ha habido un error?" )
                        assert.equal( respuesta.statusCode, 500, "¿El código no es 500 (Error)" )

                        var solucion = JSON.parse( carga )
                        assert.equal( solucion.mensaje, "El usuario o sensor no existe", "¿El mensaje no es 'El usuario o sensor no existe'?" )
                        hecho()
                    } // callback// callback


        ) // .put
    }) // it


    // ....................................................
    // ....................................................
    it( "probar POST mediciones sensor no existente /mediciones", function( hecho ) {
        
        var a = new Modelo.Medicion(null, 0, '2021-11-22', new Modelo.Posicion(30,30), 4, 'GTI-3A-',1)
        
        var mediciones = Array();
        mediciones.push(a);
        
        var listaJSONmediciones = Modelo.Medicion.listaMedicionesAJSON(mediciones)

        request.post({ url : IP_PUERTO+"/mediciones",
                      headers : { 'User-Agent' : 'Ruben', 'Content-Type' : 'application/json' },
                      body : JSON.stringify({res: listaJSONmediciones })
                     },
                     function( err, respuesta, carga ) {
                        assert.equal( err, null, "¿ha habido un error?" )
                        assert.equal( respuesta.statusCode, 500, "¿El código no es 500 (Error)" )

                        var solucion = JSON.parse( carga )
                        assert.equal( solucion.mensaje, "El usuario o sensor no existe", "¿El mensaje no es 'El usuario o sensor no existe'?" )
                        hecho()
                    } // callback// callback
        ) // .put
    }) // it


    // ....................................................
    // ....................................................
    it( "probar GET /mediciones", function( hecho ) {
        request.get({ url : IP_PUERTO+"/mediciones",
                      headers : { 'User-Agent' : 'Ruben', 'Content-Type' : 'application/json' },
                     },
                    function( err, respuesta, carga ) {
                        assert.equal( err, null, "¿ha habido un error?" )
                        assert.equal( respuesta.statusCode, 200, "¿El código no es 200 (ok)" )

                        var solucion = JSON.parse( carga )

                        var listaMediciones = Modelo.Medicion.jsonAListaMediciones(solucion);
           
                        

                        // si el objeto esta vacio
                        assert.equal( listaMediciones.length, 14, "¿No hay 13 registros?" )
                        assert.equal( listaMediciones[13].valor, 0.1, "¿No se ha convertido a objeto medicion bien?" )
                        
                        hecho()
                    } // callback// callback
        ) // .get
    }) // it

    // ....................................................
    // ....................................................
    it( "probar GET /mediciones/:fecha_inicio/:fecha_fin", function( hecho ) {
        request.get({ url : IP_PUERTO+"/mediciones/2021-11-22 00:00:00/2021-11-22 03:00:00",
                      headers : { 'User-Agent' : 'Ruben', 'Content-Type' : 'application/json' },
                     },
                    function( err, respuesta, carga ) {
                        assert.equal( err, null, "¿ha habido un error?" )
                        assert.equal( respuesta.statusCode, 200, "¿El código no es 200 (ok)" )

                        var solucion = JSON.parse( carga )

                        var listaMediciones = Modelo.Medicion.jsonAListaMediciones(solucion);
           
                        

                        // si el objeto esta vacio
                        assert.equal( listaMediciones.length, 7, "¿No hay 7 registros ?" )
                        assert.equal( listaMediciones[6].valor, 190, "¿No se ha convertido a objeto medicion bien?" )
                        
                        hecho()
                    } // callback// callback
        ) // .get
    }) // it

     // ....................................................
    // ....................................................
    it( "probar GET /calidad_aire/usuario?fecha_inicio:Texto&fecha_fin:Texto&idUsuario:N", function( hecho ) {
        request.get({ url : IP_PUERTO+"/calidad_aire/usuario?fecha_inicio=2021-11-22 00:00:00&fecha_fin=2021-11-22 23:59:00&idUsuario=29",
                      headers : { 'User-Agent' : 'Ruben', 'Content-Type' : 'application/json' },
                     },

                    
                    function( err, respuesta, carga ) {
                        assert.equal( err, null, "¿ha habido un error?" )
                        assert.equal( respuesta.statusCode, 200, "¿El código no es 200 (ok)" )
                
                        var solucion = JSON.parse( carga )

                        assert.equal( solucion.length, 4, "¿No estan los 4 informes de calidad de aire ?" )
                        assert.equal( solucion[0].valor, 118.28, "¿El primer valor no es 92.74?" )
                        assert.equal( solucion[3].valor, 60.37, "¿El primer valor no es 60.37?" )
                        
                        hecho()
                    } // callback// callback
        ) // .get
    }) // it

     // ....................................................
    // ....................................................
    it( "probar GET /calidad_aire/zona?fecha_inicio:Texto&fecha_fin:Texto&latitud:R?longitud:R?radio:R", function( hecho ) {
        request.get({ url : IP_PUERTO+"/calidad_aire/zona?fecha_inicio=2021-11-22 00:00:00&fecha_fin=2021-11-22 23:59:00&latitud=38.995591&longitud=-0.167129&radio=18",
                      headers : { 'User-Agent' : 'Ruben', 'Content-Type' : 'application/json' },
                     },

                    
                    function( err, respuesta, carga ) {
                        assert.equal( err, null, "¿ha habido un error?" )
                        assert.equal( respuesta.statusCode, 200, "¿El código no es 200 (ok)" )

                        var solucion = JSON.parse( carga )
                
                        assert.equal( solucion.length, 4, "¿No estan los 4 informes de calidad de aire ?" )
                        assert.equal( solucion[0].valor, 90.73, "¿El primer valor no es 90.73?" )
                        assert.equal( solucion[3].valor, 29.63, "¿El primer valor no es 20.63?" )
                        
                        hecho()
                    } // callback// callback
        ) // .get
    }) // it

    */




}) // describe
