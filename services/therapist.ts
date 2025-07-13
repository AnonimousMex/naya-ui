import { HTTP } from '@/config/axios'
import { URL_PATHS } from '@/constants/urlPaths'
import { TListPatientsResponse, TNoContentStatusResponse, TSingleDataResponse } from '@/models/Common'
import { TCloseConnection } from '@/models/therapist'

export const THERAPIST_SERVICE = {
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
}
