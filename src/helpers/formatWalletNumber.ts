// '0x3a05...9115'

export default function formatWalletNumber(walletNumber: string) {
  return `${walletNumber.slice(0, 6)}...${walletNumber.slice(-4)}`;
}
