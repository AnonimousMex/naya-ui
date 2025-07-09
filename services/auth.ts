import { HTTP } from "@/config/axios";
import { URL_PATHS } from "@/constants/urlPaths";
import { TSignInSchema, TSignUp, TVerificationCodeSchema } from "@/models/Auth";
import {
  TSingleDataResponse,
  TNoContentStatusResponse,
  TLoginTokens,
  TSingUpToken,
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
  
  async verifyChangePasswordCode(
    requestData: TVerificationCodeSchema,
  ): Promise<TNoContentStatusResponse> {
    const { data } = await HTTP.post<TNoContentStatusResponse>(
      URL_PATHS.AUTH.VERIFY_CODE,
      requestData,
    );

    return data;
  },

  async singUp (patientData: TSignUp): Promise<TSingleDataResponse<TSingUpToken>>{
    const { data } = await HTTP.post<TSingleDataResponse<TSingUpToken>>(
      URL_PATHS.AUTH.SING_UP,
      {
        ...patientData
      }
    );
    return data
  },

  async selectProfile(requestData: { user_id: string; id_animal: string }): Promise<TNoContentStatusResponse> {
    const { data } = await HTTP.post<TNoContentStatusResponse>(
      URL_PATHS.AUTH.SELECT_PROFILE,
      requestData
    );
    return data;
  },
};
