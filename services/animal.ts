import { HTTP } from "@/config/axios";
import { URL_PATHS } from "@/constants/urlPaths";
import { TListAnimalsResponse, TSingleDataResponse } from "@/models/Common";

export const ANIMAL_SERVICE = {
  async listAnimals(): Promise<TSingleDataResponse<TListAnimalsResponse>> {
    try {
      const { data } = await HTTP.get<TSingleDataResponse<TListAnimalsResponse>>(
        URL_PATHS.ANIMAL.LIST_ANIMALS
      );
      return data;
    } catch (error) {
      throw error;
    }
  },
};
