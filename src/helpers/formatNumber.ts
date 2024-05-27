export default function formatNumber(nb = 0, minimumFractionDigits = 2, maximumFractionDigits = 2) {
  return nb.toLocaleString('us', {
    minimumFractionDigits,
    maximumFractionDigits,
  });
}
