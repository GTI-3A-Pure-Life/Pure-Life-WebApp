// .....................................................................
// LogicaFalsa.js
// .....................................................................

const IP_PUERTO="http://localhost:8080"


LogicaFalsa = {

    // .................................................................
    // -->
    // obtenerTodasPersonas() --> 
    // <-- [{dni:Texto, nombre:Texto: apellidos:Texto}]
    // .................................................................
    obtenerTodasPersonas : async function() {
        let respuesta = await fetch(  IP_PUERTO+"/personas",{
                      headers : { 'User-Agent' : 'Ruben', 'Content-Type' : 'application/json' },
                     }).then(response=>{
                         console.log("OBTENER then");
                         if(response.status == 204){
                            //ok pero vacío
                            return [];
                         }else if(response.status == 200){
                            // ok con contenido
                            return response.json();
                         }else{
                            // error
                            throw Error("Error en get personas")
                         }
                         
                        
                     }).then(json=>{
                         return json;
                     })
                    
        return respuesta;

    },
    // .................................................................
    // datos:{dni:Texto, nombre:Texto: apellidos:Texto}
    // -->
    // insertarPersona() --> String
    // .................................................................
    insertarMedicion: async function( datos ) {
    
      
        let respuesta = await fetch(  IP_PUERTO+"/persona",{
            method: 'PUT',
            headers : { 'User-Agent' : 'Ruben', 'Content-Type' : 'application/json' },
            body: JSON.stringify(datos)
            }).then(response=>{
                if(response.status == 201){
                    //ok pero vacío
                    return "Persona creada Correctamente";
                }else if(response.status == 500){
                    // error
                    throw Error("Ya existe una persona con ese DNI")
                }else{
                    // error
                    throw Error("Error desconocido")
                }
                
                
            }).then(json=>{
                return json;
            })
              
        return respuesta;


    }, // ()

    // .................................................................
    // datos:{dni:Texto}
    // -->
    // borrarPersona() --> String
    // .................................................................
    borrarPersona:async function( dni ) {
        let respuesta = await fetch(  IP_PUERTO+"/persona/"+dni,{
            method: 'DELETE',
            headers : { 'User-Agent' : 'Ruben', 'Content-Type' : 'application/json' },
            }).then(response=>{
                if(response.status == 200){
                    //ok pero vacío
                    return "Persona borrada Correctamente";
                }else if(response.status == 404){
                    // error
                    throw Error("No encontré el dni: "+dni)
                }else{
                    // error
                    throw Error("Error desconocido")
                }
                
                
            }).then(respuesta=>{
                return respuesta;
            })
              
        return respuesta;
    }, // ()

    // .................................................................
    // dni:Texto
    // -->
    // buscarPersonaPorDNI() <--
    // <--
    // {dni:Texto, nombre:Texto: apellidos:Texto}
    // .................................................................
    buscarPersonaConDNI: async function( dni ) {
        let respuesta = await fetch(  IP_PUERTO+"/persona/"+dni,{
            headers : { 'User-Agent' : 'Ruben', 'Content-Type' : 'application/json' },
            }).then(response=>{
                if(response.status == 200){
                    //ok pero vacío
                    return response.json();
                }else if(response.status == 404){
                    // error
                    throw Error("No se encontró una persona con dni: "+dni)
                }else{
                    // error
                    throw Error("Error desconocido")
                }
                
                
            }).then(json=>{
                return json.datos;
            })
              
        return respuesta;
    }, // ()


   // .................................................................
    // -->
    // obtenerTodasAsignaturas() --> 
    // <-- [{codigo:Texto, nombre:Texto}]
    // .................................................................
    obtenerTodasAsignaturas:async function( ) {
        let respuesta = await fetch(  IP_PUERTO+"/asignaturas",{
            headers : { 'User-Agent' : 'Ruben', 'Content-Type' : 'application/json' },
           }).then(response=>{
               if(response.status == 204){
                  //ok pero vacío
                  return [];
               }else if(response.status == 200){
                  // ok con contenido
                  return response.json();
               }else{
                  // error
                  throw Error("Al obtener las asignaturas")
               }
               
              
           }).then(json=>{
               return json;
           })
          
        return respuesta;

    },

    // .................................................................
    // datos:{codigo:Texto, nombre:Texto}
    // -->
    // insertarAsignatura() -->
    // <-- String
    // .................................................................
    insertarAsignatura:async function( datos ) {
        let respuesta = await fetch(  IP_PUERTO+"/asignatura",{
            method: 'PUT',
            headers : { 'User-Agent' : 'Ruben', 'Content-Type' : 'application/json' },
            body: JSON.stringify(datos)
            }).then(response=>{
                if(response.status == 201){
                    //ok pero vacío
                    return "Asignatura creada Correctamente";
                }else if(response.status == 500){
                    // error
                    throw Error("Ya existe una asignatura con ese Codigo")
                }else{
                    // error
                    throw Error("Error desconocido")
                }
                
                
            }).then(json=>{
                return json;
            })
              
        return respuesta;
    }, // ()

    // .................................................................
    // codigo:Texto
    // -->
    // buscarAsignaturaConCodigo() <--
    // <--
    // {codigo:Texto, nombre:Texto}
    // .................................................................
    buscarAsignaturaConCodigo:async function( codigo ) {
        let respuesta = await fetch(  IP_PUERTO+"/asignatura/"+codigo,{
            headers : { 'User-Agent' : 'Ruben', 'Content-Type' : 'application/json' },
            }).then(response=>{
                if(response.status == 200){
                    //ok pero vacío
                    return response.json();
                }else if(response.status == 404){
                    // error
                    throw Error("No se ha encontrado una asignatura con codigo: "+codigo)
                }else{
                    // error
                    throw Error("Error desconocido")
                }
                
                
            }).then(json=>{
                return json.datos;
            })
              
        return respuesta;
    }, // ()


    // .................................................................
    // datos:{codigo:Texto, dni:Texto}
    // -->
    // insertarMatriculaAlumno() -->
    // .................................................................
    insertarMatriculaAlumno: async function( datos ) {
        let error = false
        let respuesta = await fetch(  IP_PUERTO+"/matriculacion",{
            method: 'PUT',
            headers : { 'User-Agent' : 'Ruben', 'Content-Type' : 'application/json' },
            body: JSON.stringify(datos)
            }).then(response=>{
                if(response.status == 201){
                    //ok pero vacío
                    return "Alumno matriculado Correctamente";
                }else if(response.status == 500){
                    error = true;            
                    // error
                   return response.json();
                }else{
                    // error
                    throw response.statusText
                }
                
                
            }).then(json=>{
                
                return json;
            })
                
            if(error){  
                throw Error(respuesta.mensaje)
            }else{
                return respuesta;
            }
    }, // ()

    // .................................................................
    // datos:{codigo:Texto, dni:Texto}
    // -->
    // deleteMatriculaAlumno() -->
    // .................................................................
    deleteMatriculaAlumno: async function( datos ) {
        let error = false
        let respuesta = await fetch(  IP_PUERTO+"/matriculacion",{
            method: 'DELETE',
            headers : { 'User-Agent' : 'Ruben', 'Content-Type' : 'application/json' },
            body: JSON.stringify(datos)
            }).then(response=>{
                if(response.status == 200){
                    //ok pero vacío
                    return "Alumno desmatriculado Correctamente";
                }else if(response.status == 500){
                    error = true;            
                    // error
                   return response.json();
                }else{
                    // error
                    throw response.statusText
                }
                
                
            }).then(json=>{
                
                return json;
            })
                
            if(error){  
                throw Error(respuesta.mensaje)
            }else{
                return respuesta;
            }
    }, // ()


    // .................................................................
    // codigoAsignatura:Texto
    // -->
    // obtenerAlumnosMatriculadosPorCodigoAsignatura() <--
    // <--
    // [{dni:Texto, nombre:Texto: apellidos:Texto}]
    // .................................................................
    obtenerAlumnosMatriculadosPorCodigoAsignatura: async function( codigoAsignatura ) {
        let respuesta = await fetch(  IP_PUERTO+"/matriculacion/por-codigo/"+codigoAsignatura,{
            headers : { 'User-Agent' : 'Ruben', 'Content-Type' : 'application/json' },
           }).then(response=>{
               if(response.status == 204){  
                  //ok pero vacío
                  return [];
               }else if(response.status == 200){
                  // ok con contenido
                  return response.json();
               }else{
                  // error
                  throw Error("No se ha podido obtener las matriculaciones de la asignatura")
               }
               
              
           }).then(json=>{
               return json;
           })
          
        return respuesta;
    }, // ()

    // .................................................................
    // apellido:Texto
    // -->
    // obtenerCodigosMatriculacionAlumnoPorApellido() <--
    // <--
    // [{codigo:Texto,nombre:Texto}]
    // .................................................................
    obtenerCodigosMatriculacionAlumnoPorApellido: async function( apellidos ) {
        let respuesta = await fetch(  IP_PUERTO+"/matriculacion/por-apellido/"+apellidos,{
            headers : { 'User-Agent' : 'Ruben', 'Content-Type' : 'application/json' },
           }).then(response=>{
               if(response.status == 204){  
                  //ok pero vacío
                  return [];
               }else if(response.status == 200){
                  // ok con contenido
                  return response.json();
               }else{
                  // error
                  throw Error("No se ha podido obtener las matriculaciones del alumno")
               }
               
              
           }).then(json=>{
               return json;
           })
          
        return respuesta;

    } ,// ()

    // .................................................................
    // cerrar() -->
    // .................................................................
    cerrar:function() {
        return new Promise( (resolver, rechazar) => {
        this.laConexion.close( (err)=>{
                ( err ? rechazar(err) : resolver() )
            })
        })
    }, // ()
} // class