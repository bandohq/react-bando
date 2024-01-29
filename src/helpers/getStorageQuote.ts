import { Quote } from '@hooks/useQuote/requests';
import env from '@config/env';

type StorageQuote = {
  quote: Quote | null;
  network: string | null;
  operationType: 'deposit' | 'withdraw' | null;
};

export default function getStorageQuote() {
  try {
    const quote: StorageQuote = JSON.parse(
      localStorage.getItem(env.rampDataLocalStorage) ?? '',
    ) as {
      quote: Quote;
      network: string;
      operationType: 'deposit' | 'withdraw';
    };
    return quote;
  } catch {
    return { quote: null, network: null, operationType: null } as StorageQuote;
  }
}
