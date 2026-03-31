import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { useAnimalList } from "@/hooks/useAnimalList";
import { IMAGES } from "@/constants/images";

interface UseUserAnimalReturn {
  animalImage: any;
  animalColor: string;
  animalData: any;
  loading: boolean;
}

export const useUserAnimal = (animalId?: string | number): UseUserAnimalReturn => {
  const animals = useAnimalList();
  const [animalImage, setAnimalImage] = useState<any>(IMAGES.UNKNOWN_HEAD);
  const [animalColor, setAnimalColor] = useState<string>("#ffff");
  const [animalData, setAnimalData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchAnimalData() {
      try {
        let targetAnimalId = animalId;
        
        if (!targetAnimalId) {
          const token = await AsyncStorage.getItem("accessToken");
          if (token) {
            const decoded: any = jwtDecode(token);
            targetAnimalId = decoded.user?.animal_id;
          }
        }

        if (targetAnimalId && animals.length > 0) {
          const found = animals.find(
            (a: any) => String(a.animal_id) === String(targetAnimalId),
          );
          
          if (found) {
            const animalKey = found.animal_key.toUpperCase();
            const headImageKey = `HAPPY_${animalKey}_HEAD`;
            const headImage = IMAGES[headImageKey as keyof typeof IMAGES];

            setAnimalImage(headImage || IMAGES.UNKNOWN_HEAD);
            setAnimalColor(found.color_ui || "#edcedb");
            setAnimalData(found);
          }
        }
      } catch (error) {
        console.log("Error fetching animal data:", error);
      } finally {
        setLoading(false);
      }
    }

    if (animals.length > 0 || animalId) {
      fetchAnimalData();
    } else if (animals.length === 0 && !animalId) {
      setLoading(false);
    }
  }, [animals, animalId]);

  return {
    animalImage,
    animalColor,
    animalData,
    loading,
  };
};
