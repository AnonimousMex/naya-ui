
import { HTTP } from "@/config/axios";
import { URL_PATHS } from "@/constants/urlPaths";
import { TNoContentStatusResponse } from "@/models/Common";
import { TCreateAppointmentRequest, TSingleDataResponse, TListAppointmentResponse, TRescheduleAppointment } from "@/models/Common";
import { TListPatientsResponse, TNoContentStatusResponse, TSingleDataResponse } from '@/models/Common'
import { TCloseConnection } from '@/models/therapist'

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
    appointment_id: string): Promise<TNoContentStatusResponse> {
    const { data } = await HTTP.put<TNoContentStatusResponse>(
      URL_PATHS.THERAPIST.CANCEL_APPOINTMENT,
      { appointment_id }
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
    appointment_id: string): Promise<TNoContentStatusResponse> {
    const { data } = await HTTP.put<TNoContentStatusResponse>(
      URL_PATHS.THERAPIST.COMPLETE_APPOINTMENT,
      { appointment_id }
    );
    return data;
  },
    async listPatients(token: string): Promise<TSingleDataResponse<TListPatientsResponse>> {
        try {
            const { data } = await HTTP.get<TSingleDataResponse<TListPatientsResponse>>(
                URL_PATHS.THERAPIST.LIST_PATIENTS,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    }
                }
            )
            return data
        } catch (error) {
            throw error;
        }
    },
    async closeConnection(
        token: string, dataRequest: TCloseConnection
    ): Promise<TNoContentStatusResponse> {
        const { data } = await HTTP.put<TNoContentStatusResponse>(
            URL_PATHS.THERAPIST.CLOSE_CONNETION,
            dataRequest,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            }
        );
        return data;
    }

};
