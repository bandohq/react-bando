/* eslint-disable @typescript-eslint/no-unused-vars */
declare module '@tapfiliate/tapfiliate-js' {
  export function init(accountId: string) {}

  export function detect() {}

  export function conversion(
    id: string | number,
    amount: string | number,
    options?: Record<string, unknown>,
  ) {}
}
