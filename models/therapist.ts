export type TPatient = {
  patient_id: string;  // Usa patient_id en lugar de id
  name: string;
  animal_id: string | null; // Añade animal_id
  avatar?: string; // Opcional, si lo usas
  circleColor?: string; // Opcional, si lo usas
};
