import { Quote } from '@hooks/useQuote/requests';
import env from '@config/env';
import { OperationType } from '@hooks/useTransaction/requests';

type StorageQuote = {
  quote: Quote | null;
  network: string | null;
  operationType: OperationType | null;
};

export default function getStorageQuote() {
  try {
    const quote: StorageQuote = JSON.parse(
      localStorage.getItem(env.rampDataLocalStorage) ?? '',
    ) as {
      quote: Quote;
      network: string;
      operationType: OperationType;
    };
    return quote;
  } catch {
    return { quote: null, network: null, operationType: null } as StorageQuote;
  }
}

export const deleteStorageQuote = () => {
  localStorage.removeItem(env.rampDataLocalStorage);
};
