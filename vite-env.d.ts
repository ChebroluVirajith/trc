/// <reference types="vite/client" />

declare module '@cashfreepayments/cashfree-js' {
  export function load(options: { mode: 'sandbox' | 'production' }): Promise<any>;
}

interface ImportMetaEnv {
  readonly VITE_CASHFREE_MODE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
