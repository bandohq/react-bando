import { queryClient } from './queryClient';
import { QueryClient } from '@tanstack/react-query';

describe('queryClient', () => {
  it('is an instance of Query Client', () => {
    expect(queryClient).toBeInstanceOf(QueryClient);
  });
});
