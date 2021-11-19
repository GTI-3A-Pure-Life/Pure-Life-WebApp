//----------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------
// Utilidades.js
// @author Ruben Pardo Casanova
// 19/11/2021
//----------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------


const { Medicion } = require("./Modelo.js");
const { InformeCalidadAire } = require("./Modelo.js");


class Utilidades {

//----------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------
    /**
     * R, N -> obtenerIndiceAQI -> R
     * 
     * @param {double} valor el valor del gas en ppm 
     * @param {int} tipoMedicion 1 CO, 2 NO2, 3 SO2, 4 O3
     * 
     * @returns {double} valor AQI 0-300
     * 
     */
    static obtenerIndiceAQI(valor,tipoMedicion){
        let valorAQI = 0;
        switch(tipoMedicion){
            case 1:
                // co
                if(valor<=4.4){
                    // bueno
                valorAQI = valor*50/4.4
                }else if(valor>4.4 && valor<=12.4){
                    // moderado
                    valorAQI = valor*150/12.4
                }else if(valor>12.4 && valor<=15.4){
                    // malo
                    valorAQI = valor*200/15.4
                }else{
                    // muy malo
                    valorAQI = valor*300/15.5
                }
                break;
            case 2:
                // NO2
                if(valor<=53){
                    // bueno
                valorAQI = valor*50/53
                }else if(valor>53 && valor<=360){
                    // moderado
                    valorAQI = valor*150/360
                }else if(valor>360 && valor<=649){
                    // malo
                    valorAQI = valor*200/649
                }else{
                    // muy malo
                    valorAQI = valor*300/1249
                }
                break;
            case 3:
                // SO2
                if(valor<=35){
                    // bueno
                valorAQI = valor*50/35
                }else if(valor>35 && valor<=185){
                    // moderado
                    valorAQI = valor*150/185
                }else if(valor>185 && valor<=304){
                    // malo
                    valorAQI = valor*200/304
                }else{
                    // muy malo
                    valorAQI = valor*300/604
                }
                break;
            case 4:
                // O3
                if(valor<=0.054){
                    // bueno
                valorAQI = valor*50/0.054
                }else if(valor>0.054 && valor<=0.164){
                    // moderado
                    valorAQI = valor*150/0.164
                }else if(valor>0.164 && valor<=0.204){
                    // malo
                    valorAQI = valor*200/0.204
                }else{
                    // muy malo
                    valorAQI = valor*300/0.404
                }
                break;    

        }

        return Math.round(valorAQI*100)/100;;

    }

//----------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------
    /**
     * Lista<Medicion> -> calcularCalidadAire -> Lista<InformeCalidadAire>
     * 
     * @param {[Medicion]} mediciones lista de mediciones 
     * 
     * 
     * @returns {[InformeCalidadAire]} array de informe de calidad aire, cada posicion es tipo de gas y su aqui
     * 
     */
    static calcularCalidadAire(mediciones){

        
        let medicionesCO = new Array();
        let medicionesSO2 = new Array();
        let medicionesNO2 = new Array();
        let medicionesO3 = new Array();

        // 1. separar por tipo de medicion
        for(let i=0;i<mediciones.length;i++){
            let m = mediciones[i];
            switch(m.tipoGas){
                case 1:
                // co
                medicionesCO.push(m);
                break;
            case 2:
                // NO2
                medicionesNO2.push(m);
                break;
            case 3:
                // SO2
                medicionesSO2.push(m);
                break;
            case 4:
                // O3
                medicionesO3.push(m);
                break;
            }
        }
        
        // 2. calcular rango de tiempo de las mediciones de cada array
        // 2.1 ordenar los array por fecha
        medicionesCO = medicionesCO.sort(Medicion.compararPorFechaASC);
        medicionesSO2 = medicionesSO2.sort(Medicion.compararPorFechaASC);
        medicionesNO2 = medicionesNO2.sort(Medicion.compararPorFechaASC);
        medicionesO3 = medicionesO3.sort(Medicion.compararPorFechaASC);
        

        let listaInformeCalidadAire = new Array();
        listaInformeCalidadAire.push(new InformeCalidadAire(
            this.obtenerIndiceAQI(
                this.calcularMediaPPMHoraMediciones(medicionesCO),1)
            ,1))
            
        listaInformeCalidadAire.push(new InformeCalidadAire(
            this.obtenerIndiceAQI(
                this.calcularMediaPPMHoraMediciones(medicionesNO2),2)
                ,2))
        listaInformeCalidadAire.push(new InformeCalidadAire(
            this.obtenerIndiceAQI(
                this.calcularMediaPPMHoraMediciones(medicionesSO2),3)
                ,3))

        listaInformeCalidadAire.push(new InformeCalidadAire(
            this.obtenerIndiceAQI(
                this.calcularMediaPPMHoraMediciones(medicionesO3),4)
                ,4))

        return listaInformeCalidadAire;
   
    }

    /**
     * Lista<Medicion> -> calcularMediaPPM24HorasMediciones -> Double
     * 
     * @param {[Medicion]} mediciones
     * 
     * 
     * @returns {Double} media ppm en 24 horas
     * 
     */
    static calcularMediaPPMHoraMediciones(mediciones){
        //  Calcular tiempo desde la primera fecha y la ultima
        let tiempoHoras = mediciones.length>1
        ? this.calculcarTiempoMsEntreFechas(mediciones[0].fecha, mediciones[mediciones.length-1].fecha  )/1000/60/60
        : 1;
        


        let ppmSuma = 0;
        let mediaPPMUnaHora = 0;

        for(let i=0;i<mediciones.length;i++){
            ppmSuma += mediciones[i].valor;     
        }

        if(tiempoHoras<1){
            // si es menor que uno hacer media aritmetica no del tiempo
            mediaPPMUnaHora = ppmSuma/mediciones.length;
        }else{
            // Calcular media de los valores por el total del tiempo
            mediaPPMUnaHora = ppmSuma/tiempoHoras;
        }

        
        return mediaPPMUnaHora;

    }

    /**
     * Texto,Texto -> calculcarTiempoMsEntreFechas -> Double
     * 
     * @param {String} fecha1V
     * @param {String} fecha2V
     * 
     * 
     * @returns {Double} milisegundos entre las dos fechas
     * 
     */
    static calculcarTiempoMsEntreFechas(fecha1V,fecha2V){
        let fecha1 = new Date(fecha1V);
        let fecha2 = new Date(fecha2V);
        return fecha2.getTime() - fecha1.getTime();    

    }

   
}

module.exports = {
    Utilidades : Utilidades
}