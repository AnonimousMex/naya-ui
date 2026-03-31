import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

interface UserInfo {
  user_id: string;
  name?: string;
  email?: string;
  animal_id?: string;
  user_type?: string;
  code_connection?: string;
}

export const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const token = await AsyncStorage.getItem("accessToken");
        if (!token) {
          setUserInfo(null);
          setLoading(false);
          return;
        }

        const decoded: any = jwtDecode(token);
        setUserInfo({
          user_id: decoded.sub || decoded.user_id,
          name: decoded.user?.name || decoded.name,
          email: decoded.user?.email || decoded.email,
          animal_id: decoded.user?.animal_id || decoded.animal_id,
          user_type: decoded.user_type,
          code_connection: decoded.user?.code_connection || decoded.code_connection,
        });
      } catch (error) {
        console.error("Error decoding token:", error);
        setUserInfo(null);
      } finally {
        setLoading(false);
      }
    };

    getUserInfo();
  }, []);

  const getToken = async () => {
    return await AsyncStorage.getItem("accessToken");
  };

  return { userInfo, loading, getToken };
};
