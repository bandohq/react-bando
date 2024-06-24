import { Quote } from '@hooks/useQuote/requests';
import env from '@config/env';
import { OperationType } from '@hooks/useTransaction/requests';
import { Network } from '@hooks/useNetworks/requests';
import { Token } from '@hooks/useTokens/requests';

type StorageQuote = {
  quote: Quote | null;
  networkObj: Network | null;
  tokenObj: Token | null;
  operationType: OperationType | null;
  network?: string | null;
};

export default function getStorageQuote() {
  try {
    const quote: StorageQuote = JSON.parse(
      localStorage.getItem(env.rampDataLocalStorage) ?? '',
    ) as StorageQuote;
    return quote;
  } catch {
    return {
      quote: null,
      network: null,
      networkObj: null,
      tokenObj: null,
      operationType: null,
    } as StorageQuote;
  }
}

export const deleteStorageQuote = () => {
  localStorage.removeItem(env.rampDataLocalStorage);
};
