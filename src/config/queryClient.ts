import { QueryClient } from '@tanstack/react-query';

/**
 * There are some settings that may require further discussion to change the default behavior
 * check here for more info https://medium.com/in-the-weeds/fetch-a-query-only-once-until-page-refresh-using-react-query-a333d00b86ff
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // https://tanstack.com/query/v4/docs/react/guides/window-focus-refetching
      refetchOnWindowFocus: false,
    },
  },
});
