/**
 * Fichero que contiene clases con los nombres de las tablas de la BD y sus atributos
 * 29/09/2021
 * @author Rubén Pardo Casanova
 */


// Tabla Mediciones
class TABLA_MEDICIONES{

   
    static NOMBRE_TABLA = "medicion";
    static ID = "id";
    static FECHA = "fechaHora";
    static VALOR = "valor";
    static POSICION = "posMedicion";
    static TIPO_GAS = "tipoGas";
    static USUARIO = "idUsuario";
    static SENSOR = "uuidSensor";

}



// Tabla Usuarios
class TABLA_USUARIOS{

   
    static NOMBRE_TABLA = "usuario";
    static ID = "id";
    static NOMBRE = "nombre";
    static CORREO = "correo";
    static CONTRASENYA = "contrasenya";
    static TELEFONO = "telefono";
    static ROL = "rol";
    static VERIFICADO = "verificado";
    static TOKEN = "token";

}

// Tabla Sensores
class TABLA_SENSORES{

   
    static NOMBRE_TABLA = "sensor";
    static ID = "uuid";
    static FACTOR_DESCALIBRACION = "factorDescalibracion";

}

// Tabla DATOS_USUARIO
class TABLA_DATOS_USUARIO{

   
    static NOMBRE_TABLA = "datos_usuario";
    static ID_USUARIO = "idUsuario";
    static POSICION_CASA = "posCasa";
    static POSICION_TRABAJO = "posTrabajo";

}

// Tabla registro estado sensor
class TABLA_REGISTRO_ESTADO_SENSOR{

   
    static NOMBRE_TABLA = "registro_estado_sensor";
    static ID = "id";
    static ID_SENSOR = "uuidSensor";
    static POCA_BATERIA = "pocaBateria";
    static AVERIADO = "averiado";
    static LEIDO = "leido";
    static DESCALIBRADO = "descalibrado";
    static FECHA_HORA = "fechaHora";

}

class TABLA_CIUDADES {
    static NOMBRE_TABLA = "radios_ciudades";
    static ID = "id";
    static CIUDAD = "posCiudad";
    static POSICION_CIUDAD = "posCiudad";
    static RADIO = "radio";
}

class TABLA_DATOS_ADMIN {
    static NOMBRE_TABLA = "datos_admin";
    static ID = "id";
    static ID_USUARIO = "idUsuario";
    static ID_CIUDAD = "idCiudad";
    
}

module.exports = {
    TABLA_MEDICIONES : TABLA_MEDICIONES,
    TABLA_USUARIOS : TABLA_USUARIOS,
    TABLA_SENSORES : TABLA_SENSORES,
    TABLA_REGISTRO_ESTADO_SENSOR : TABLA_REGISTRO_ESTADO_SENSOR,
    TABLA_DATOS_USUARIO:TABLA_DATOS_USUARIO,
    TABLA_CIUDADES: TABLA_CIUDADES,
    TABLA_DATOS_ADMIN: TABLA_DATOS_ADMIN
}