import { Control } from "react-hook-form";

export type ReactHookFormControl = Control<any, object>;

export type TSingleDataResponse<T> = {
  status: number;
  statusMessage: string;
  data: T;
};
export type TNoContentStatusResponse = {
  status: number;
};

export type TLoginTokens = {
  status: string;
  access_token: string;
  refresh_token: string;
};
export type TSingUpToken = {
  name: string;
  email: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  patientId: string;
}
