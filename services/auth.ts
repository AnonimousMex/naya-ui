import { HTTP } from "@/config/axios";
import { URL_PATHS } from "@/constants/urlPaths";
import { TVerificationCodeSchema } from "@/models/Auth";
import { TSingleDataResponse, TNoContentStatusResponse } from "@/models/Common";

export const AUTH_SERVICE = {
  async verifyAccountVerificationCode(
    requestData: TVerificationCodeSchema,
  ): Promise<TNoContentStatusResponse> {
    const { data } = await HTTP.post<TNoContentStatusResponse>(
      URL_PATHS.AUTH.VERIFY_CODE,
      requestData,
    );

    return data;
  },

  async verifyChangePasswordCode(
    requestData: TVerificationCodeSchema,
  ): Promise<TNoContentStatusResponse> {
    const { data } = await HTTP.post<TNoContentStatusResponse>(
      URL_PATHS.AUTH.VERIFY_CODE,
      requestData,
    );

    return data;
  },
};
