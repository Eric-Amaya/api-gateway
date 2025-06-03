export enum Role {
  ADMIN = 'Admin',
  INVESTIGADOR = 'investigador',
  COORDINADOR = 'Coordinador',
  ENFERMERIA = 'Enfermeria',
  DATAENTRY = 'Dataentry',
  REGULATORIO = 'Regulatorio',
  Tens = 'Tens',
  VIEWER = 'Viewer',
}

export enum RolEquipo {
  Coordinador = 'Coordinador', // Coordinador del Estudio , es como el pm del estudio
  SubInvestigador = 'SubInvestigador',// Sub Investigador del estudio el PY 
  investigadorPrincipal = 'Investigador Principal', // Investigador Principal del estudio el PY
  AsistenteInvestigador = 'Asistente de Investigador', // Asistente de Investigador del estudio el PY , puede utilizarse para el equipo de investigacion
  DirectorCalidad = 'Director de Calidad', // Director de Calidad del centro , esta persona en general es la que se encarga de la calidad del centro y de los estudios que se realizan en el centro
  DirectorEjecutivo = 'Director Ejecutivo', // Director Ejecutivo del centro , esta persona en general es la que se encarga de la ejecucion del centro y de los estudios que se realizan en el centro
  Enfermero = 'Enfermero', // Enfermero del centro , esta persona en general es la que se encarga de la enfermería del centro y de los estudios que se realizan en el centro
  JefaturaTens = 'Jefatura Tens', // Jefatura de Tens del centro , esta persona en general es la que se encarga de la jefatura de los tens del centro y de los estudios que se realizan en el centro
  JefaturaEnfermeria = 'Jefatura Enfermería',// Jefatura de Enfermería del centro , esta persona en general es la que se encarga de la jefatura de los enfermeros del centro y de los estudios que se realizan en el centro
  JefaturaCoordinador = 'Jefatura Coordinador', // Jefatura de Coordinador del centro , esta persona en general es la que se encarga de la jefatura de los coordinadores del centro y de los estudios que se realizan en el centro
  JefaturaSubInvestigador = 'Jefatura SubInvestigador',// Jefatura de Sub Investigador del centro , esta persona en general es la que se encarga de la jefatura de los sub investigadores del centro y de los estudios que se realizan en el centro
  MiembroFundador = 'Miembro Fundador', // 
  JefaturaInvestigadorPrincipal = 'Jefatura Investigador Principal', // Jefatura de Investigador Principal del centro , esta persona en general es la que se encarga de la jefatura de los investigadores principales del centro y de los estudios que se realizan en el centro
  Monitor = 'Monitor', //Monitor del estudio , naturalmente son mandados por los sponsors y son los que se encargan de monitorear el estudio y de la calidad del estudio
  Regulatorio = 'Regulatorio', // Regulatorio del centro , esta persona en general es la que se encarga de la parte regulatoria del centro y de los estudios que se realizan en el centro
  DataManager = 'Data Manager', // Data Manager del centro , esta persona en general es la que se encarga de la parte de datos del centro y de los estudios que se realizan en el centro
  DataEntry = 'Data Entry', // Data Entry del centro , esta persona en general es la que se encarga de la entrada de datos del centro y de los estudios que se realizan en el centro
  Tens = 'Tens', // Tens del centro , esta persona en general es la que se encarga de la parte de tens del centro y de los estudios que se realizan en el centro
  Asistente = 'Asistente', // Asistente del centro , esta persona en general es la que se encarga de la parte de asistente del centro y de los estudios que se realizan en el centro
  Otro = 'Otro' // Otro rol que no se encuentra en la lista, puede ser utilizado para cualquier otro rol que no se encuentre en la lista
  // , esta persona en general es la que se encarga de cualquier otra cosa que no se encuentre en la lista
}