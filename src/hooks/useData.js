import useSWR from "swr";
import apiClient from "../utils/apiClient";

export const useData = (url, method = "GET", body = null) => {
  if (url === null) {
    return {
      data: null,
      isLoading: false,
      isError: false,
    };
  }

  const fetcher = () => apiClient(url, method, body);
  const { data, error } = useSWR(url, fetcher);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};
