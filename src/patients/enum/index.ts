export enum EstadoPaciente {
  Invitacion = 'Invitación',
  Screening = 'Screening',
  Randomizacion = 'Randomización',
  Tratamiento = 'Tratamiento',
  ExtensionTratamiento = 'Extensión de Tratamiento',
  EOT = 'EOT', // End of Treatment
  Seguimiento = 'Seguimiento' // o Survival Follow-Up (SFU)
}