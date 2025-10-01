import { useState, useEffect } from "react";
import { LOCAL_THERAPISTS } from "@/constants/localData/therapists";

interface Therapist {
  therapist_id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  avatar: string;
  circleColor: string;
  description: string;
  specialties: Array<{
    id: string;
    name: string;
    description: string;
  }>;
  experiences: Array<{
    id: string;
    institution: string;
    position: string;
    start_date: string;
    end_date: string | null;
    description: string;
  }>;
}

export const useLocalTherapists = () => {
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTherapists = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Simular un pequeño delay para mostrar el estado de carga
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setTherapists(LOCAL_THERAPISTS);
      } catch (err) {
        setError('Error cargando terapeutas locales');
        console.error('Error loading local therapists:', err);
      } finally {
        setLoading(false);
      }
    };

    loadTherapists();
  }, []);

  const refetch = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simular recarga
      await new Promise(resolve => setTimeout(resolve, 300));
      setTherapists(LOCAL_THERAPISTS);
    } catch (err) {
      setError('Error recargando terapeutas');
    } finally {
      setLoading(false);
    }
  };

  const getTherapistById = (id: string): Therapist | undefined => {
    return therapists.find(therapist => therapist.therapist_id === id);
  };

  const getTherapistsBySpecialty = (specialtyName: string): Therapist[] => {
    return therapists.filter(therapist => 
      therapist.specialties.some(specialty => 
        specialty.name.toLowerCase().includes(specialtyName.toLowerCase())
      )
    );
  };

  return {
    therapists,
    loading,
    error,
    refetch,
    getTherapistById,
    getTherapistsBySpecialty,
  };
};