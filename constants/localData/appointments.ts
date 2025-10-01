// Datos locales de citas para las pantallas de terapeuta
export interface LocalAppointment {
  id: string;
  patient_id: string;
  patient_name: string;
  therapist_id: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  end_time?: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
  type: string;
  notes?: string;
  duration: number; // en minutos
  location?: string;
}

// Citas ficticias para la terapeuta Fernanda Medina
export const LOCAL_APPOINTMENTS: LocalAppointment[] = [
  {
    id: "appt-001",
    patient_id: "702d987f-5e26-4b67-8254-129b6d7afaf0", // Daniel
    patient_name: "Daniel",
    therapist_id: "9493bc02-f84e-4187-82ea-f7a369306a12", // Fernanda
    date: "2024-10-15",
    time: "10:00",
    end_time: "11:00",
    status: "scheduled",
    type: "Terapia Individual",
    notes: "Sesión de seguimiento - trabajar en manejo de tristeza",
    duration: 60,
    location: "Consultorio 1"
  },
  {
    id: "appt-002", 
    patient_id: "69168a51-208d-4efd-99f8-fb0b0b78e7e2", // Hugo
    patient_name: "Hugo",
    therapist_id: "9493bc02-f84e-4187-82ea-f7a369306a12",
    date: "2024-10-15",
    time: "15:00",
    end_time: "16:00",
    status: "scheduled",
    type: "Terapia Lúdica",
    notes: "Técnicas de autorregulación emocional",
    duration: 60,
    location: "Sala de Juegos"
  },
  {
    id: "appt-003",
    patient_id: "a1b2c3d4-e5f6-7890-1234-567890abcde1", // Sofia
    patient_name: "Sofia González", 
    therapist_id: "9493bc02-f84e-4187-82ea-f7a369306a12",
    date: "2024-10-16",
    time: "09:00",
    end_time: "10:00",
    status: "scheduled",
    type: "Evaluación Mensual",
    notes: "Revisión de progreso y ajuste de objetivos",
    duration: 60,
    location: "Consultorio 1"
  },
  {
    id: "appt-004",
    patient_id: "b2c3d4e5-f6g7-8901-2345-678901bcdef2", // Mateo
    patient_name: "Mateo Silva",
    therapist_id: "9493bc02-f84e-4187-82ea-f7a369306a12", 
    date: "2024-10-16",
    time: "16:00",
    end_time: "17:00",
    status: "scheduled",
    type: "Terapia Familiar",
    notes: "Incluir a los padres - trabajo en autoestima",
    duration: 60,
    location: "Consultorio 2"
  },
  {
    id: "appt-005",
    patient_id: "c3d4e5f6-g7h8-9012-3456-789012cdef34", // Emma
    patient_name: "Emma Hernández",
    therapist_id: "9493bc02-f84e-4187-82ea-f7a369306a12",
    date: "2024-10-17",
    time: "11:00", 
    end_time: "12:00",
    status: "scheduled",
    type: "Sesión de Seguimiento",
    notes: "Mantenimiento de equilibrio emocional",
    duration: 60,
    location: "Consultorio 1"
  },
  {
    id: "appt-006",
    patient_id: "702d987f-5e26-4b67-8254-129b6d7afaf0", // Daniel
    patient_name: "Daniel",
    therapist_id: "9493bc02-f84e-4187-82ea-f7a369306a12",
    date: "2024-10-18",
    time: "14:00",
    end_time: "15:00", 
    status: "scheduled",
    type: "Arte Terapia",
    notes: "Expresión emocional a través del arte",
    duration: 60,
    location: "Taller Creativo"
  },
  {
    id: "appt-007",
    patient_id: "69168a51-208d-4efd-99f8-fb0b0b78e7e2", // Hugo
    patient_name: "Hugo",
    therapist_id: "9493bc02-f84e-4187-82ea-f7a369306a12",
    date: "2024-10-19",
    time: "10:30",
    end_time: "11:30",
    status: "scheduled",
    type: "Terapia Cognitivo-Conductual",
    notes: "Técnicas de control de impulsos",
    duration: 60,
    location: "Consultorio 1"
  },
  {
    id: "appt-008",
    patient_id: "d4e5f6g7-h8i9-0123-4567-890123def456", // Diego (completado)
    patient_name: "Diego Torres",
    therapist_id: "9493bc02-f84e-4187-82ea-f7a369306a12",
    date: "2024-09-20",
    time: "09:00",
    end_time: "10:00",
    status: "completed",
    type: "Sesión de Cierre",
    notes: "Evaluación final y despedida terapéutica",
    duration: 60,
    location: "Consultorio 1"
  },
  {
    id: "appt-009",
    patient_id: "a1b2c3d4-e5f6-7890-1234-567890abcde1", // Sofia
    patient_name: "Sofia González",
    therapist_id: "9493bc02-f84e-4187-82ea-f7a369306a12",
    date: "2024-10-22",
    time: "13:00",
    end_time: "14:00",
    status: "scheduled",
    type: "Terapia Individual",
    notes: "Refuerzo de estrategias de afrontamiento positivo",
    duration: 60,
    location: "Consultorio 1"
  },
  {
    id: "appt-010",
    patient_id: "b2c3d4e5-f6g7-8901-2345-678901bcdef2", // Mateo
    patient_name: "Mateo Silva", 
    therapist_id: "9493bc02-f84e-4187-82ea-f7a369306a12",
    date: "2024-10-23",
    time: "15:30",
    end_time: "16:30",
    status: "scheduled",
    type: "Terapia Lúdica",
    notes: "Juegos de roles para fortalecer confianza",
    duration: 60,
    location: "Sala de Juegos"
  },
  // Citas pasadas para historial
  {
    id: "appt-011",
    patient_id: "702d987f-5e26-4b67-8254-129b6d7afaf0", // Daniel
    patient_name: "Daniel",
    therapist_id: "9493bc02-f84e-4187-82ea-f7a369306a12",
    date: "2024-10-01",
    time: "10:00",
    end_time: "11:00",
    status: "completed",
    type: "Evaluación Inicial",
    notes: "Primera sesión - establecimiento de rapport",
    duration: 60,
    location: "Consultorio 1"
  },
  {
    id: "appt-012",
    patient_id: "69168a51-208d-4efd-99f8-fb0b0b78e7e2", // Hugo
    patient_name: "Hugo",
    therapist_id: "9493bc02-f84e-4187-82ea-f7a369306a12",
    date: "2024-10-02",
    time: "15:00",
    end_time: "16:00",
    status: "completed", 
    type: "Evaluación Inicial",
    notes: "Evaluación de comportamiento y emociones",
    duration: 60,
    location: "Consultorio 1"
  }
];

