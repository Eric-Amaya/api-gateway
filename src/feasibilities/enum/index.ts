export enum EstadoFactibilidad {
  Pendiente = 'Pendiente',
  EnRevision = 'En revisión',
  Rechazado = 'Rechazado',
  Seleccionado = 'Seleccionado',
}
export enum EstadoEstudio {
  StartUp = 'Start Up',
  Enrolamiento = 'Enrolamiento',
  CierreReclutamiento = 'Cierre del Reclutamiento',
  CierreEstudio = 'Cierre del Estudio',
}
// Documentos requeridos (forma consistente con backend)
export interface Documento {
  nombre: string;
  version?: string;
  fecha?: string;
}
export interface Agente {
  name: string;
  email: string;
  phone_number?: string;
}

export interface RequiredDocument {
  name: string;
  expirationDate?: string;
  notApplicable?: boolean;
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Monitores
export interface Agent {
  name: string;
  email: string;
  phone_number?: string;
}

// Staff
export interface Equipo {
  _id?: string;
  nombre: string;
  rol?: RolEquipo;
  email?: string;
  area?: string;
  
}

// Usuario del sistema
export interface Usuario {
  _id: string;
  name: string;
  email: string;
  rut: string;
  area: string;
  position: string; // Puede ser 'Investigador(a)', 'Coordinador(a)', etc.
  role: string;
  phone?: string;
  birthdate?: string;
  address?: string;
  date_incorporation?: string;
  requiredDocuments?: RequiredDocument[];
}

export interface Estudio {
  // 🧠 INFORMACIÓN GENERAL DEL ESTUDIO
  _id: string;
  protocolo: string;
  titulo: string;
  patologia: string;
  productoInvestigacion: string;
  moleculaInvestigacion?: string; // Opcional (puede ser igual a productoInvestigacion)
  area: string;
  sponsor: string;
  fase: string;
  siteNumber: string;
  estado: string;
  tipoDroga?: string;
  comite?: string;
  investigadorPrincipal: string;
  emailContacto?: string;

  // 👥 EQUIPO Y DOCUMENTOS
  agentes: Agent[];
  equipo?: Equipo[];
  documentos?: Documento[];
  proposalId?: string;

  // 📆 FECHAS CLAVE (ordenadas cronológicamente)
  llegadaPaqueteInicial?: string;         // 1. Llegada paquete inicial
  sometimientoInicial?: string;           // 2. Envío a comité ético
  fechaAprobacionSometimiento?: string;   // 3. Aprobación comité ético
  siteReady?: string;                     // 4. Implementación / site ready
  visitaInicio?: string;                  // 5. Visita de inicio
  primerFci?: string;                     // 6. Primer FCI (First Contact/Visit)
  primeraVisita?: string;                 // 7. Primera visita del paciente
  inicioReclutamiento?: string;           // 8. Inicio del reclutamiento
  primerScreening?: string;               // 9. Primer screening
  primerPacienteEnrolado?: string;        // 10. Primer paciente enrolado (antes "primerScreeningExitoso")
  ultimaVisita?: string;                  // 11. Última visita del paciente
  cierreReclutamiento?: string;           // 12. Fin del reclutamiento
  visitaCierre?: string;                  // 13. Visita de cierre
  fechaCierreEstudio?: string;            // 14. Cierre oficial

  // ⏳ DURACIÓN (calculable o manual)
  duracionEstudio?: number;               // En días/meses (puede calcularse con las fechas) se cambia por periodo de recultamiento, mas comodo

  // 📊 INDICADORES
  compromisoPacientes?: number;
  pacientesTotales?: number;
  objetivoEstudio?: string;               // Texto largo

  // 🕓 METADATOS
  resolucionAprobatoria?: string;
  createdAt?: string;
}

// Enum del rol de equipo
export enum RolEquipo {
  Coordinador = 'Coordinador(a)',
  SubInvestigador = 'SubInvestigador',
  investigadorPrincipal = 'Investigador Principal',
  AsistenteInvestigador = 'Asistente de Investigador',
  DirectorCalidad = 'Director de Calidad',
  Enfermero = 'Enfermero(a) Clinico(a)',
  JefaturaTens = 'Jefatura Tens',
  JefaturaEnfermeria = 'Jefatura Enfermería',
  JefaturaCoordinador = 'Jefatura Coordinador',
  JefaturaSubInvestigador = 'Jefatura SubInvestigador',
  MiembroFundador = 'Miembro Fundador',
  JefaturaInvestigadorPrincipal = 'Jefatura Investigador Principal',
  Monitor = 'Monitor',
  Regulatorio = 'Regulatorio',
  DataManager = 'Data Manager',
  DataEntry = 'Data Entry',
  Tens = 'Tens',
  Asistente = 'Asistente',
  Otro = 'otro'
  
}