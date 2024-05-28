import { useId, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';

import { fillArray } from './helpers';
import { Network } from '@hooks/useNetworks/requests';
import { NetworkBttnsCont, NetworkButton, TokenList } from './components';

import TokenPlaceholderGray from '../../assets/TokenPlaceholderGray.svg';
import DialogDrawer from '@components/DialogDrawer';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';

import useNetworks from '@hooks/useNetworks';
import { TransactionTypeIcon } from '@components/TransactionsTable/CellDetailWithIcon';

type ShowMoreItem = {
  showNetworkList: boolean;
  name?: never;
  key?: never;
  logoUrl?: never;
  chainId?: never;
  rpcUrl?: never;
  explorerUrl?: never;
  isTestnet?: never;
  networkType?: never;
  isActive?: never;
};
type PreviewNetworkItem = Network | ShowMoreItem | null;
type PreviewNetworks = PreviewNetworkItem[];

type NetworkTilesProps = {
  networkObj?: Partial<Network>;
  onSelectNetwork: (network: Network) => void;
};

export default function NetworkTiles({ networkObj, onSelectNetwork }: NetworkTilesProps) {
  const id = useId();

  const [openNetworkList, setOpenNetworkList] = useState(false);
  const { networks = [] } = useNetworks();
  // const _networks = useMemo(() => [...networks, ...networks, ...networks, ...networks], [networks]);
  const _networks = useMemo(() => [...networks], [networks]);

  const networkListElement = document.getElementById('network-list');

  const _previewNetworks = useMemo(() => fillArray(5, _networks, 10), [_networks]);
  const previewNetworks = useMemo(() => {
    const lastItem = _previewNetworks[_previewNetworks.length - 1];
    const newArr = [..._previewNetworks] as unknown as PreviewNetworks;
    if (lastItem) {
      newArr.pop();
      newArr.push({ showNetworkList: true });
    }
    return newArr;
  }, [_previewNetworks]);

  if (!_networks) return null;

  return (
    <>
      {!!networkListElement &&
        createPortal(
          <DialogDrawer
            open={openNetworkList}
            title="Selecciona una Red"
            onClose={() => {
              setOpenNetworkList(!openNetworkList);
            }}
          >
            <Box sx={{ height: '100%', width: '100%', overflowY: 'auto', px: 2, pb: 2 }}>
              <TokenList sx={{ width: '100%' }}>
                {_networks?.map((network, idx) => (
                  <li
                    key={`${network?.chainId}-${idx}`}
                    onClick={() => {
                      onSelectNetwork(network);
                      setOpenNetworkList(!openNetworkList);
                    }}
                    className={networkObj?.chainId === network?.chainId ? 'active' : ''}
                  >
                    <Box sx={{ width: '38px', mr: 2 }}>
                      <TransactionTypeIcon
                        role="button"
                        sx={{ backgroundColor: 'background.paper' }}
                      >
                        <img alt={network?.name} src={network?.logoUrl ?? TokenPlaceholderGray} />
                      </TransactionTypeIcon>
                    </Box>
                    <Box>
                      <p>{network?.name}</p>
                    </Box>
                  </li>
                ))}
              </TokenList>
            </Box>
          </DialogDrawer>,
          networkListElement,
        )}

      <NetworkBttnsCont xs={12} sm={12} md={12} spacing={2}>
        {previewNetworks?.map((network: PreviewNetworkItem, idx: number) => {
          if (!network) {
            return (
              <NetworkButton role="button" disabled key={`${id}-${idx}`}>
                <span>
                  <img src={TokenPlaceholderGray} />
                </span>
              </NetworkButton>
            );
          }
          if (network?.showNetworkList) {
            return (
              <NetworkButton
                role="button"
                key={`${id}-${idx}-${network.chainId}`}
                onClick={() => {
                  console.log('asdasd');
                  setOpenNetworkList(!openNetworkList);
                }}
              >
                + {_networks.length - previewNetworks.length}
              </NetworkButton>
            );
          }
          return (
            <Tooltip
              arrow
              placement="top"
              title={network?.name}
              key={`${id}-${idx}-${network.chainId}`}
            >
              <NetworkButton
                role="button"
                className={networkObj?.key === network?.key ? 'active' : ''}
                onClick={() => onSelectNetwork(network as unknown as Network)}
              >
                <span>
                  <img alt={network?.key} src={network?.logoUrl} />
                </span>
              </NetworkButton>
            </Tooltip>
          );
        })}
      </NetworkBttnsCont>
    </>
  );
}
