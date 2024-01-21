import useSWR from 'swr';
import { getPlacesRequest } from './requests';

export default function usePlaceAutocomplete({ input = '' }) {
  const { data, isLoading, error } = useSWR('/maps/api/place/autocomplete/json', (url) =>
    getPlacesRequest(url, { arg: input }),
  );

  return {
    data,
    error,
    isLoading,
  };
}
