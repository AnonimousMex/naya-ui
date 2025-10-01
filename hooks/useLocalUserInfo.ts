import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LOCAL_USERS } from "@/constants/localData/users";

interface LocalUserInfo {
  id: string;
  name: string;
  email: string;
  user_type: "PATIENT" | "THERAPIST" | "PARENT";
  patient_id?: string | null;
  animal_id?: string | null;
}

export const useLocalUserInfo = () => {
  const [userInfo, setUserInfo] = useState<LocalUserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getLocalUserInfo = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        
        if (!userId) {
          setUserInfo(null);
          setLoading(false);
          return;
        }

        // Buscar usuario en datos locales
        const user = LOCAL_USERS.find(u => u.id === userId);
        
        if (user) {
          setUserInfo({
            id: user.id,
            name: user.name,
            email: user.email,
            user_type: user.user_type,
            patient_id: user.patient_id,
            animal_id: user.animal_id,
          });
        } else {
          setUserInfo(null);
        }
      } catch (error) {
        console.error("Error getting local user info:", error);
        setUserInfo(null);
      } finally {
        setLoading(false);
      }
    };

    getLocalUserInfo();
  }, []);

  const getCurrentUserId = async (): Promise<string | null> => {
    try {
      return await AsyncStorage.getItem("userId");
    } catch (error) {
      console.error("Error getting user ID:", error);
      return null;
    }
  };

  const getCurrentUserType = async (): Promise<string | null> => {
    try {
      return await AsyncStorage.getItem("userType");
    } catch (error) {
      console.error("Error getting user type:", error);
      return null;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.multiRemove(["userId", "userType", "animalId"]);
      setUserInfo(null);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return {
    userInfo,
    loading,
    getCurrentUserId,
    getCurrentUserType,
    logout,
  };
};