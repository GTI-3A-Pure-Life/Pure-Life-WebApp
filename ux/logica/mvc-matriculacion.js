// .....................................................................
// MVC-MATRICULACIONS.js
// .....................................................................


var VistaMatriculaciones = {

    controlador:{},

    bloqueContenedor:{},
    bloqueTabla:{},
    bloqueCargaObtenerMatriculaciones:{},
    bloqueErrorObtenerMatriculaciones:{},
    bloqueErrorCrearMatriculacion:{},
    formularioCrearMatriculacion:{},
    snackBarInfo:{},
    snackBarError:{},

    // funcion que recibe los id de elementos html para controlarlos
    preparar: function(idContenedor,idTabla,idCargaObtenerMatriculacion,idErrorObtenerMatriculacion,idSnackBarError, formularioCrearMatriculacion,
                        idsnackBarInfo){

        this.bloqueContenedor = document.getElementById(idContenedor);
        this.bloqueTabla = document.getElementById(idTabla);
        this.bloqueCargaObtenerMatriculaciones = document.getElementById(idCargaObtenerMatriculacion);
        this.bloqueErrorObtenerMatriculaciones = document.getElementById(idErrorObtenerMatriculacion);
        this.snackBarError = document.getElementById(idSnackBarError);  
        this.snackBarInfo = document.getElementById(idsnackBarInfo);
        this.esconderTodosLosElementosObtenerMatriculaciones();


        // elementos para el formulario del dni
        this.formularioCrearMatriculacion = document.getElementById(formularioCrearMatriculacion);

    },

    //-----------------------------------------
    // lista de matriculaciones
    //----------------------------------------

    // esconder todos los elementos html de lista
    esconderTodosLosElementosObtenerMatriculaciones:function(){
        this.bloqueCargaObtenerMatriculaciones.style.display = "none";
        this.bloqueContenedor.style.display = "none";
        this.bloqueErrorObtenerMatriculaciones.style.display = "none";
    },

    // esconder los elementos y mostrar la carga
    mostrarCargarObtenerMatriculaciones: function(){
        this.esconderTodosLosElementosObtenerMatriculaciones();
        this.bloqueCargaObtenerMatriculaciones.style.display = "block";
    },
    // esconder los elementos y mostrar el error
    mostrarErrorObtenerPeronas: function(){
        this.esconderTodosLosElementosObtenerMatriculaciones();
        this.bloqueErrorObtenerMatriculaciones.style.display = "block";
    },

    // esconder los elementos y mostrar la lista de matriculaciones
    representarTodasLasMatriculaciones: function(matriculaciones){


        //pintar los elementos por matriculaciones

        this.bloqueTabla.innerHTML ="";
        
        
        
        if(matriculaciones !=null){
            matriculaciones.forEach(element => {
                
                let li = document.createElement("li")
                li.innerHTML = `${element.codigo} | ${element.nombre}`

                let btn2 = document.createElement("button");
                btn2.innerHTML = "Desmatricular"
                btn2.addEventListener("click",()=>{
                    this.controlador.iniciarDesmatricularAlumno(element)
                })

                li.append(btn2)

                this.bloqueTabla.appendChild(li)

            });
        }



        this.esconderTodosLosElementosObtenerMatriculaciones();

        this.bloqueContenedor.style.display = "block";
        this.bloqueTabla.style.display = "block";


    },

    // esconder los elementos y mostrar la lista de alumnos
    representarTodasLosAlumnos: function(alumnos){


        //pintar los elementos por matriculaciones

        this.bloqueTabla.innerHTML ="";
    
        
        
        if(alumnos !=null){
            alumnos.forEach(element => {
                
                let li = document.createElement("li")
                li.innerHTML = `${element.dni} | ${element.nombre} | ${element.apellidos}`

        
                this.bloqueTabla.appendChild(li)

            });
        }



        this.esconderTodosLosElementosObtenerMatriculaciones();

        this.bloqueContenedor.style.display = "block";
        this.bloqueTabla.style.display = "block";


    },

    //-----------------------------------------
    // FIN lista de matriculaciones
    //----------------------------------------

    //-----------------------------------------
    // crear matriculaciones
    //----------------------------------------

    // esconder todos los elementos html de crear matriculacion
    esconderTodosLosElementosInsertarMatriculacion:function(){
        this.bloqueCargaInsertarAsingatura.style.display = "none";
    },

    // esconder los elementos y mostrar la carga de crear matriculacion
    mostrarCargarInsertarmatriculaciones: function(){
        this.esconderTodosLosElementosInsertarMatriculacion();
        this.bloqueCargaInsertarAsingatura.style.display = "block";
    },
    // esconder los elementos y mostrar el error de crear matriculacion
    mostrarErrorInsertarMatriculacion: function(mensaje){
        this.esconderTodosLosElementosInsertarMatriculacion();
        this.bloqueErrorCrearMatriculacion.style.display = "block";
        this.bloqueErrorCrearMatriculacion.innerHTML= mensaje;
    },


    

    // quita los textos de los inputs
    resetFormularioInsertarMatriculacion: function(){

        this.formularioCrearMatriculacion.asignatruas.value = -1;

    },


    //
    // checkFormularioInsertarMatriculacion() -> T/F
    //  return true si el select tiene algo seleccionada que no sea el por defecto
    //
    checkFormularioInsertarMatriculacion: function(){
        return this.formularioCrearMatriculacion.asignatruas.value != -1;
    },

    //
    // getMatriculacionForm() -> {codigo:"",nombre:""}
    //
    getMatriculacionForm:function(){
    
        return {
            codigo: this.formularioCrearMatriculacion.asignatruas.value,
            dni: alumno.dni,
        }
    },

    
    //-----------------------------------------
    // FIN crear matriculacion
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

var ControladorMatriculaciones = {

    vista: VistaMatriculaciones,
    alumnos: [],


    // inicia la obtencion de todas las matriculaciones por apellido
    iniciarObtenerMatriculacionesPorApellido: async function(apellido){
        this.vista.mostrarCargarObtenerMatriculaciones();
        this.vista.controlador = this;
        try{

            
            let respuesta = await LogicaFalsa.obtenerCodigosMatriculacionAlumnoPorApellido(apellido);
            this.matriculaciones = respuesta.datos;
            
            this.vista.representarTodasLasMatriculaciones(this.matriculaciones)

       }catch(e){
            console.error(e);
            this.vista.representarError(e);
        
       }



    },
    // inicia la obtencion de todas las matriculaciones por codigo
    iniciarObtenerMatriculacionesPorCodigo: async function(codigo){
        this.vista.mostrarCargarObtenerMatriculaciones();
        this.vista.controlador = this;
        try{

            
            let respuesta = await LogicaFalsa.obtenerAlumnosMatriculadosPorCodigoAsignatura(codigo);
            this.alumnos = respuesta.datos;
              
             console.log(respuesta);
            this.vista.representarTodasLosAlumnos(this.alumnos)

       }catch(e){
            console.error(e);
            this.vista.representarError(e);
        
       }



    },

    // inicia la inserccion de una  matriculacion
    iniciarInsertarMatriculacion: async function(event){

        event.preventDefault();
        
        try{

            if(this.vista.checkFormularioInsertarMatriculacion()){
                let mensaje = await LogicaFalsa.insertarMatriculaAlumno(this.vista.getMatriculacionForm());
                this.vista.representarMensaje(mensaje)
                this.vista.resetFormularioInsertarMatriculacion()
                setTimeout(function(){
                    window.location.reload()
                },1500)
                
            }else{
                this.vista.representarError("Seleccione una asignatura")
            }
       }catch(e){
            console.error(e);
            this.vista.representarError(e);
        
       }



    },

    iniciarDesmatricularAlumno: async function(element){

        try{
            
                let datos = {
                    codigo: element.codigo,
                    dni: alumno.dni
                }
                
         
                let mensaje = await LogicaFalsa.deleteMatriculaAlumno(datos);
                this.vista.representarMensaje(mensaje)
                this.vista.resetFormularioInsertarMatriculacion()
                setTimeout(function(){
                    window.location.reload()
                },1500)
                
       }catch(e){
            console.error(e);
            this.vista.representarError(e);
        
       }
        
    },

}// controlador 