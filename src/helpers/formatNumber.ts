export default function formatNumber(nb = 0, decimals = 2, maxDecimals = 2) {
  return nb.toLocaleString('us', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: maxDecimals,
  });
}
