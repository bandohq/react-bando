import useNetworks from '@hooks/useNetworks';
import { useId, useMemo } from 'react';
import { fillArray } from './helpers';
import { Network } from '@hooks/useNetworks/requests';
import { NetworkBttnsCont, NetworkButton } from './components';

import TokenPlaceholderGray from '../../assets/TokenPlaceholderGray.svg';

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

type NetworkListProps = {
  networkObj?: Partial<Network>;
  onSelectNetwork: (network: Network) => void;
};

export default function NetworkList({ networkObj, onSelectNetwork }: NetworkListProps) {
  const id = useId();
  const { networks = [] } = useNetworks();
  const _networks = useMemo(() => [...networks], [networks]);
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

  return (
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
            <NetworkButton role="button" key={`${id}-${idx}`}>
              + {_networks.length - previewNetworks.length}
            </NetworkButton>
          );
        }
        return (
          <NetworkButton
            role="button"
            className={networkObj?.key === network?.key ? 'active' : ''}
            onClick={() => onSelectNetwork(network as unknown as Network)}
            key={`${id}-${network.chainId}`}
          >
            <span>
              <img alt={network?.key} src={network?.logoUrl} />
            </span>
          </NetworkButton>
        );
      })}
    </NetworkBttnsCont>
  );
}
