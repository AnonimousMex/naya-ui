import { QueryClient } from "@tanstack/react-query";

const generateQueryClient = (): QueryClient => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
      },
    },
  });
};

export const queryClient = generateQueryClient();
