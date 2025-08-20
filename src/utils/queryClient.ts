import { QueryClient } from "@tanstack/react-query";
import { client } from "../generated/api/requests";

client.setConfig({
    baseUrl: "https://stockflow-f2gf.onrender.com/",
    throwOnError: true,
});

// Interceptor to add auth token to requests
client.interceptors.request.use((request) => {
    const token = localStorage.getItem("token");
    if (token) {
        request.headers.set("Authorization", `Bearer ${token}`);
    }
    return request;
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