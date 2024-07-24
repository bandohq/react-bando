import Box from '@mui/material/Box';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import TokenPlaceholderGray from '../../assets/TokenPlaceholderGray.svg';

import { useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';

import { Token } from '@hooks/useTokens/requests';
import { TransactionTypeIcon } from '@components/TransactionsTable/CellDetailWithIcon';
import { TokenList, TokenLink } from './components';
import formatWalletNumber from '@helpers/formatWalletNumber';

type TokenListProps = {
  tokens?: Token[];
  tokenObj?: Partial<Token>;
  explorerUrl?: string;
  onSelectToken?: (token: Token) => void;
};

export default function TokensList({
  tokens,
  onSelectToken,
  explorerUrl = '',
  tokenObj = {},
}: TokenListProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const count = tokens?.length ?? 0;
  const virtualizer = useVirtualizer({
    count,
    getScrollElement: () => listRef.current,
    estimateSize: () => 72,
  });
  const items = virtualizer.getVirtualItems();

  return (
    <>
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
                      <p>{token?.symbol ?? token?.name}</p>
                      <Box className="token-name">{token?.name}</Box>
                      <Box
                        className="token-address"
                        sx={{
                          display: 'flex',
                          gap: 1,
                          alignItems: 'center',
                          justifyItems: 'center',
                          '& svg': {
                            width: '16px',
                            height: '16px',
                            verticalAlign: 'middle',
                            ml: 0.5,
                            mt: '-4px',
                          },
                        }}
                      >
                        {formatWalletNumber(token?.address ?? '')}
                        <TokenLink
                          href={`${explorerUrl}address/${token?.address}`}
                          target="_blank"
                          onClick={(e) => e.stopPropagation()}
                          rel="noopener noreferrer"
                        >
                          <OpenInNewIcon width={16} height={16} />
                        </TokenLink>
                      </Box>
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
