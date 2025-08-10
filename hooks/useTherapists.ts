import { useState, useEffect } from 'react';
import { PARENTS_SERVICE } from '@/services/parents';
import { TTherapist } from '@/models/therapist';
import { useUserInfo } from './useUserInfo';
import { IMAGES } from '@/constants/images';

export const useTherapists = () => {
  const [therapists, setTherapists] = useState<TTherapist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { getToken } = useUserInfo();

  const fetchTherapists = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = await getToken();
      if (!token) {
        setError('No se encontró el token de autenticación');
        return;
      }

      const response = await PARENTS_SERVICE.listTherapists(token);
      
      if (response.status === 200 && response.data) {
        const therapistsWithUI = response.data.map((therapist, index) => ({
          ...therapist,
          avatar: IMAGES.DEFAULT_WOMAN_THERAPIST, 
          circleColor: getRandomColor(index),
        }));
        
        setTherapists(therapistsWithUI);
      } else {
        setError(response.statusMessage || 'Error al cargar los terapeutas');
      }
    } catch (err) {
      setError('Error de conexión al cargar los terapeutas');
      console.error('Error fetching therapists:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTherapists();
  }, []);

  return {
    therapists,
    loading,
    error,
    refetch: fetchTherapists,
  };
};

const getRandomColor = (index: number): string => {
  const colors = [
    "#C8B8B4",
    "#F9D7B5", 
    "#D6E6F2",
    "#BEE3DB",
    "#F7CAC9",
    "#B5EAD7",
    "#C7CEEA",
    "#E8B4CB",
    "#F0E68C",
    "#DDA0DD",
  ];
  
  return colors[index % colors.length];
};
