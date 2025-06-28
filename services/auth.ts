import { HTTP } from "@/config/axios";
import { URL_PATHS } from "@/constants/urlPaths";
import { TSignInSchema, TVerificationCodeSchema } from "@/models/Auth";
import {
  TSingleDataResponse,
  TNoContentStatusResponse,
  TLoginTokens,
} from "@/models/Common";

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

  async login(requestData: TSignInSchema): Promise<TLoginTokens> {
    const payload = new URLSearchParams();
    payload.append("username", requestData.email);
    payload.append("password", requestData.password);

    const { data } = await HTTP.post<TLoginTokens>(
      URL_PATHS.AUTH.LOGIN,
      payload,
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } },
    );

    return data;
  },
};
