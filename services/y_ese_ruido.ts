import { HTTP } from "@/config/axios";
import { URL_PATHS } from "@/constants/urlPaths";

export type YEseRuidoSound = {
  audio_path: string;
  emotion: string;
  title: string;
  body: string;
  tip: string;
  highlight: string;
};

export const Y_ESE_RUIDO_SERVICE = {
   async getSounds(): Promise<YEseRuidoSound[]> {
    const { data } = await HTTP.get<YEseRuidoSound[]>(
      URL_PATHS.GAMES.GET_Y_ESE_RUIDO_SOUNDS
    );
    
    return data; 

  },
};