// .....................................................................
// MVC-Personas.js
// .....................................................................


var VistaPersonas = {

    controlador:{},

    bloqueContenedor:{},
    bloqueTabla:{},
    bloqueCargaObtenerPersonas:{},
    bloqueCargaInsertarPersonas:{},
    bloqueErrorObtenerPersonas:{},
    bloqueErrorCrearPersona:{},
    inputBuscador:{},
    formularioCrearPersona:{},
    snackBarInfo:{},
    snackBarError:{},
    errorFormDni:{},
    errorFormNombre:{},
    errorFormApellido:{},

    deboMostrarAlPrincipio: false,// bool que controla si el tab es el principal

    // funcion que recibe los id de elementos html para controlarlos
    preparar: function(idContenedor,idTabla,idCargaObtenerPersonas,idCargaInsertarPersonas,idErrorObtenerPersonas,idSnackBarError, formularioCrearPersona,
                        errorFormDni,errorFormNombre,errorFormApellido,idsnackBarInfo, idBuscador,deboMostrarAlPrincipio){

        this.bloqueContenedor = document.getElementById(idContenedor);
        this.bloqueTabla = document.getElementById(idTabla);
        this.bloqueCargaObtenerPersonas = document.getElementById(idCargaObtenerPersonas);
        this.bloqueCargaInsertarPersonas = document.getElementById(idCargaInsertarPersonas);
        this.bloqueErrorObtenerPersonas = document.getElementById(idErrorObtenerPersonas);
        this.snackBarError = document.getElementById(idSnackBarError);  
        this.snackBarInfo = document.getElementById(idsnackBarInfo);
        this.inputBuscador = document.getElementById(idBuscador);
        this.esconderTodosLosElementosObtenerPersonas();


        // elementos para el formulario del dni
        this.formularioCrearPersona = document.getElementById(formularioCrearPersona);
        this.errorFormDni = document.getElementById(errorFormDni);
        this.errorFormNombre = document.getElementById(errorFormNombre);
        this.errorFormApellido = document.getElementById(errorFormApellido);
        this.deboMostrarAlPrincipio = deboMostrarAlPrincipio;
        

    },

    //-----------------------------------------
    // lista de personas
    //----------------------------------------

    // esconder todos los elementos html de lista persona
    esconderTodosLosElementosObtenerPersonas:function(){
        this.bloqueCargaObtenerPersonas.style.display = "none";
        this.bloqueContenedor.style.display = "none";
        this.bloqueErrorObtenerPersonas.style.display = "none";
    },

    // esconder los elementos y mostrar la carga
    mostrarCargarObtenerPersonas: function(){
        this.esconderTodosLosElementosObtenerPersonas();
        this.bloqueCargaObtenerPersonas.style.display = "block";
    },
    // esconder los elementos y mostrar el error
    mostrarErrorObtenerPeronas: function(){
        this.esconderTodosLosElementosObtenerPersonas();
        this.bloqueErrorObtenerPersonas.style.display = "block";
    },

    // T/F->()
    // esconde o muestra el contenido
    mostrarContenido: function(mostrar){
        this.bloqueContenedor.style.display = mostrar ? "block" : "none";
    },

    // esconder los elementos y mostrar la lista de personas
    representarTodasLasPersonas: function(personas){


        //pintar los elementos por personas

        this.bloqueTabla.innerHTML ="";
        if(personas !=null){
            personas.forEach(element => {

                let li = document.createElement("li")
                li.innerHTML = `${element.dni} | ${element.nombre} | ${element.apellidos}`
    
                let btn = document.createElement("button");
                btn.innerHTML = "Borrar"
                btn.addEventListener("click",()=>{
                    this.controlador.iniciarDeletePersona(element)
                })
    
                let btn2 = document.createElement("button");
                btn2.innerHTML = "Ver"
                btn2.addEventListener("click",()=>{
                    this.controlador.verDetallesAlumno(element)
                })
    
    
                li.append(btn)
                li.append(btn2)
                this.bloqueTabla.append(li)
            });
        }


        this.esconderTodosLosElementosObtenerPersonas();
        this.mostrarContenido(this.deboMostrarAlPrincipio);
        
    },

    //-----------------------------------------
    // FIN lista de personas
    //----------------------------------------

    //-----------------------------------------
    // crear personas
    //----------------------------------------

    // esconder todos los elementos html de crear persona
    esconderTodosLosElementosInsertarPersonas:function(){
        this.bloqueCargaInsertarPersonas.style.display = "none";
    },

    // esconder los elementos y mostrar la carga de crear personas
    mostrarCargarInsertarPersonas: function(){
        this.esconderTodosLosElementosInsertarPersonas();
        this.bloqueCargaInsertarPersonas.style.display = "block";
    },
    // esconder los elementos y mostrar el error de crear personas
    mostrarErrorInsertarPersona: function(mensaje){
        this.esconderTodosLosElementosInsertarPersonas();
        this.bloqueErrorCrearPersona.style.display = "block";
        this.bloqueErrorCrearPersona.innerHTML= mensaje;
    },


    //---------------------------------------------
    // checkFormularioInsertarPersona() -> V/F
    // comrpueba que no haya ningun campo vacio en el formulario
    // de crear una persona
    //--------------------------------------
    checkFormularioInsertarPersona:function(){
        let valid = true;

        let dni = this.formularioCrearPersona.dni.value;
        let nombre = this.formularioCrearPersona.nombre.value;
        let apellidos = this.formularioCrearPersona.apellidos.value;
        
        // comrpobar dni vacio
        if(dni.trim().length <= 0){
            // mostrar error dni
            valid = false;
            this.errorFormDni.style.display = "block"
        }

        // comrpobar nombre vacio
        if(nombre.trim().length <= 0){
            // mostrar error nombre
            this.errorFormNombre.style.display = "block"
            valid = false;
        }

        // comrpobar apellidos vacio
        if(apellidos.trim().length <= 0){
            // mostrar error apellidos
            this.errorFormApellido.style.display = "block"
            valid = false;
        }


        return valid;
    }, // check form insertar
    

    // quita los textos de los inputs
    resetFormularioInsertarPersona: function(){

        this.formularioCrearPersona.dni.value = "";
        this.formularioCrearPersona.nombre.value = "";
        this.formularioCrearPersona.apellidos.value = "";

        this.esconderTodosLosElementosInsertarPersonas();

    },

    // esonde los errores de los inputs
    esconderErrorInputsFormCrear: function(){
        this.errorFormApellido.style.display = "none";
        this.errorFormDni.style.display = "none";
        this.errorFormNombre.style.display = "none";
    },


    //
    // getPersonaForm() -> {dni:"",nombre:"",apellidos:""}
    //
    getPersonaForm:function(){
        return {
            dni: this.formularioCrearPersona.dni.value,
            nombre: this.formularioCrearPersona.nombre.value,
            apellidos:this.formularioCrearPersona.apellidos.value,
        }
    },

    
    //-----------------------------------------
    // FIN crear personas
    //----------------------------------------


    representarMensaje:function(mensaje){
        this.snackBarInfo.innerHTML = mensaje;
        this.snackBarInfo.className = "show";
        setTimeout(()=>{ this.snackBarInfo.className = this.snackBarInfo.className.replace("show", ""); }, 3000);
    },

    representarError:function(mensaje){
        
        this.snackBarError.innerHTML = mensaje;
        this.snackBarError.className = "show";
        
        setTimeout(()=>{ this.snackBarError.classList.remove("show"); }, 3000);
    },


}// vista

