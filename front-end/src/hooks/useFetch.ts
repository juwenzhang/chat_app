import { useQuery } from "react-query";

export const useFetch = <T>(key: string, queryFn: () => T, options: {
  onSuccess?: (data: any) => void,
  onError?: (error: any) => void,
  onSettled?: () => void,
  enabled?: boolean,
  refetchOnWindowFocus?: boolean,
  refetchOnMount?: boolean,
  refetchOnReconnect?: boolean,
  refetchInterval?: number,
  refetchIntervalInBackground?: boolean,
  staleTime?: number,
  cacheTime?: number,
  retry?: number,
  retryDelay?: number,
} = {}) => {
  try {
    return useQuery(key, queryFn, options)
  } catch (error) {
    console.error(error)
    return { data: null, error, isLoading: false, isError: true, isSuccess: false }
  }
}