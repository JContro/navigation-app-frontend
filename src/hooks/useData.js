// hooks/useData.js
import useSWR from 'swr';
import apiClient from '../utils/apiClient';

export const useData = () => {
  const { data, error } = useSWR('http://localhost:8000', apiClient);
  return {
    data,
    isLoading: !error && !data,
    isError: error
  };
}