var ControladorPersonas = {

    vista: VistaPersonas,
    personas: [],


    // inicia la obtencion de todas las personas
    iniciarObtenerPersonas: async function(){
        this.vista.mostrarCargarObtenerPersonas();
        this.vista.controlador = this;
        try{

            let respuesta = await LogicaFalsa.obtenerTodasPersonas();
            this.personas = respuesta.datos;
            this.vista.representarTodasLasPersonas(this.personas)

       }catch(e){
            console.error(e);
            this.vista.representarError(e);
        
       }



    },

    // inicia el borrado de una  persona
    iniciarDeletePersona : async function(persona){
        try{

                let mensaje = await LogicaFalsa.borrarPersona(persona.dni);
                this.vista.representarMensaje(mensaje);
                setTimeout(function(){
                    window.location.reload()
                },1500)
       }catch(e){
            console.error(e);
            this.vista.representarError(e);
       }



    },

    // inicia la inserccion de una  persona
    iniciarInsertarPersonas: async function(event){

        event.preventDefault();
        this.vista.esconderErrorInputsFormCrear()
        
        try{

            if(this.vista.checkFormularioInsertarPersona()){
                let mensaje = await LogicaFalsa.insertarPersona(this.vista.getPersonaForm());
                this.vista.representarMensaje(mensaje)
                this.vista.resetFormularioInsertarPersona()
                setTimeout(function(){
                    window.location.reload()
                },1500)
            }else{
                this.vista.esconderTodosLosElementosInsertarPersonas()
            }
       }catch(e){
            console.error(e);
            this.vista.representarError(e);
        
       }



    },

    // inicia la busqueda de una  persona
    iniciarBusquedaPersona: async function(text){
        let textoIntroducido = this.vista.inputBuscador.value.trim();
        // lanzar peticion si se ha escrito algo
        if(textoIntroducido.length >0){
            try{

                let persona = await LogicaFalsa.buscarPersonaConDNI(textoIntroducido);
                this.verDetallesAlumno(persona)
                
           }catch(e){
                console.error(e);
                this.vista.representarError(e);
            
           }
        
        

        }

    },


    // recibe un alumno y carga una nueva pagina sobre ese
    verDetallesAlumno: function (persona){
        localStorage.setItem("persona-ver-detalles",JSON.stringify(persona));
        localStorage.setItem("lista-asignaturas-ver-detalles",JSON.stringify(ControladorAsignaturas.asignaturas));
        window.location.href = "detalles-alumno.html"
    }

}// controlador 