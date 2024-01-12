import currencies from './currencies';

describe('currencies constants', () => {
  it('should return arrays for sendCurrency and depositCurrency', () => {
    expect(currencies.sendCurrency).toBeArray();
    expect(currencies.depositCurrency).toBeArray();
  });
});
