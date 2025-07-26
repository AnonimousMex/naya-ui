import { HTTP } from "@/config/axios";
import { URL_PATHS } from "@/constants/urlPaths";
import { TSingleDataResponse } from "@/models/Common";

export const ENERGY_SERVICE = {
  async consumeEnergy(): Promise<TSingleDataResponse<number>> {
    const { data } = await HTTP.put<TSingleDataResponse<number>>(
      URL_PATHS.ENERGIES.CONSUME_ENERGY,
    );
    return data;
  },
};
