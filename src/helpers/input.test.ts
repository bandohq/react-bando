import { FormEvent } from 'react';
import { addZero, numberInputOnWheelPreventChange, removeZero } from './inputs';

describe('inputs function', () => {
  it('should add zero', () => {
    const event = {
      currentTarget: {
        value: '',
      },
    };
    addZero(event as FormEvent<HTMLInputElement>);
    expect(event.currentTarget.value).toBe('0');
  });

  it('should remove zero', () => {
    const event = {
      currentTarget: {
        value: '0',
      },
    };
    removeZero(event as unknown as FormEvent<HTMLInputElement>);
    expect(event.currentTarget.value).toBe('');
  });

  it('should blur onwheel', () => {
    const event = {
      currentTarget: {
        blur: jest.fn(),
      },
    };
    numberInputOnWheelPreventChange(event as unknown as React.WheelEvent<HTMLInputElement>);
    expect(event.currentTarget.blur).toHaveBeenCalled();
  });
});
