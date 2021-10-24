
## crear usuarios ---------------------------
CREATE TABLE `proyecto_biometria_prueba`.`usuarios` ( `usuario_id` INT NOT NULL AUTO_INCREMENT , `usuario_nombre` VARCHAR(50) NOT NULL , `usuario_correr` VARCHAR(320) NOT NULL , `usuario_contrasenya` VARCHAR(40) NOT NULL , PRIMARY KEY (`usuario_id`)) ENGINE = InnoDB;

## crear tabla sensores ----------------
CREATE TABLE `proyecto_biometria_prueba`.`sensores` ( `sensor_id` VARCHAR(16) NOT NULL , PRIMARY KEY (`sensor_id`)) ENGINE = InnoDB;


## insertar  ----------------
insert into usuarios (usuario_nombre, usuario_correo, usuario_contrasenya)  
values ("Ruben Pardo","rubenpardocasanova@gmail.com","1234");

insert into sensores values ("GTI-3A-PARDO-RUBEN-1");

insert into mediciones (medicion_fecha, medicion_latitud, medicion_longitud, medicion_valor, usuario_id, sensor_id ) 
values( "27/09/2021", 31,21,50, 1, "GTI-3A-PARDO-RUBEN-1" );