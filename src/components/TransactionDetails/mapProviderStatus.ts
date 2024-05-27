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
    case 'WAIT_SOURCE_CONFIRMATIONS':
    case 'WAIT_DESTINATION_TRANSACTION':
    case 'BRIDGE_NOT_AVAILABLE':
    case 'CHAIN_NOT_AVAILABLE':
    case 'REFUND_IN_PROGRESS':
    case 'REFUNDED':
    case 'FIAT_COMPLETED':
    case 'PENDING':
    case 'TXN_REVERTED':
    case 'APPROVE_REVERTED':
      return {
        text: 'Procesando',
        color: 'info',
      };
    case 'REJECTED':
    case 'FAILED':
    case 'ERROR':
    case 'NOT_PROCESSABLE_REFUND_NEEDED':
    case 'OUT_OF_GAS':
    case 'SLIPPAGE_EXCEEDED':
    case 'INSUFFICIENT_ALLOWANCE':
    case 'INSUFFICIENT_BALANCE':
    case 'UNKNOWN_ERROR':
      return {
        text: 'Fallida ',
        subtitle:
          'Lo sentimos, tu transacción no pudo ser completada. Tu dinero será devuelto a tu cuenta en las próximas horas.',
        color: 'error',
      };
    case 'EXPIRED':
      return {
        text: 'Expirada ',
        subtitle:
          'No pudimos detectar tu transacción durante 60 mins. Cualquier aclaración, por favor contacta a soporte.',
        color: 'error',
      };
    case 'CANCELED':
      return {
        text: 'Cancelada ',
        subtitle:
          'Lo sentimos, tu transacción no pudo ser completada. Tu dinero será devuelto a tu cuenta en las próximas horas.',
        color: 'error',
      };
    case 'COMPLETED':
    case 'DONE':
      return {
        text: 'Completada  ',
        color: 'success',
      };
    case 'CASH_IN_PROCESSING':
    case 'CASH_IN_REQUESTED':
    case 'CREATED':
      return {
        text: 'Esperando depósito',
        color: 'pending',
      };
    default:
      return { text: '', color: '' };
  }
}
