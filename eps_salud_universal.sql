-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3307
-- Tiempo de generación: 17-05-2025 a las 06:07:28
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `eps_salud_universal`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `citas`
--

CREATE TABLE `citas` (
  `CitaID` int(11) NOT NULL,
  `PacienteID` int(11) DEFAULT NULL,
  `DoctorID` int(11) DEFAULT NULL,
  `UnidadID` int(11) DEFAULT NULL,
  `Fecha` date DEFAULT NULL,
  `Hora` time DEFAULT NULL,
  `Estado` enum('Pendiente','Completada','Cancelada') DEFAULT 'Pendiente'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `citas`
--

INSERT INTO `citas` (`CitaID`, `PacienteID`, `DoctorID`, `UnidadID`, `Fecha`, `Hora`, `Estado`) VALUES
(1, 1, 1, 1, '2025-05-18', '09:00:00', 'Pendiente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `consultas`
--

CREATE TABLE `consultas` (
  `ConsultaID` int(11) NOT NULL,
  `CitaID` int(11) DEFAULT NULL,
  `Diagnostico` text DEFAULT NULL,
  `Observaciones` text DEFAULT NULL,
  `Tratamiento` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `consultas`
--

INSERT INTO `consultas` (`ConsultaID`, `CitaID`, `Diagnostico`, `Observaciones`, `Tratamiento`) VALUES
(1, 1, 'Gripe común', 'Paciente con fiebre alta y tos.', 'Paracetamol cada 8 horas por 3 días');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `doctores`
--

CREATE TABLE `doctores` (
  `DoctorID` int(11) NOT NULL,
  `Identificacion` varchar(20) NOT NULL,
  `Nombre` varchar(50) DEFAULT NULL,
  `Apellido` varchar(50) DEFAULT NULL,
  `Telefono` varchar(20) DEFAULT NULL,
  `Direccion` varchar(100) DEFAULT NULL,
  `Especialidad` varchar(50) DEFAULT NULL,
  `JornadaLaboral` enum('Matinal','Vespertina') DEFAULT NULL,
  `Usuario` varchar(50) DEFAULT NULL,
  `Contrasena` varchar(100) DEFAULT NULL,
  `UnidadID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `doctores`
--

INSERT INTO `doctores` (`DoctorID`, `Identificacion`, `Nombre`, `Apellido`, `Telefono`, `Direccion`, `Especialidad`, `JornadaLaboral`, `Usuario`, `Contrasena`, `UnidadID`) VALUES
(1, '123456789', 'Carlos', 'Mejía', '3124567890', 'Cra 15 #45-23', 'Pediatra', 'Matinal', 'carlos1', 'carlos123', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pacientes`
--

CREATE TABLE `pacientes` (
  `PacienteID` int(11) NOT NULL,
  `Identificacion` varchar(20) NOT NULL,
  `Nombre` varchar(50) DEFAULT NULL,
  `Apellido` varchar(50) DEFAULT NULL,
  `Direccion` varchar(100) DEFAULT NULL,
  `Edad` int(11) DEFAULT NULL,
  `TipoAfiliacion` varchar(50) DEFAULT NULL,
  `FechaIngreso` date DEFAULT NULL,
  `Usuario` varchar(50) DEFAULT NULL,
  `Contrasena` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pacientes`
--

INSERT INTO `pacientes` (`PacienteID`, `Identificacion`, `Nombre`, `Apellido`, `Direccion`, `Edad`, `TipoAfiliacion`, `FechaIngreso`, `Usuario`, `Contrasena`) VALUES
(1, '987654321', 'Ana', 'Gómez', 'Calle 10 #20-30', 28, 'Contributivo', '2025-05-17', 'ana1', 'ana11');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `unidades`
--

CREATE TABLE `unidades` (
  `UnidadID` int(11) NOT NULL,
  `Identificador` varchar(50) NOT NULL,
  `Nombre` varchar(100) NOT NULL,
  `Planta` varchar(50) DEFAULT NULL,
  `Ubicacion` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `unidades`
--

INSERT INTO `unidades` (`UnidadID`, `Identificador`, `Nombre`, `Planta`, `Ubicacion`) VALUES
(1, '1', 'Pediatria', 'Segundo piso', 'centro');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `citas`
--
ALTER TABLE `citas`
  ADD PRIMARY KEY (`CitaID`),
  ADD KEY `PacienteID` (`PacienteID`),
  ADD KEY `DoctorID` (`DoctorID`),
  ADD KEY `UnidadID` (`UnidadID`);

--
-- Indices de la tabla `consultas`
--
ALTER TABLE `consultas`
  ADD PRIMARY KEY (`ConsultaID`),
  ADD KEY `CitaID` (`CitaID`);

--
-- Indices de la tabla `doctores`
--
ALTER TABLE `doctores`
  ADD PRIMARY KEY (`DoctorID`),
  ADD UNIQUE KEY `Usuario` (`Usuario`),
  ADD KEY `UnidadID` (`UnidadID`);

--
-- Indices de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  ADD PRIMARY KEY (`PacienteID`),
  ADD UNIQUE KEY `Usuario` (`Usuario`);

--
-- Indices de la tabla `unidades`
--
ALTER TABLE `unidades`
  ADD PRIMARY KEY (`UnidadID`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `citas`
--
ALTER TABLE `citas`
  MODIFY `CitaID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `consultas`
--
ALTER TABLE `consultas`
  MODIFY `ConsultaID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `doctores`
--
ALTER TABLE `doctores`
  MODIFY `DoctorID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  MODIFY `PacienteID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `unidades`
--
ALTER TABLE `unidades`
  MODIFY `UnidadID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `citas`
--
ALTER TABLE `citas`
  ADD CONSTRAINT `citas_ibfk_1` FOREIGN KEY (`PacienteID`) REFERENCES `pacientes` (`PacienteID`),
  ADD CONSTRAINT `citas_ibfk_2` FOREIGN KEY (`DoctorID`) REFERENCES `doctores` (`DoctorID`),
  ADD CONSTRAINT `citas_ibfk_3` FOREIGN KEY (`UnidadID`) REFERENCES `unidades` (`UnidadID`);

--
-- Filtros para la tabla `consultas`
--
ALTER TABLE `consultas`
  ADD CONSTRAINT `consultas_ibfk_1` FOREIGN KEY (`CitaID`) REFERENCES `citas` (`CitaID`);

--
-- Filtros para la tabla `doctores`
--
ALTER TABLE `doctores`
  ADD CONSTRAINT `doctores_ibfk_1` FOREIGN KEY (`UnidadID`) REFERENCES `unidades` (`UnidadID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
