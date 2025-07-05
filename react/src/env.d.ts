interface ImportMetaEnv {
  readonly VITE_APP_URL: string;
  readonly VITE_GOOGLE_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
