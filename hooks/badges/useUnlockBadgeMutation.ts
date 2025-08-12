import { useMutation } from "@tanstack/react-query";
import { BADGES_SERVICE } from "@/services/badges";
import { formatError } from "@/utils/errorHandler";

export type UnlockBadgeRequest = {
    token: string
    badge_title: string
};

export const useUnlockBadgeMutation = () => {

  return useMutation({
    mutationFn: (data: UnlockBadgeRequest) =>
    BADGES_SERVICE.unlockBadge(data),

    onSuccess: () => {
    },

    onError: (err: any) => {
      const { code } = formatError(err);
          
        },
  });
};
