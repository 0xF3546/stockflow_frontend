import { QueryClient } from "@tanstack/react-query";
import { client } from "../generated/api/requests";

client.setConfig({
    baseUrl: "https://stockflow-f2gf.onrender.com/",
    credentials: "include",
    throwOnError: true,
});

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            staleTime: 1000 * 60 * 5
        },
    },
});