/// <reference types="vite/client" />

// Optional: add specific typing for your env vars
interface ImportMetaEnv {
    readonly VITE_GOOGLE_MAPS_API_KEY: string;
    // add more as needed
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  