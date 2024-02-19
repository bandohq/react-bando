export default function mapProviderStatus(status: string) {
  switch (status) {
    case 'CONVERSION_REQUEST':
    case 'CONVERSION_PROCESSING':
    case 'CONVERSION_COMPLETED':
    case 'MANUAL_REVISION':
    case 'REVIEW_NEEDED':
    case 'CASH_OUT_REQUEST':
    case 'CASH_OUT_PENDING':
    case 'CASH_OUT_REQUESTED':
    case 'CASH_OUT_PROCESSING':
    case 'CASH_OUT_COMPLETED':
      return {
        text: 'Procesando',
      };
    case 'FAILED':
      return {
        text: 'Fallida ',
      };
    case 'COMPLETED':
      return {
        text: 'Completada  ',
      };
    case 'CASH_IN_PROCESSING':
    case 'CASH_IN_REQUESTED':
      return {
        text: 'Esperando depósito',
        color: 'pending',
      };
    default:
      return {};
  }
}
