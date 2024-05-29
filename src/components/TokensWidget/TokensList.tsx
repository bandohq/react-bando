import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Input from '@components/forms/Input';
import TokenPlaceholderGray from '../../assets/TokenPlaceholderGray.svg';

import { useRef } from 'react';
import { createPortal } from 'react-dom';
import { useVirtualizer } from '@tanstack/react-virtual';

import { Token } from '@hooks/useTokens/requests';
import { TransactionTypeIcon } from '@components/TransactionsTable/CellDetailWithIcon';
import { TokenList } from './components';

type TokenListProps = {
  tokens?: Token[];
  tokenObj?: Partial<Token>;
  onSelectToken?: (token: Token) => void;
  filterTokens?: (value: string) => Token[] | undefined;
};

export default function TokensList({
  tokens,
  filterTokens,
  onSelectToken,
  tokenObj = {},
}: TokenListProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const searchTokensElement = document.getElementById('search-tokens');
  const count = tokens?.length ?? 0;
  const virtualizer = useVirtualizer({
    count,
    getScrollElement: () => listRef.current,
    estimateSize: () => 72,
  });
  const items = virtualizer.getVirtualItems();

  return (
    <>
      {!!searchTokensElement &&
        createPortal(
          <Grid xs={12} sm={12} md={12} spacing={2} sx={{ px: 0, pb: 0 }}>
            <Input
              disabled={!tokens?.length}
              defaultValue={tokenObj?.name ?? tokenObj?.key}
              sx={{ '& .MuiInputBase-input': { borderColor: 'ink.i250' } }}
              onChange={(e) => {
                filterTokens?.(e.target.value);
              }}
              fullWidth
            />
          </Grid>,
          searchTokensElement,
        )}
      <Box sx={{ height: '100%', width: '100%' }} ref={parentRef}>
        <TokenList
          ref={listRef}
          sx={{
            height: parentRef.current?.clientHeight,
            width: '100%',
            overflowY: 'auto',
            contain: 'strict',
          }}
        >
          <Box
            sx={{
              height: virtualizer.getTotalSize(),
              width: '100%',
              position: 'relative',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                transform: `translateY(${items[0]?.start ?? 0}px)`,
              }}
            >
              {items.map((virtualRow) => {
                const token = tokens?.[virtualRow.index];
                return (
                  <li
                    key={virtualRow.key}
                    ref={virtualizer.measureElement}
                    data-index={virtualRow.index}
                    onClick={() => token && onSelectToken?.(token)}
                    className={tokenObj?.id === token?.id ? 'active' : ''}
                  >
                    <Box sx={{ width: '38px', mr: 2 }}>
                      <TransactionTypeIcon
                        role="button"
                        sx={{ backgroundColor: 'background.paper' }}
                      >
                        <img alt={token?.name} src={token?.imageUrl ?? TokenPlaceholderGray} />
                      </TransactionTypeIcon>
                    </Box>
                    <Box>
                      <p>{token?.key ?? token?.name}</p>
                      {token?.name}
                    </Box>
                  </li>
                );
              })}
            </Box>
          </Box>
        </TokenList>
      </Box>
    </>
  );
}
