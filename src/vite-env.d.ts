/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_RAZORPAY_KEY_ID?: string;
  readonly VITE_CASHFREE_MODE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
