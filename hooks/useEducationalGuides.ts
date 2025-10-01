import { useState, useEffect } from 'react';
import { getLatestTestResult } from '@/utils/psychometricTestStorage';
import { getGuidesByEmotion, GuideResource } from '@/constants/educationalGuides';
import { useLocalUserInfo } from './useLocalUserInfo';

export const useEducationalGuides = () => {
  const [guides, setGuides] = useState<GuideResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [emotion, setEmotion] = useState<string>('Balance');
  
  const { userInfo: currentUser } = useLocalUserInfo();

  useEffect(() => {
    const loadGuides = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!currentUser?.name) {
          console.log('No current user found, using Balance guides');
          const balanceGuides = getGuidesByEmotion('Balance');
          setGuides(balanceGuides);
          setEmotion('Balance');
          return;
        }

        // Obtener el último resultado del test
        const latestResult = await getLatestTestResult(currentUser.name);
        
        if (latestResult?.predominantEmotion) {
          console.log('Latest test result emotion:', latestResult.predominantEmotion);
          const emotionGuides = getGuidesByEmotion(latestResult.predominantEmotion);
          setGuides(emotionGuides);
          setEmotion(latestResult.predominantEmotion);
        } else {
          console.log('No test result found, using Balance guides');
          const balanceGuides = getGuidesByEmotion('Balance');
          setGuides(balanceGuides);
          setEmotion('Balance');
        }
      } catch (err) {
        console.error('Error loading educational guides:', err);
        setError('Error cargando guías educativas');
        
        // Fallback a guías de Balance en caso de error
        const balanceGuides = getGuidesByEmotion('Balance');
        setGuides(balanceGuides);
        setEmotion('Balance');
      } finally {
        setLoading(false);
      }
    };

    loadGuides();
  }, [currentUser]);

  const refreshGuides = async () => {
    setLoading(true);
    setError(null);

    try {
      if (!currentUser?.name) {
        const balanceGuides = getGuidesByEmotion('Balance');
        setGuides(balanceGuides);
        setEmotion('Balance');
        return;
      }

      const latestResult = await getLatestTestResult(currentUser.name);
      
      if (latestResult?.predominantEmotion) {
        const emotionGuides = getGuidesByEmotion(latestResult.predominantEmotion);
        setGuides(emotionGuides);
        setEmotion(latestResult.predominantEmotion);
      } else {
        const balanceGuides = getGuidesByEmotion('Balance');
        setGuides(balanceGuides);
        setEmotion('Balance');
      }
    } catch (err) {
      console.error('Error refreshing guides:', err);
      setError('Error recargando guías');
      const balanceGuides = getGuidesByEmotion('Balance');
      setGuides(balanceGuides);
      setEmotion('Balance');
    } finally {
      setLoading(false);
    }
  };

  return {
    guides,
    loading,
    error,
    emotion,
    refreshGuides
  };
};