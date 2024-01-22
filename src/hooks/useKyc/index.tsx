import useSWRMutation from 'swr/mutation';

import { postUserKyc } from './requests';
import endpoints from '@config/endpoints';

export default function useKyc() {
  const { trigger, isMutating, data, error } = useSWRMutation(endpoints.userKyc, postUserKyc);

  return {
    postUserKyc: trigger,
    isMutating,
    data,
    error,
  };
}
