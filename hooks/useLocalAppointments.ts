import { useState, useEffect } from 'react';
import { 
  LOCAL_APPOINTMENTS, 
  LocalAppointment, 
  getUpcomingAppointments, 
  getAppointmentsByStatus,
  getPatientAppointments,
  getAppointmentsByDate,
  getAppointmentStats
} from '@/constants/localData/appointments';

export const useLocalAppointments = () => {
  const [appointments, setAppointments] = useState<LocalAppointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Simular un pequeño delay para mostrar el estado de carga
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setAppointments(LOCAL_APPOINTMENTS);
      } catch (err) {
        setError('Error cargando citas locales');
        console.error('Error loading local appointments:', err);
      } finally {
        setLoading(false);
      }
    };

    loadAppointments();
  }, []);

  // Función para obtener próximas citas
  const getUpcoming = (limit?: number) => {
    return getUpcomingAppointments(limit);
  };

  // Función para obtener citas por estado
  const getByStatus = (status: LocalAppointment['status']) => {
    return getAppointmentsByStatus(status);
  };

  // Función para obtener citas de un paciente
  const getByPatient = (patientId: string) => {
    return getPatientAppointments(patientId);
  };

  // Función para obtener citas de una fecha
  const getByDate = (date: string) => {
    return getAppointmentsByDate(date);
  };

  // Función para obtener una cita por ID
  const getById = (appointmentId: string): LocalAppointment | undefined => {
    return LOCAL_APPOINTMENTS.find(appointment => appointment.id === appointmentId);
  };

  // Función para actualizar el estado de una cita (simulado)
  const updateAppointmentStatus = async (appointmentId: string, newStatus: LocalAppointment['status']): Promise<boolean> => {
    try {
      // En una app real, esto haría una llamada al backend
      const appointmentIndex = LOCAL_APPOINTMENTS.findIndex(a => a.id === appointmentId);
      if (appointmentIndex !== -1) {
        LOCAL_APPOINTMENTS[appointmentIndex].status = newStatus;
        setAppointments([...LOCAL_APPOINTMENTS]);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error updating appointment status:', error);
      return false;
    }
  };

  // Función para reagendar una cita (simulado)
  const rescheduleAppointment = async (appointmentId: string, newDate: string, newTime: string): Promise<boolean> => {
    try {
      const appointmentIndex = LOCAL_APPOINTMENTS.findIndex(a => a.id === appointmentId);
      if (appointmentIndex !== -1) {
        LOCAL_APPOINTMENTS[appointmentIndex].date = newDate;
        LOCAL_APPOINTMENTS[appointmentIndex].time = newTime;
        LOCAL_APPOINTMENTS[appointmentIndex].status = 'rescheduled';
        setAppointments([...LOCAL_APPOINTMENTS]);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error rescheduling appointment:', error);
      return false;
    }
  };

  // Función para crear una nueva cita
  const createAppointment = async (appointmentData: Omit<LocalAppointment, 'id'>) => {
    try {
      setLoading(true);
      
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Generar ID único
      const newId = `appointment-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      const newAppointment: LocalAppointment = {
        ...appointmentData,
        id: newId
      };
      
      // Agregar al array local
      LOCAL_APPOINTMENTS.push(newAppointment);
      setAppointments([...LOCAL_APPOINTMENTS]);
      
      return newAppointment;
    } catch (error) {
      setError('Error creando cita');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const refetch = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simular recarga
      await new Promise(resolve => setTimeout(resolve, 300));
      setAppointments(LOCAL_APPOINTMENTS);
    } catch (err) {
      setError('Error recargando citas');
    } finally {
      setLoading(false);
    }
  };

  return {
    appointments,
    loading,
    error,
    getUpcoming,
    getByStatus,
    getByPatient,
    getByDate,
    getById,
    updateAppointmentStatus,
    rescheduleAppointment,
    createAppointment,
    refetch,
    // Estadísticas útiles
    stats: getAppointmentStats(),
    // Acceso directo a funciones comunes
    upcomingAppointments: getUpcomingAppointments(5), // Próximas 5 citas
    todayAppointments: getAppointmentsByDate(new Date().toISOString().split('T')[0]),
    scheduledAppointments: getAppointmentsByStatus('scheduled'),
    completedAppointments: getAppointmentsByStatus('completed'),
  };
};