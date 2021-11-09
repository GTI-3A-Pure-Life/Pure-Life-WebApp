DELIMITER $$

CREATE TRIGGER no_guardar_registro_duplicado_before_insert
    BEFORE INSERT
    ON registro_estado_sensor FOR EACH ROW
BEGIN
  	DECLARE lastAveriado, lastBateria, lastDescalibrado tinyint(1);
	SELECT averiado INTO lastAveriado FROM registro_estado_sensor WHERE uuidSensor = NEW.uuidSensor order by fechaHora DESC LIMIT 1;
	SELECT pocaBateria INTO lastBateria FROM registro_estado_sensor WHERE uuidSensor = NEW.uuidSensor order by fechaHora DESC LIMIT 1;
	SELECT descalibrado INTO lastDescalibrado FROM registro_estado_sensor WHERE uuidSensor = NEW.uuidSensor order by fechaHora DESC LIMIT 1;


    IF NEW.averiado = lastAveriado
    AND NEW.pocaBateria = lastBateria 
    AND NEW.descalibrado = lastDescalibrado THEN
            signal sqlstate '45000';
    END IF;

END$$    
DELIMITER ;