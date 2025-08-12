import { HTTP } from "@/config/axios";
import { URL_PATHS } from "@/constants/urlPaths";
import { TSingleDataResponse } from "@/models/Common";

export type UnlockBadgeRequest = {
  token: string
  badge_title: string
};

export type TListBadgesResponse = TBadges[];

export type TBadges = {
  title: string,
  description: string,
  image_path: string
}

export const BADGES_SERVICE = {
  async unlockBadge({ token, ...body }: UnlockBadgeRequest) {
    const { data } = await HTTP.post(
      URL_PATHS.ACHIEVEMENTS.UNLOCK_BADGE,
      body,
      {
        headers: {
          Authorization: `${token}`,
        },
      },
    );
    return data;
  },

  async getBadges(token: string): Promise<TSingleDataResponse<TListBadgesResponse>> {
    try {
      const response = await HTTP.get(URL_PATHS.ACHIEVEMENTS.LIST_BADGES, {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }


};