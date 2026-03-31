import { HTTP } from "@/config/axios";
import { URL_PATHS } from "@/constants/urlPaths";
import { TSingleDataResponse } from "@/models/Common";
import { TTherapist } from "@/models/therapist";

export const PARENTS_SERVICE = {
  async listTherapists(token: string): Promise<TSingleDataResponse<TTherapist[]>> {
    try {
      const { data } = await HTTP.get<TSingleDataResponse<TTherapist[]>>(
        URL_PATHS.PARENTS.LIST_THERAPISTS,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      return data;
    } catch (error) {
      throw error;
    }
  },
};
