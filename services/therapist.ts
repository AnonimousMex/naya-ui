import { HTTP } from "@/config/axios";
import { URL_PATHS } from "@/constants/urlPaths";
import { TNoContentStatusResponse } from "@/models/Common";
import { TCreateAppointmentRequest, TSingleDataResponse, TListAppointmentResponse, TRescheduleAppointment } from "@/models/Common";


export const THERAPIST_SERVICE = {
  async createAppointment({ token, ...body }: TCreateAppointmentRequest) {
    const { data } = await HTTP.post(
      URL_PATHS.THERAPIST.SCHEDULE_APPOINTMENT,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  },


  async listAppointments(
    token: string,
    patient_id?: string
  ): Promise<TSingleDataResponse<TListAppointmentResponse>> {
    try {
      const url = patient_id
        ? `${URL_PATHS.THERAPIST.LIST_APPOINTMENTS}?patient_id=${patient_id}`
        : URL_PATHS.THERAPIST.LIST_APPOINTMENTS;

      const { data } = await HTTP.get<TSingleDataResponse<TListAppointmentResponse>>(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      return data;
    } catch (error) {
      throw error;
    }
  },

  async cancelAppointment(
    id: string): Promise<TNoContentStatusResponse> {
    const { data } = await HTTP.put<TNoContentStatusResponse>(
      URL_PATHS.THERAPIST.CANCEL_APPOINTMENT,
      { id }
    );
    return data;
  },

  async rescheduleAppointment(
    token: string,
    body: Omit<TRescheduleAppointment, "token">
  ) {
    const { data } = await HTTP.put(
      URL_PATHS.THERAPIST.RESCHEDULE_APPOINTMENT,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  },

   async completeAppointment(
    id: string): Promise<TNoContentStatusResponse> {
    const { data } = await HTTP.put<TNoContentStatusResponse>(
      URL_PATHS.THERAPIST.COMPLETE_APPOINTMENT,
      { id }
    );
    return data;
  },

};
