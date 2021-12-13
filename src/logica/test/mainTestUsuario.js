// ........................................................
// mainTestMediciones.js 
// Tests de la logica de negocio
// 09/11/2021 - Rubén Pardo Casanova
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
describe( "Test RECURSO USUARIO", function() {

    // ....................................................
    // ....................................................

    // ....................................................
    // ....................................................
    it("Registrar nuevo usuario",async function(){

        const conexion = {
            query: async function(textoSQL,funcion){}
        }; // objeto mock, cuando llame a objetos que usan la conexion no pasara nada
        // yields = mockear el callback que se pasa por parametro a query
        const registrarUsuarioStub = sinon.stub(conexion,"query").yields(null,1) 
        // creamos la logica con el metodo conexion moqueado
        let laLogica = new Logica(conexion);

        let usuario = new Modelo.Usuario(null,null,"usuario@gmail.com","7110eda4d09e062aa5e4a390b0a572ac0d2c0220","prueba",null,"632145789",1)
        let res = await laLogica.registrar_usuario(usuario)

        assert.equal(registrarUsuarioStub.calledOnce,true,"No se llamo al metodo query?")
        assert.equal(registrarUsuarioStub.calledWith('INSERT INTO usuario ' +
        '(nombre,correo,contrasenya,telefono, rol) ' +
        'VALUES (?, ?, ?, ?, ?)'),
        true,"La query no es se monto correctamente?")
        
        let valoresPreparedStatement = registrarUsuarioStub.args[0][1];
        assert.equal(res,1,"¿No devolvio el id del usuario?")
        assert.equal(valoresPreparedStatement[0],"prueba","¿El nombre no es prueba?")
        assert.equal(valoresPreparedStatement[1],"usuario@gmail.com","¿El correo no es usuario@gmail.com?")
        assert.equal(valoresPreparedStatement[2],"7110eda4d09e062aa5e4a390b0a572ac0d2c0220","¿La contrasenya no es 7110eda4d09e062aa5e4a390b0a572ac0d2c0220?")
        assert.equal(valoresPreparedStatement[3],"632145789","¿El telefono no es 632145789?")
        assert.equal(valoresPreparedStatement[4],"1","¿El rol no es 1?")


    })// it


    // ....................................................
    // ....................................................
    it("Iniciar sesion",async function(){
        
        const conexion = {
            query: async function(textoSQL,funcion){}
        }; // objeto mock, cuando llame a objetos que usan la conexion no pasara nada
        // yields = mockear el callback que se pasa por parametro a query
        const resultadoQueryMock = [{
            id: 13,
            nombre: 'prueba',
            correo: 'usuario@gmail.com',
            contrasenya: '7110eda4d09e062aa5e4a390b0a572ac0d2c0220',
            telefono: '632145789',
            rol: 1,
            posCasa: { x: 38.995591, y: -0.167129 },
            posTrabajo: null
          }];
        const iniciarSesionStub = sinon.stub(conexion,"query").yields(null,resultadoQueryMock) 
        // creamos la logica con el metodo conexion moqueado
        let laLogica = new Logica(conexion);


        let res = await laLogica.iniciar_sesion("usuario@gmail.com","7110eda4d09e062aa5e4a390b0a572ac0d2c0220")

        assert.equal(iniciarSesionStub.calledOnce,true,"No se llamo al metodo query?")
        assert.equal(iniciarSesionStub.calledWith('SELECT *, (SELECT posCasa FROM datos_usuario as du WHERE ' +
        'du.idUsuario = u.id) as posCasa, (SELECT posTrabajo FROM ' +
        'datos_usuario as du WHERE du.idUsuario = u.id) as ' +
        'posTrabajo from usuario as u where correo= ? AND ' +
        'contrasenya= ?'),
        true,"La query no es se monto correctamente?")
        
        let valoresPreparedStatement = iniciarSesionStub.args[0][1];
        assert.equal(res.posCasa.latitud,38.995591,"¿No formateo bien el usuario?")
        assert.equal(res.posCasa.longitud,-0.167129,"¿No formateo bien el usuario?")
        assert.equal(valoresPreparedStatement[0],"usuario@gmail.com","¿El correo no es usuario@gmail.com?")
        assert.equal(valoresPreparedStatement[1],"7110eda4d09e062aa5e4a390b0a572ac0d2c0220","¿La contrasenya no es 7110eda4d09e062aa5e4a390b0a572ac0d2c0220?")

    

    })// it

    
}) // describe