import AsyncStorage from '@react-native-async-storage/async-storage';

// Tipos para el almacenamiento de resultados
export type TestAnswer = {
  storyId: string;
  storyTitle: string;
  answerId: string;
  answerText: string;
  emotionName: string;
};

export type TestResult = {
  id: string;
  userName: string;
  date: string;
  answers: TestAnswer[];
  predominantEmotion: string;
  emotionCounts: Record<string, number>;
};

const STORAGE_KEY = 'psychometric_test_results';

// Función para guardar un resultado de test
export const saveTestResult = async (result: TestResult): Promise<void> => {
  try {
    const existingResults = await getTestResults();
    const updatedResults = [...existingResults, result];
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedResults));
  } catch (error) {
    console.error('Error saving test result:', error);
    throw error;
  }
};

// Función para obtener todos los resultados
export const getTestResults = async (): Promise<TestResult[]> => {
  try {
    const results = await AsyncStorage.getItem(STORAGE_KEY);
    return results ? JSON.parse(results) : [];
  } catch (error) {
    console.error('Error getting test results:', error);
    return [];
  }
};

// Función para obtener resultados por usuario
export const getTestResultsByUser = async (userName: string): Promise<TestResult[]> => {
  try {
    const allResults = await getTestResults();
    return allResults.filter(result => result.userName === userName);
  } catch (error) {
    console.error('Error getting test results by user:', error);
    return [];
  }
};

// Función para obtener el último resultado de un usuario
export const getLatestTestResult = async (userName: string): Promise<TestResult | null> => {
  try {
    const userResults = await getTestResultsByUser(userName);
    if (userResults.length === 0) return null;
    
    // Ordenar por fecha (más reciente primero)
    userResults.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return userResults[0];
  } catch (error) {
    console.error('Error getting latest test result:', error);
    return null;
  }
};

// Función para eliminar todos los resultados (útil para desarrollo/testing)
export const clearTestResults = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing test results:', error);
    throw error;
  }
};

// Función para calcular la emoción predominante
export const calculatePredominantEmotion = (answers: TestAnswer[]) => {
  const emotionCounts: Record<string, number> = {};
  
  // Contar emociones
  answers.forEach(answer => {
    const emotion = answer.emotionName;
    emotionCounts[emotion] = (emotionCounts[emotion] || 0) + 1;
  });

  // Encontrar la emoción con más ocurrencias
  let maxCount = 0;
  let predominantEmotions: string[] = [];
  
  Object.entries(emotionCounts).forEach(([emotion, count]) => {
    if (count > maxCount) {
      maxCount = count;
      predominantEmotions = [emotion];
    } else if (count === maxCount) {
      predominantEmotions.push(emotion);
    }
  });

  // Si hay empate, devolver "Balance"
  const predominantEmotion = predominantEmotions.length > 1 ? "Balance" : predominantEmotions[0];
  
  return { predominantEmotion, emotionCounts };
};