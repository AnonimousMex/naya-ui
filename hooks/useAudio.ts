import { Audio } from 'expo-av';
import { useState, useRef } from 'react';

interface UseAudioReturn {
  isPlaying: boolean;
  isLoading: boolean;
  playAudio: (audioSource: any) => Promise<void>;
  stopAudio: () => Promise<void>;
}

export const useAudio = (): UseAudioReturn => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const soundRef = useRef<Audio.Sound | null>(null);

  const playAudio = async (audioSource: any) => {
    if (isPlaying || isLoading) return;

    try {
      // Detener audio anterior si existe
      if (soundRef.current) {
        await soundRef.current.stopAsync();
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }

      setIsLoading(true);
      setIsPlaying(true);
      
      const { sound } = await Audio.Sound.createAsync(audioSource);
      soundRef.current = sound;
      
      sound.setOnPlaybackStatusUpdate((status) => {
        if ('isLoaded' in status && status.isLoaded && status.didJustFinish) {
          setIsPlaying(false);
          // Solo limpiar si la referencia aún apunta a este sonido
          if (soundRef.current === sound) {
            soundRef.current = null;
            sound.unloadAsync().catch(() => {}); // Ignorar errores de unload
          }
        }
      });
      
      await sound.playAsync();
      setIsLoading(false);
    } catch (error) {
      console.error('Error playing audio:', error);
      setIsPlaying(false);
      setIsLoading(false);
      soundRef.current = null;
    }
  };

  const stopAudio = async () => {
    try {
      if (soundRef.current) {
        const sound = soundRef.current;
        soundRef.current = null; // Limpiar referencia primero
        
        // Verificar que el sound aún existe antes de detenerlo
        if (sound) {
          await sound.stopAsync();
          await sound.unloadAsync();
        }
      }
    } catch (error) {
      console.error('Error stopping audio:', error);
    } finally {
      setIsPlaying(false);
      setIsLoading(false);
    }
  };

  return {
    isPlaying,
    isLoading,
    playAudio,
    stopAudio
  };
};