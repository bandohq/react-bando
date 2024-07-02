// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom

import '@testing-library/jest-dom';
import 'jest-localstorage-mock';

import { TextEncoder, TextDecoder } from 'util';
import { Response } from 'cross-fetch';

jest.mock('@intercom/messenger-js-sdk');

process.env.API = 'https://api.com';
process.env.AUTH_COOKIE_NAME = 'bando_test';

console.warn = jest.fn();
console.error = jest.fn();
global.window = Object.create(window);

HTMLElement.prototype.scrollIntoView = jest.fn();
Object.defineProperty(window, 'location', {
  value: {
    href: '',
    replace: jest.fn(),
    origin: 'https://te.st',
    pathname: '/',
  },
});

global.ResizeObserver = require('resize-observer-polyfill');
Object.assign(global, { TextDecoder, TextEncoder, Response });

const asString = jest.fn().mockImplementation(() => '{}');
const asBoolean = jest.fn().mockImplementation(() => true);
const asNumber = jest.fn().mockImplementation(() => 1);
const remoteConfigValue = {
  asString,
  asBoolean,
  asNumber,
};

jest.mock('firebase/remote-config', () => ({
  getAll: jest.fn().mockReturnValue({
    USE_GOOGLE_AUTOCOMPLETE: remoteConfigValue,
  }),
  getValue: jest.fn().mockReturnValue(remoteConfigValue),
  getRemoteConfig: jest.fn().mockImplementation(() => ({})),
  fetchAndActivate: jest.fn().mockResolvedValue(true),
}));
