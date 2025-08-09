import { Control } from "react-hook-form";
import { TAnimal } from "./Animal";
import { TPatient } from "./therapist";

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
  user_type: "PATIENT" | "THERAPIST";
};

export type TSingUpToken = {
  name: string;
  email: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  patientId: string;
};

export type TListAnimalsResponse = TAnimal[];

export const emptyListAnimalsResponse: TSingleDataResponse<TListAnimalsResponse> = {
  status: 200,
  statusMessage: "Empty default",
  data: [],
};

export type TCreateAppointmentRequest = {
  token: string;
  date: string;     
  time: string;    
  patient_id: string;
};

export type TListAppointmentsRequest = {
  token: string
  patient_id: string;
}

export type TAppointment = {
  id: string;
  patient_id: string;
  date: string;     
  time: string;    
};

export type TAppointmentWithPatient = {
  id: string;
  patient_id: string;
  date: string;     
  time: string;    
  patient_name?: string;
  patient_animal_id?: string;
};
export type TCancelAppointmentRequest = {     
  id: string;
};

export type TListAppointmentResponse = TAppointment[];
;

export const emptyListAppointmentResponse: TSingleDataResponse<TListAppointmentResponse> = {
  status: 200,
  statusMessage: 'Empty default',
  data: [] 
};
export type TRescheduleAppointment = {
  appointment_id: string;
  date: string;     
  time: string;    
};

export type TListPatientsResponse = TPatient[];

export const emptyListPatientsResponse: TSingleDataResponse<TListPatientsResponse> = {
  status: 200,
  statusMessage: 'Empty default',
  data: [] 
};


