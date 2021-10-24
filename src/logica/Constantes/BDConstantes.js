/**
 * Fichero que contiene clases con los nombres de las tablas de la BD y sus atributos
 * 29/09/2021
 * @author Rubén Pardo Casanova
 */


// Tabla Mediciones
class TABLA_MEDICIONES{

   
    static NOMBRE_TABLA = "mediciones";
    static ID = "medicion_id";
    static FECHA = "medicion_fecha";
    static VALOR = "medicion_valor";
    static LATITUD = "medicion_latitud";
    static LONGITUD = "medicion_longitud";
    static USUARIO = "usuario_id";
    static SENSOR = "sensor_id";

}


// Tabla Usuarios
class TABLA_USUARIOS{

   
    static NOMBRE_TABLA = "usuarios";
    static ID = "usuario_id";
    static NOMBRE = "usuario_nombre";
    static  CORREO = "usuario_correo";
    static CONTRASENYA = "usuario_contrasenya";

}

// Tabla Sensores
class TABLA_SENSORES{

   
    static NOMBRE_TABLA = "sensores";
    static ID = "sensor_id";

}


module.exports = {
    TABLA_MEDICIONES : TABLA_MEDICIONES,
    TABLA_USUARIOS : TABLA_USUARIOS,
    TABLA_SENSORES : TABLA_SENSORES
}