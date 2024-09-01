export default {
  address: 'Your wallet address',
  lastName: 'Last Name',
  name: 'Names',
  clabe: 'Interbank code',
  confirm: 'Confirm',
  confirmTitle: 'Confirm your transaction',
  inProgressTitle: 'Transaction in Progress',
  errors: {
    recipient: 'This account has been rejected by Bando. Try with another account.',
    forbidden:
      'Bando is in private beta. To become one of our first users, send an email to soporte@bando.cool',
    txn: 'There was an error processing your transaction. Please try again',
    limit: `
      <h5>You have reached your monthly limit!</h5>
      </br>
      <strong>How do I increase my limit at Bando?</strong>
      </p>
        With the initial level, the purchase limit is up to $500 USD per month.
        To increase your limit to $9,999 USD per month you need to:
      </p>
      <ol>
        <li>Open Bando's support chat and request an increase.</li>
        <li>Send a photo of your INE (front and back) or passport.</li>
        <li>Proof of address</li>
        <li>The address of your wallet from which you will send assets to Bando</li>
      </ol>
      <h6>Once your documents are submitted, verification can take up to 24 hours.</h6>
    `,
    accountNames: 'The account name does not match your registered name.',
  },
};
