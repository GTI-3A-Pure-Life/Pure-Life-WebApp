-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-11-2021 a las 11:51:00
-- Versión del servidor: 10.4.21-MariaDB
-- Versión de PHP: 8.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `purelife`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `datos_usuario`
--

CREATE TABLE `datos_usuario` (
  `id` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `posCasa` point DEFAULT NULL,
  `posTrabajo` point DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `datos_usuario`
--

INSERT INTO `datos_usuario` (`id`, `idUsuario`, `posCasa`, `posTrabajo`) VALUES
(2, 13, 0x0000000001010000000000000000003e400000000000003e40, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medicion`
--

CREATE TABLE `medicion` (
  `id` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `uuidSensor` varchar(36) NOT NULL,
  `posMedicion` point NOT NULL,
  `fechaHora` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `valor` double NOT NULL,
  `tipoGas` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `medicion`
--

INSERT INTO `medicion` (`id`, `idUsuario`, `uuidSensor`, `posMedicion`, `fechaHora`, `valor`, `tipoGas`) VALUES
(1, 13, 'GTI-3A-1', 0x0000000001010000000000000000003e400000000000003e40, '2021-09-29 00:00:00', 1, 1),
(2, 13, 'GTI-3A-1', 0x0000000001010000000000000000003e400000000000003e40, '2021-09-29 00:10:00', 2, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registro_estado_sensor`
--

CREATE TABLE `registro_estado_sensor` (
  `id` int(11) NOT NULL,
  `uuidSensor` varchar(36) NOT NULL,
  `pocaBateria` tinyint(1) NOT NULL DEFAULT 0,
  `averiado` tinyint(1) NOT NULL DEFAULT 0,
  `descalibrado` tinyint(1) NOT NULL DEFAULT 0,
  `fechaHora` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `leido` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `registro_estado_sensor`
--

INSERT INTO `registro_estado_sensor` (`id`, `uuidSensor`, `pocaBateria`, `averiado`, `descalibrado`, `fechaHora`, `leido`) VALUES
(1, 'GTI-3A-1', 1, 0, 0, '2021-10-29 10:39:00', 0),
(3, 'GTI-3A-1', 1, 1, 0, '2021-10-29 13:39:00', 0),
(5, 'GTI-3A-1', 0, 1, 0, '2021-10-29 10:39:00', 0);

--
-- Disparadores `registro_estado_sensor`
--
DELIMITER $$
CREATE TRIGGER `no_guardar_registro_duplicado_before_insert` BEFORE INSERT ON `registro_estado_sensor` FOR EACH ROW BEGIN
  	DECLARE lastAveriado, lastBateria, lastDescalibrado tinyint(1);
	SELECT averiado INTO lastAveriado FROM registro_estado_sensor WHERE uuidSensor = NEW.uuidSensor order by fechaHora DESC LIMIT 1;
	SELECT pocaBateria INTO lastBateria FROM registro_estado_sensor WHERE uuidSensor = NEW.uuidSensor order by fechaHora DESC LIMIT 1;
	SELECT descalibrado INTO lastDescalibrado FROM registro_estado_sensor WHERE uuidSensor = NEW.uuidSensor order by fechaHora DESC LIMIT 1;
    
    IF NEW.averiado = lastAveriado
    AND NEW.pocaBateria = lastBateria 
    AND NEW.descalibrado = lastDescalibrado THEN
            signal sqlstate '45000';
    END IF;

END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `nombre` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `nombre`) VALUES
(1, 'normal'),
(2, 'admin');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sensor`
--

CREATE TABLE `sensor` (
  `uuid` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `sensor`
--

INSERT INTO `sensor` (`uuid`) VALUES
('GTI-3A-1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_gas`
--

CREATE TABLE `tipo_gas` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(10000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tipo_gas`
--

INSERT INTO `tipo_gas` (`id`, `nombre`, `descripcion`) VALUES
(1, 'CO', ''),
(2, 'NO2', ''),
(3, 'SO2', ''),
(4, 'O3', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `correo` varchar(320) NOT NULL,
  `contrasenya` varchar(40) NOT NULL,
  `telefono` varchar(30) NOT NULL,
  `rol` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `nombre`, `correo`, `contrasenya`, `telefono`, `rol`) VALUES
(13, 'prueba', 'usuario@gmail.com', '7110eda4d09e062aa5e4a390b0a572ac0d2c0220', '632145789', 1),
(22, 'desde rest', 'usuario3@gmail.com', '7110eda4d09e062aa5e4a390b0a572ac0d2c0220', '1234', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario_sensor`
--

CREATE TABLE `usuario_sensor` (
  `id` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `uuidSensor` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `datos_usuario`
--
ALTER TABLE `datos_usuario`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_usuario` (`idUsuario`);

--
-- Indices de la tabla `medicion`
--
ALTER TABLE `medicion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_tipoGas` (`tipoGas`),
  ADD KEY `fk_usuario_medicion` (`idUsuario`),
  ADD KEY `fk_sensor_medicion` (`uuidSensor`);

--
-- Indices de la tabla `registro_estado_sensor`
--
ALTER TABLE `registro_estado_sensor`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_registro_sensor` (`uuidSensor`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `sensor`
--
ALTER TABLE `sensor`
  ADD PRIMARY KEY (`uuid`);

--
-- Indices de la tabla `tipo_gas`
--
ALTER TABLE `tipo_gas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `correo` (`correo`),
  ADD KEY `fk_rol` (`rol`);

--
-- Indices de la tabla `usuario_sensor`
--
ALTER TABLE `usuario_sensor`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_usuario_sensor` (`idUsuario`),
  ADD KEY `fk_sensor_usuario` (`uuidSensor`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `datos_usuario`
--
ALTER TABLE `datos_usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `medicion`
--
ALTER TABLE `medicion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `registro_estado_sensor`
--
ALTER TABLE `registro_estado_sensor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `tipo_gas`
--
ALTER TABLE `tipo_gas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de la tabla `usuario_sensor`
--
ALTER TABLE `usuario_sensor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `datos_usuario`
--
ALTER TABLE `datos_usuario`
  ADD CONSTRAINT `fk_usuario` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `medicion`
--
ALTER TABLE `medicion`
  ADD CONSTRAINT `fk_sensor_medicion` FOREIGN KEY (`uuidSensor`) REFERENCES `sensor` (`uuid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_tipoGas` FOREIGN KEY (`tipoGas`) REFERENCES `tipo_gas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_usuario_medicion` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `registro_estado_sensor`
--
ALTER TABLE `registro_estado_sensor`
  ADD CONSTRAINT `fk_registro_sensor` FOREIGN KEY (`uuidSensor`) REFERENCES `sensor` (`uuid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `fk_rol` FOREIGN KEY (`rol`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuario_sensor`
--
ALTER TABLE `usuario_sensor`
  ADD CONSTRAINT `fk_sensor_usuario` FOREIGN KEY (`uuidSensor`) REFERENCES `sensor` (`uuid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_usuario_sensor` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
