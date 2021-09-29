// .....................................................................
// MVC-mediciones.js
// Rubén Pardo Casanova 29/09/2021
// .....................................................................


var VistaMediciones = {

    controlador:{},

    bloqueContenedor:{},
    bloqueTabla:{},
    bloqueCargaObtenerMediciones:{},
    snackBarError:{},

    

    // funcion que recibe los id de elementos html para controlarlos
    preparar: function(idContenedor,idTabla,idCargaObtenerMediciones,idSnackBarError){

        this.bloqueContenedor = document.getElementById(idContenedor);
        this.bloqueTabla = document.getElementById(idTabla);
        this.bloqueCargaObtenerMediciones = document.getElementById(idCargaObtenerMediciones);
        this.snackBarError = document.getElementById(idSnackBarError);  
        this.esconderTodosLosElementosObtenerMediciones();

    },

    //-----------------------------------------
    // lista de mediciones
    //----------------------------------------

    // esconder todos los elementos html de lista medicion
    esconderTodosLosElementosObtenerMediciones:function(){
        this.bloqueCargaObtenerMediciones.style.display = "none";
        this.bloqueContenedor.style.display = "none";
    },

    // esconder los elementos y mostrar la carga
    mostrarCargarObtenerMediciones: function(){
        this.esconderTodosLosElementosObtenerMediciones();
        this.bloqueCargaObtenerMediciones.style.display = "block";
    },

    // T/F->()
    // esconde o muestra el contenido
    mostrarContenido: function(mostrar){
        this.bloqueContenedor.style.display = mostrar ? "block" : "none";
    },

    // esconder los elementos y mostrar la lista de mediciones
    representarTodasLasMediciones: function(mediciones){


        //pintar los elementos por mediciones
        
        this.bloqueTabla.innerHTML ="";
        if(mediciones !=null){
            for(let i = 0; i<mediciones.length;i++){
                
                let li = document.createElement("li")
                li.innerHTML = `${mediciones[i].sensor_id} | ${mediciones[i].usuario_id} | ${mediciones[i].medicion_valor} | ${mediciones[i].medicion_fecha} `
    
                this.bloqueTabla.append(li)
            }
            
        }


        this.esconderTodosLosElementosObtenerMediciones();
        this.mostrarContenido(true);
        
    },

    //-----------------------------------------
    // FIN lista de mediciones
    //----------------------------------------

   
    /**
     * Funcion que muestra un snack bar de error durante unos pocos segundos
     * @param {Texto} mensaje a mostrar 
     */
    representarError:function(mensaje){
        
        this.snackBarError.innerHTML = mensaje;
        this.snackBarError.className = "show";
        
        setTimeout(()=>{ this.snackBarError.classList.remove("show"); }, 3000);
    },


}// vista

var ControladorMediciones = {

    vista: VistaMediciones,
    mediciones: [],


    // inicia la obtencion de todas las mediciones 
    iniciarObtenerMediciones: async function(){
        this.vista.mostrarCargarObtenerMediciones();
        this.vista.controlador = this;
        try{

            this.mediciones = await LogicaFalsa.obtenerTodasMediciones();
            
            this.vista.representarTodasLasMediciones(this.mediciones)

       }catch(e){
            console.error(e);
            this.vista.representarError(e);
        
       }



    },



}// controlador 