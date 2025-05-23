/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  // aquí puedes añadir más variables VITE_* si las usas
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}