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
        color: 'info',
      };
    case 'REJECTED':
    case 'FAILED':
    case 'ERROR':
      return {
        text: 'Fallida ',
        color: 'error',
      };
    case 'EXPIRED':
      return {
        text: 'Expirada ',
        color: 'error',
      };
    case 'CANCELED':
      return {
        text: 'Cancelada ',
        color: 'error',
      };
    case 'COMPLETED':
      return {
        text: 'Completada  ',
        color: 'success',
      };
    case 'CASH_IN_PROCESSING':
    case 'CASH_IN_REQUESTED':
      return {
        text: 'Esperando depósito',
        color: 'pending',
      };
    default:
      return { text: '', color: '' };
  }
}