// Función para obtener citas por estado
export const getAppointmentsByStatus = (status: LocalAppointment['status']): LocalAppointment[] => {
  return LOCAL_APPOINTMENTS.filter(appointment => appointment.status === status);
};

// Función para obtener próximas citas (próximos 7 días)
export const getUpcomingAppointments = (limit?: number): LocalAppointment[] => {
  const today = new Date();
  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + 7);
  
  const upcoming = LOCAL_APPOINTMENTS
    .filter(appointment => {
      const appointmentDate = new Date(appointment.date);
      return appointmentDate >= today && appointmentDate <= nextWeek && appointment.status === 'scheduled';
    })
    .sort((a, b) => {
      const dateTimeA = new Date(`${a.date}T${a.time}`);
      const dateTimeB = new Date(`${b.date}T${b.time}`);
      return dateTimeA.getTime() - dateTimeB.getTime();
    });
    
  return limit ? upcoming.slice(0, limit) : upcoming;
};

// Función para obtener citas de un paciente específico
export const getPatientAppointments = (patientId: string): LocalAppointment[] => {
  return LOCAL_APPOINTMENTS.filter(appointment => appointment.patient_id === patientId);
};

// Función para obtener citas de un día específico
export const getAppointmentsByDate = (date: string): LocalAppointment[] => {
  return LOCAL_APPOINTMENTS.filter(appointment => appointment.date === date);
};

// Función para obtener estadísticas de citas
export const getAppointmentStats = () => {
  const total = LOCAL_APPOINTMENTS.length;
  const scheduled = LOCAL_APPOINTMENTS.filter(a => a.status === 'scheduled').length;
  const completed = LOCAL_APPOINTMENTS.filter(a => a.status === 'completed').length;
  const cancelled = LOCAL_APPOINTMENTS.filter(a => a.status === 'cancelled').length;
  
  return {
    total,
    scheduled,
    completed,
    cancelled,
    upcomingThisWeek: getUpcomingAppointments().length
  };
};