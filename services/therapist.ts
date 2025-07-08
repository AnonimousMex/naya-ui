import { HTTP } from "@/config/axios";
import { URL_PATHS } from "@/constants/urlPaths";
import { TNoContentStatusResponse } from "@/models/Common";

export type TCreateAppointmentRequest = {
  token: string;
  date: string;      // formato YYYY-MM-DD
  time: string;      // formato HH:mm
  patient_id: string;
};
export type TAppointment = {
  id: string;
  patient_id: string;
  date: string;     
  time: string;    
};

export type TListAppointmentResponse = TAppointment[];
;

export type TSingleDataResponse<T> = {
  status: number;
  statusMessage: string;
  data: T;
};

export const emptyListAppointmentResponse: TSingleDataResponse<TListAppointmentResponse> = {
  status: 200,
  statusMessage: 'Empty default',
  data: [] 
};


export const THERAPIST_SERVICE = {
  async createAppointment(
    requestData
  : TCreateAppointmentRequest): Promise<TNoContentStatusResponse> {
    const { data } = await HTTP.post<TNoContentStatusResponse>(
      URL_PATHS.THERAPIST.SCHEDULE_APPOINTMENT,
      requestData
    );
    return data;
  },

  async listAppointments( token:string): Promise<TSingleDataResponse<TListAppointmentResponse>> {
        try{
            const { data } = await HTTP.get<TSingleDataResponse<TListAppointmentResponse>>(
                URL_PATHS.THERAPIST.LIST_APPOINTMENTS,
                { 
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    }
                }
            )        
            return data
        } catch(error){
            throw error;
        }
    },




};
