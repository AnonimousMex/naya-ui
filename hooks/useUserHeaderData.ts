import { useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { HTTP } from "@/config/axios";
import { URL_PATHS } from "@/constants/urlPaths";
import { useListAnimalsMutation } from "@/hooks/animal/useListAnimalsMutation";
import { TAnimal } from "@/models/Animal";
import { getAnimalHeadImage } from "@/utils/animalAssets";

export function useUserHeaderData() {
  const [energy, setEnergy] = useState(0);
  const [userName, setUserName] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);
  const { mutate, data } = useListAnimalsMutation();

  const fetchEnergy = async () => {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      if (!token) throw new Error("No auth token found");
      const { data } = await HTTP.get<{ current_energy: number }>(
        URL_PATHS.ENERGIES.GET_ENERGY,
        { headers: { Authorization: token } }
      );
      setEnergy(data.current_energy);
    } catch (e) {
      setEnergy(0);
    }
  };

  const fetchUserData = async () => {
    const token = await AsyncStorage.getItem("accessToken");
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        setUserName(decoded.user?.name || "");
        const animal_id = decoded.user?.animal_id;
        if (animal_id) {
          if (!data) mutate();
          let animalsList: TAnimal[] = [];
          if (Array.isArray(data)) {
            animalsList = data;
          } else if (data?.data && Array.isArray(data.data)) {
            animalsList = data.data;
          }
          const found = animalsList.find((a) => String(a.animal_id) === String(animal_id));
          setAvatar(found ? getAnimalHeadImage(found.animal_key) : getAnimalHeadImage("UNKNOWN"));
        } else {
          setAvatar(null);
        }
      } catch (e) {
        setUserName("");
        setAvatar(null);
      }
    }
  };

  const fetchHeaderData = useCallback(() => {
    fetchEnergy();
    fetchUserData();
  }, [data]);

  return { energy, userName, avatar, fetchHeaderData };
}

