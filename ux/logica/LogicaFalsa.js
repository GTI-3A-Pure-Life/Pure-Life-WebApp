// .....................................................................
// LogicaFalsa.js
// .....................................................................


const IP_PUERTO="http://localhost:8080"

LogicaFalsa = {


    // .................................................................
    // -->
    // obtenerTodasMediciones() --> 
    // <-- Lista<MedicionCO2>
    // .................................................................
    obtenerTodasMediciones : async function() {
        let respuesta = await fetch(  IP_PUERTO+"/mediciones",{
                      headers : { 'User-Agent' : 'Ruben', 'Content-Type' : 'application/json' },
                     }).then(response=>{

                         if(response.status == 204){
                            //ok pero vacío
                            return {datos:[]};
                         }else if(response.status == 200){
                            // ok con contenido 
                            return response.json();
                         }else{
                            // error
                            throw Error("Error en get mediciones")
                         }
                         
                        
                     }).then(medicionesSTR_JSON=>{
                        
                        let medicionesJSON = [];
                        // convertir el texto recibido por rest a JSON
                        for(let i = 0; i<medicionesSTR_JSON.datos.length; i++){
                            medicionesJSON[i] = JSON.parse(medicionesSTR_JSON.datos[i])
                        }

                         return medicionesJSON;
                     })
                    
        return respuesta;

    },


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