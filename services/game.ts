import { HTTP } from '@/config/axios'
import { URL_PATHS } from '@/constants/urlPaths'
import { TGameListResponse, TSingleDataResponse } from '@/models/Common';

export const GAME_SERVICE =  {
  async listGames():Promise<TSingleDataResponse<TGameListResponse>> {
    const { data } =await HTTP.get(URL_PATHS.GAME.GAME_LIST);
    return data;
  }
}
