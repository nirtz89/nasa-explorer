import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // Default stale time: data is considered fresh for 5 minutes
            staleTime: 5 * 60 * 1000,

            // Cache time: unused data is garbage collected after 10 minutes
            gcTime: 10 * 60 * 1000,

            // Retry failed requests once
            retry: 1,

            // Don't refetch on window focus in development
            refetchOnWindowFocus: process.env.NODE_ENV === 'production',

            // Refetch on reconnect
            refetchOnReconnect: true,
        },
        mutations: {
            // Retry failed mutations once
            retry: 1,
        },
    },
});
