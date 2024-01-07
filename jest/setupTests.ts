// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import 'jest-localstorage-mock';

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
