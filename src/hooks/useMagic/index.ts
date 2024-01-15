import { useContext } from 'react';

import { MagicContext } from '@hooks/useMagicLinkAuth/MagicProvider';

export default function useMagic() {
  const magic = useContext(MagicContext);
  return magic;
}
