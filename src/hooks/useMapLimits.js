// hooks/useData.js
import useSWR from 'swr';
import apiClient from '../utils/apiClient';

export const useMapLimits = () => {
  const { data, error } = useSWR('http://localhost:8000/navigation/map-limits', apiClient);
  return {
    data,
    isLoading: !error && !data,
    isError: error
  };
}
