import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LOCAL_ANIMALS } from "@/constants/localData";
import { IMAGES } from "@/constants/images";
import { getAnimalHeadImage } from "@/utils/animalAssets";

interface UseUserAnimalReturn {
  animalImage: any;
  animalColor: string;
  animalData: any;
  loading: boolean;
}

export const useUserAnimal = (animalId?: string | number): UseUserAnimalReturn => {
  const [animalImage, setAnimalImage] = useState<any>(IMAGES.UNKNOWN_HEAD);
  const [animalColor, setAnimalColor] = useState<string>("#ffff");
  const [animalData, setAnimalData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchAnimalData() {
      try {
        let targetAnimalId = animalId;
        
        if (!targetAnimalId) {
          // Obtener animal_id del AsyncStorage
          const storedAnimalId = await AsyncStorage.getItem("animalId");
          if (storedAnimalId) {
            targetAnimalId = storedAnimalId;
          }
        }

        if (targetAnimalId) {
          const found = LOCAL_ANIMALS.find(
            (a: any) => String(a.id) === String(targetAnimalId),
          );
          
          if (found) {
            const headImage = getAnimalHeadImage(found.animal_key);
            setAnimalImage(headImage);
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

    fetchAnimalData();
  }, [animalId]);

  return {
    animalImage,
    animalColor,
    animalData,
    loading,
  };
};
