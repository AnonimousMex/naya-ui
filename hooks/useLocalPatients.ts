import { useState, useEffect } from 'react';
import { LOCAL_PATIENTS, LOCAL_TEST_RESULTS, LocalPatient, LocalTestResult } from '@/constants/localData/patients';

export const useLocalPatients = () => {
  const [patients, setPatients] = useState<LocalPatient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPatients = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Simular un pequeño delay para mostrar el estado de carga
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setPatients(LOCAL_PATIENTS);
      } catch (err) {
        setError('Error cargando pacientes locales');
        console.error('Error loading local patients:', err);
      } finally {
        setLoading(false);
      }
    };

    loadPatients();
  }, []);

  const getPatientById = (patientId: string): LocalPatient | undefined => {
    return LOCAL_PATIENTS.find(patient => patient.patient_id === patientId);
  };

  const getPatientTestResult = (patientId: string): LocalTestResult | undefined => {
    return LOCAL_TEST_RESULTS.find(result => result.patient_id === patientId);
  };

  const getActivePatients = (): LocalPatient[] => {
    return LOCAL_PATIENTS.filter(patient => patient.status === 'active');
  };

  const getCompletedPatients = (): LocalPatient[] => {
    return LOCAL_PATIENTS.filter(patient => patient.status === 'completed');
  };

  const getPatientsByEmotion = (emotion: string): LocalPatient[] => {
    return LOCAL_PATIENTS.filter(patient => 
      patient.predominantEmotion?.toLowerCase() === emotion.toLowerCase()
    );
  };

  const refetch = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simular recarga
      await new Promise(resolve => setTimeout(resolve, 300));
      setPatients(LOCAL_PATIENTS);
    } catch (err) {
      setError('Error recargando pacientes');
    } finally {
      setLoading(false);
    }
  };

  return {
    patients,
    loading,
    error,
    getPatientById,
    getPatientTestResult,
    getActivePatients,
    getCompletedPatients,
    getPatientsByEmotion,
    refetch,
    // Estadísticas útiles
    totalPatients: patients.length,
    activePatients: patients.filter(p => p.status === 'active').length,
    completedPatients: patients.filter(p => p.status === 'completed').length,
  };
};