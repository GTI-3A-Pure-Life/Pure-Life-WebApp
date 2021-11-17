/*var VistaLogin = {
    controlador : {},

    bloqueCorreo : {},
    bloqueContrasenya : {},
    bloqueErrorDatos : {},
    bloqueErrorServidor : {},

    preparar : function (idCorreo, idContrasenya, errorLogin, errorServer) {
        this.bloqueCorreo = document.getElementById(idCorreo);
        this.bloqueContrasenya = document.getElementById(idContrasenya);
        this.bloqueErrorDatos = document.getElementById(errorLogin);
        this.bloqueErrorServidor = document.getElementById(errorServer);
    },
    
    redirigirUsuario : function() {
        if(this.controlador.usuario.rol == 1) {
            location.href = "usuarioApp.html";
        } else if (this.controlador.usuario.rol == 2) {
            location.href = "adminApp.html";
        }
    }, 
}

var ControladorLogin = {
    vista : VistaLogin,
    usuario : {},

    iniciar_sesion : async function() {
        this.vista.controlador = this;
        let correo = this.vista.bloqueCorreo.innerText;
        let contrasenya = this.vista.bloqueContrasenya.innerText.prototype.hashCode;
        console.log(contrasenya);
        try {
            this.usuario = await LogicaFalsa.iniciar_sesion(correo, contrasenya);
            this.vista.redirigirUsuario();
        } catch(err) {
            if(err == "Error en datos") {
                alert("El usuario o la contraseña son incorrectos")
            } else if(err == "Error en servidor") {
                alert("Ha habido un error en el servidor, por favor, inténtelo más tarde");
            }
        }
    },

}*/
var ModeloLogin = {
    usuario: {
        correo: "",
        contrasenya: ""
    },
    setDatos: function(usuario) {
        this.usuario.correo = usuario.correo;
        this.usuario.contrasenya = usuario.contrasenya;
    },

    getDatos: function() {
        return this.usuario;
    }
};

var VistaLogin = {
    correo: document.getElementById("correoInicioSesion"),
    contrasenya: document.getElementById("contrasenyaInicioSesion"),

    redirigirUsuario : function(usuario) {
        if(usuario.rol == 1) {
            location.href = "usuarioApp.html";
            window.localStorage.setItem("sesion", JSON.stringify(usuario))
        } else if (usuario.rol == 2) {
            location.href = "adminApp.html";
            window.localStorage.setItem("sesion", JSON.stringify(usuario))
        }
    }
}

var ControladorLogin = {
    modelo: ModeloLogin,
    vista: VistaLogin,
    manejador: async function() {
        let pass = SHA1(this.vista.contrasenya.value);
        try {
            this.modelo.usuario = await LogicaFalsa.iniciar_sesion(this.vista.correo.value, pass);
            this.vista.redirigirUsuario(this.modelo.usuario);
        } catch(err) {
            if(err.message == "Error en datos") {
                alert("El usuario o la contraseña son incorrectos")
            } else if(err.message == "Error en servidor") {
                alert("Ha habido un error en el servidor, por favor, inténtelo más tarde");
            }
        }
    }
}

