import { ERRORS } from "@/constants/errors/errorList";
import { isAxiosError } from "axios";

type TError = {
  message: string;
  code: string;
  status: number;
  statusMessage: string;
};

type TApiError = TError & {
  error: {
    code: string;
  };
};

export const formatError = (error: unknown): TError => {
  if (isAxiosError(error)) {
    // console.log(error.cause);
    // console.log(error.code);
    // console.log(error.config);
    // console.log(error.message);
    // console.log(error.name);
    // console.log(error.request);
    // console.log(error.response);
    // console.log(error.stack);
    if (error.status === 422) {
      return {
        code: ERRORS.UNPROCESSABLE_ENTITY.code,
        message: ERRORS.UNPROCESSABLE_ENTITY.message,
        status: 422,
        statusMessage: "",
      };
    }
    const formattedError = {
      code: (error.response?.data as TApiError)?.error.code || "",
      message: (error.response?.data as TApiError)?.statusMessage || "",
      status: (error.response?.data as TApiError)?.status || 0,
      statusMessage: (error.response?.data as TApiError)?.statusMessage || "",
    };
    return formattedError;
  }

  return {
    code: "UNKNOWN",
    message: (error as Error).message,
    status: 0,
    statusMessage: "",
  };
};
