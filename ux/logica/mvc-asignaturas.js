// .....................................................................
// MVC-ASINGATURAS.js
// .....................................................................


var VistaAsignaturas = {

    controlador:{},

    bloqueContenedor:{},
    bloqueTabla:{},
    bloqueCargaObtenerAsignaturas:{},
    bloqueCargaInsertarAsingatura:{},
    bloqueErrorObtenerAsignaturas:{},
    bloqueErrorCrearAsignatura:{},
    inputBuscador:{},
    formularioCrearAsignatura:{},
    snackBarInfo:{},
    snackBarError:{},
    errorFormCodigo:{},
    errorFormNombre:{},

    deboMostrarAlPrincipio: false,

    // funcion que recibe los id de elementos html para controlarlos
    preparar: function(idContenedor,idTabla,idCargaObtenerAsignatura,idCargaInsertarAsignatura,idErrorObtenerAsignatura,idSnackBarError, formularioCrearAsignatura,
                        errorFormCodigo,errorFormNombre,idsnackBarInfo, idBuscador,deboMostrarAlPrincipio){

        this.bloqueContenedor = document.getElementById(idContenedor);
        this.bloqueTabla = document.getElementById(idTabla);
        this.bloqueCargaObtenerAsignaturas = document.getElementById(idCargaObtenerAsignatura);
        this.bloqueCargaInsertarAsingatura = document.getElementById(idCargaInsertarAsignatura);
        this.bloqueErrorObtenerAsignaturas = document.getElementById(idErrorObtenerAsignatura);
        this.snackBarError = document.getElementById(idSnackBarError);  
        this.snackBarInfo = document.getElementById(idsnackBarInfo);
        this.inputBuscador = document.getElementById(idBuscador);
        this.esconderTodosLosElementosObtenerAsignaturas();


        // elementos para el formulario del dni
        this.formularioCrearAsignatura = document.getElementById(formularioCrearAsignatura);
        this.errorFormCodigo = document.getElementById(errorFormCodigo);
        this.errorFormNombre = document.getElementById(errorFormNombre);
        
        this.deboMostrarAlPrincipio = deboMostrarAlPrincipio;
    },

    //-----------------------------------------
    // lista de asignaturas
    //----------------------------------------

    // esconder todos los elementos html de lista
    esconderTodosLosElementosObtenerAsignaturas:function(){
        this.bloqueCargaObtenerAsignaturas.style.display = "none";
        this.bloqueContenedor.style.display = "none";
        this.bloqueErrorObtenerAsignaturas.style.display = "none";
    },

    // esconder los elementos y mostrar la carga
    mostrarCargarObtenerAsignaturas: function(){
        this.esconderTodosLosElementosObtenerAsignaturas();
        this.bloqueCargaObtenerAsignaturas.style.display = "block";
    },
    // esconder los elementos y mostrar el error
    mostrarErrorObtenerPeronas: function(){
        this.esconderTodosLosElementosObtenerAsignaturas();
        this.bloqueErrorObtenerAsignaturas.style.display = "block";
    },

    // T/F->()
    // esconde o muestra el contenido
    mostrarContenido: function(mostrar){
        this.bloqueContenedor.style.display = mostrar ? "block" : "none";
    },


    // esconder los elementos y mostrar la lista de asignaturas
    representarTodasLasAsignaturas: function(asignaturas){


        //pintar los elementos por asignaturas

        this.bloqueTabla.innerHTML ="";
        if(asignaturas !=null){
            asignaturas.forEach(element => {

                let li = document.createElement("li")
                li.innerHTML = `${element.codigo} | ${element.nombre}`
    
                let btn2 = document.createElement("button");
                btn2.innerHTML = "Ver"
                btn2.addEventListener("click",()=>{
                    this.controlador.verDetallesAsignatura(element)
                })

                li.append(btn2)
                this.bloqueTabla.append(li)
            });
        }


        this.esconderTodosLosElementosObtenerAsignaturas();

        this.mostrarContenido(this.deboMostrarAlPrincipio);


    },

    //-----------------------------------------
    // FIN lista de asignaturas
    //----------------------------------------

    //-----------------------------------------
    // crear asignaturas
    //----------------------------------------

    // esconder todos los elementos html de crear asignatura
    esconderTodosLosElementosInsertarAsignatura:function(){
        this.bloqueCargaInsertarAsingatura.style.display = "none";
    },

    // esconder los elementos y mostrar la carga de crear asignatura
    mostrarCargarInsertarasignaturas: function(){
        this.esconderTodosLosElementosInsertarAsignatura();
        this.bloqueCargaInsertarAsingatura.style.display = "block";
    },
    // esconder los elementos y mostrar el error de crear asignatura
    mostrarErrorInsertarPersona: function(mensaje){
        this.esconderTodosLosElementosInsertarAsignatura();
        this.bloqueErrorCrearAsignatura.style.display = "block";
        this.bloqueErrorCrearAsignatura.innerHTML= mensaje;
    },


    //---------------------------------------------
    // checkFormularioInsertarAsignatura() -> V/F
    // comrpueba que no haya ningun campo vacio en el formulario
    // de crear una asignatura
    //--------------------------------------
    checkFormularioInsertarAsignatura:function(){
        let valid = true;

        let codigo = this.formularioCrearAsignatura.codigo.value;
        let nombre = this.formularioCrearAsignatura.nombre.value;
        
        // comrpobar dni vacio
        if(codigo.trim().length <= 0){
            // mostrar error dni
            valid = false;
            this.errorFormCodigo.style.display = "block"
        }

        // comrpobar nombre vacio
        if(nombre.trim().length <= 0){
            // mostrar error nombre
            this.errorFormNombre.style.display = "block"
            valid = false;
        }

        return valid;
    }, // check form insertar
    

    // quita los textos de los inputs
    resetFormularioInsertarAsignatura: function(){

        this.formularioCrearAsignatura.codigo.value = "";
        this.formularioCrearAsignatura.nombre.value = "";

        this.esconderTodosLosElementosInsertarAsignatura();

    },

    // esonde los errores de los inputs
    esconderErrorInputsFormCrear: function(){
        this.errorFormCodigo.style.display = "none";
        this.errorFormNombre.style.display = "none";
    },


    //
    // getPersonaForm() -> {codigo:"",nombre:""}
    //
    getAsignaturaForm:function(){
        return {
            codigo: this.formularioCrearAsignatura.codigo.value,
            nombre: this.formularioCrearAsignatura.nombre.value,
        }
    },

    
    //-----------------------------------------
    // FIN crear asignatura
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

var ControladorAsignaturas = {

    vista: VistaAsignaturas,
    asignaturas: [],


    // inicia la obtencion de todas las asignaturas
    iniciarObtenerAsignaturas: async function(){
        this.vista.mostrarCargarObtenerAsignaturas();
        this.vista.controlador = this;
        try{

            let respuesta = await LogicaFalsa.obtenerTodasAsignaturas();
            this.asignaturas = respuesta.datos;
            this.vista.representarTodasLasAsignaturas(this.asignaturas)

       }catch(e){
            console.error(e);
            this.vista.representarError(e);
        
       }



    },

    // inicia la inserccion de una  asignatura
    iniciarInsertArasignaturas: async function(event){

        event.preventDefault();
        this.vista.esconderErrorInputsFormCrear()
        
        try{

            if(this.vista.checkFormularioInsertarAsignatura()){
                let mensaje = await LogicaFalsa.insertarAsignatura(this.vista.getAsignaturaForm());
                this.vista.representarMensaje(mensaje)
                this.vista.resetFormularioInsertarAsignatura()
                setTimeout(function(){
                    window.location.reload()
                },1500)
                
            }else{
                this.vista.esconderTodosLosElementosInsertarAsignatura()
            }
       }catch(e){
            console.error(e);
            this.vista.representarError(e);
        
       }



    },

    // inicia la busqueda de una  asignatura
    iniciarBusquedaAsingatura: async function(text){
        let textoIntroducido = this.vista.inputBuscador.value.trim();
        // lanzar peticion si se ha escrito algo
        if(textoIntroducido.length >0){
            try{

                let asignatura = await LogicaFalsa.buscarAsignaturaConCodigo(textoIntroducido);
                this.verDetallesAsignatura(asignatura)
                
           }catch(e){
                console.error(e);
                this.vista.representarError(e);
            
           }
        
        

        }

    },


    // recibe un alumno y carga una nueva pagina sobre ese
    verDetallesAsignatura: function (asignatura){
        localStorage.setItem("asignatura-ver-detalles",JSON.stringify(asignatura));
        window.location.href = "detalles-asignatura.html"
    }

}// controlador 