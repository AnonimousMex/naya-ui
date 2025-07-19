import { HTTP } from "@/config/axios";
import { URL_PATHS } from "@/constants/urlPaths";

export type TMemocionPair = {
  pairId: string;
  emotion: string;
  situation: string;
};

type TMemocionPairRaw = {
  pair_id: string;
  emotion: string;
  situation: string;
};

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export const MEMOCIONES_SERVICE = {
  async getPairs(): Promise<TMemocionPair[]> {
    const { data } = await HTTP.get<TMemocionPairRaw[]>(
      URL_PATHS.GAMES.GET_MEMOCIONES_PAIRS,
    );

    const cleaned = data.map((item) => ({
      pairId: item.pair_id,
      emotion: item.emotion,
      situation: item.situation,
    }));

    return shuffle(cleaned).slice(0, 6);
  },
};
