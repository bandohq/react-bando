import axios from 'axios';

export type RequestQuoteArgs = {
  baseAmount: number;
  quoteCurrency: string;
  baseCurrency: string;
};

export type Quote = RequestQuoteArgs & {
  id: number;
  quoteAmount: number;
  isExpired: boolean;
  expiresAt: string;
};

type GetQuoteRequest = (endpoint: string, data: { arg: RequestQuoteArgs }) => Promise<Quote>;
export const getQuoteRequest: GetQuoteRequest = (endpoint, { arg }) =>
  axios
    .post(endpoint, {
      base_amount: String(arg.baseAmount),
      quote_currency: arg.quoteCurrency,
      base_currency: arg.baseCurrency,
    })
    .then(({ data }) => ({
      id: data.id,
      baseCurrency: data.base_currency,
      baseAmount: parseFloat(data.base_amount),
      quoteCurrency: data.quote_currency,
      quoteAmount: parseFloat(data.quote_amount),
      isExpired: data.is_expired,
      expiresAt: data.expires_at,
    }));
