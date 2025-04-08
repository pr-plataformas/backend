export enum RabbitMQ {
  UserQueue = 'UserQueue',
  TaskQueue = 'TaskQueue',
  ActivityQueue = 'ActivityQueue',
  VehicleQueue = 'VehicleQueue',
}

export enum VehicleMessagePattern {
  CreateVehicleMsg = 'createVehicle',
  FindAllVehicleMsg = 'findAllVehicle',
  FindOneVehicleMsg = 'findOneVehicle',
  UpdateVehicleMsg = 'updateVehicle',
  RemoveVehicleMsg = 'removeVehicle',
}

export enum ActivityMessagePattern {
  CreateActivityMsg = 'createActivity',
  FindAllActivityMsg = 'findAllActivity',
  FindOneActivityMsg = 'findOneActivity',
  UpdateActivityMsg = 'updateActivity',
  RemoveActivityMsg = 'removeActivity',
}

export enum TaskMessagePattern {
  CreateTaskMsg = 'createTask',
  FindAllTaskMsg = 'findAllTask',
  FindOneTaskMsg = 'findOneTask',
  UpdateTaskMsg = 'updateTask',
  RemoveTaskMsg = 'removeTask',
}

export enum UserMessagePattern {
  CreateUserMsg = 'createUser',
  FindAllUsersMsg = 'findAllUsers',
  FindOneUserMsg = 'findOneUser',
  FindUsersByRoleMsg = 'findUsersByRoleMsg',
  UpdateUserMsg = 'updateUser',
  RemoveUserMsg = 'removeUser',
}

export enum Shifts {
  Dia = 'D',
  Noche = 'N',
}

export enum ResourceTypes {
  Personal = 'personal',
  Machinery = 'machinery',
  Material = 'material',
}

export enum Locations {
  Izquierda = 'Izquierda',
  Derecha = 'Derecha',
  Enlace = 'Enlace',
  Peaje = 'Peaje',
  Mediana = 'Mediana',
  RamalOriente = 'Ramal Oriente',
  RamalPoniente = 'Ramal Poniente',
  CalleDeServicio = 'Calle de Servicio',
}

export enum MeasureUnits {
  Variable = 'var',
  Unidades = 'un',
  Milimetros = 'mm',
  Centimetros = 'cm',
  Metros = 'm',
  MetrosCuadrados = 'm2',
  MetrosCubicos = 'm3',
  Kilometros = 'km',
  Mililitros = 'ml',
  Litros = 'l',
  Miligramos = 'mg',
  Gramos = 'g',
  Kilogramos = 'kg',
  Toneladas = 't',
}

export enum MachineryEnum {
  MINICARGADOR = 'Minicargador',
  CAMION_PLATAFORMA = 'Camión plataforma',
  CAMION_PLUMA = 'Camión pluma',
  EQUIPO_BARREDOR = 'Equipo barredor',
  EQUIPO_COMPACTADOR = 'Equipo compactador',
  EQUIPOO_DEMARCACION = 'Equipo de demarcación',
  CAMIONETA = 'Camioneta',
}

export enum PersonalEnum {
  JEFE_TRAMO = 'Jefe de tramo conservación y seguridad vial',
  SUPERVISOR_CONSERVACION = 'Supervisor de conservación y seguridad vial',
  OPERADOR_CONSERVACION = 'Operador de conservación y maquinaria',
  AYUDANTE_CONSERVACION = 'Ayudante de conservación y señalización vial',
  PERSONAL_CONTRATISTA = 'Personal contratista',
  CAPATAZ_CONTRATISTA = 'Capataz contratista',
}

export enum UserRole {
  JEFE_DE_LABORATORIO = 'JEFE DE LABORATORIO',
  AYUDANTE_DE_CONSERVACION_Y_SENALIZACION_VIAL = 'AYUDANTE DE CONSERVACIÓN Y SEÑALIZACIÓN VIAL',
  OPERADOR_DE_CONSERVACION_Y_MAQUINARIA = 'OPERADOR DE CONSERVACIÓN Y MAQUINARIA',
  GERENTE_GENERAL = 'GERENTE GENERAL',
  ENCARGADO_MEDIO_AMBIENTE = 'ENCARGADO MEDIO AMBIENTE',
  ENCARGADO_DE_PREVENCION_DE_RIESGOS = 'ENCARGADO(A) DE PREVENCION DE RIESGOS',
  ASISTENTE_DE_CONTROL_DOCUMENTAL = 'ASSTE. DE CONTROL DOCUMENTAL',
  ENCARGADO_TERRITORIAL = 'ENCARGADO TERRITORIAL',
  JEFE_GESTION_CONTRACTUAL = 'JEFE GESTION CONTRACTUAL',
  ENCARGADO_DE_COMUNICACIONES_Y_RR_CC = 'ENCARGADO DE COMUNICACIONES Y RR. CC.',
  GERENTE_TECNICO = 'GERENTE TÉCNICO',
  JEFE_OFICINA_TECNICA_CONSTR = 'JEFE OFICINA TÉCNICA CONSTR.',
  JEFE_OFICINA_TECNICA_OPER = 'JEFE OFICINA TÉCNICA OPER.',
  ENCARGADO_DE_CALIDAD = 'ENCARGADO DE CALIDAD',
  SUPERVISOR_TERRENO_Y_CALIDAD = 'SUPERVISOR TERRENO Y CALIDAD',
  ADMINISTRATIVO_DE_OBRA = 'ADMINISTRATIVO DE OBRA',
  ANALISTA_DE_CONTABILIDAD = 'ANALISTA DE CONTABILIDAD',
  ANALISTA_DE_TESORERIA = 'ANALISTA DE TESORERÍA',
  ASISTENTE_CONTROL_Y_GESTION = 'ASISTENTE CONTROL Y GESTIÓN',
  JEFE_DE_ADMIN_Y_FINANZAS = 'JEFE DE ADMIN. Y FINANZAS',
  GERENTE_OPERACIONES = 'GERENTE OPERACIONES',
  ASISTENTE_OFICINA_TECNICA = 'ASISTENTE OFICINA TÉCNICA',
  ENCARGADO_ADMIN_Y_BODEGAS = 'ENCARGADO(A) ADMIN. Y BODEGAS',
  BODEGUERO = 'BODEGUERO (A)',
  ENCARGADO_DE_PERSONAS = 'ENCARGADO DE PERSONAS',
  ASISTENTE_ADMIN_DE_ATENCION_AL_CLIENTES = 'ASSTE. ADMIN. DE ATENCIÓN AL CLIENTES',
  INFORMATICO_DE_PEAJES = 'INFORMÁTICO DE PEAJES',
  INFORMATICO_DE_SISTEMAS = 'INFORMÁTICO DE SISTEMAS',
  JEFE_DE_INFORMATICA = 'JEFE DE INFORMÁTICA',
  JEFE_OPERACION_VIAL = 'JEFE OPERACIÓN VIAL',
  JEFE_TRAMO_CONSERVACION_Y_SEG_VIAL = 'JEFE TRAMO CONSERVACIÓN Y SEG. VIAL',
  OPERADOR_CENTRO_CONTROL = 'OPERADOR CENTRO CONTROL',
  ASISTENTE_DE_MANTENCION = 'ASSTE. DE MANTENCIÓN',
  SUPERVISOR_DE_CONSERVACION_Y_SEG_VIAL = 'SUPERVISOR DE CONSERVACIÓN Y SEG. VIAL',
  JEFE_DE_TRAFICO_Y_RECAUDACION = 'JEFE DE TRÁFICO Y RECAUDACIÓN',
  VALIDADOR = 'VALIDADOR',
}
