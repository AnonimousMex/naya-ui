import { HTTP } from '@/config/axios'
import { URL_PATHS } from '@/constants/urlPaths'
import { TListPatientsResponse, TSingleDataResponse } from '@/models/Common'

export  const THERAPIST_SERVICE = {
    async listPatients( token:string): Promise<TSingleDataResponse<TListPatientsResponse>> {
        try{
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
        } catch(error){
            throw error;
        }
    },
}
