declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      USERS_REPOSITORY_DRIVER: string;
      HASH_PROVIDER_DRIVER: string;
      TOKEN_PROVIDER_DRIVER: string;
      DATE_PROVIDER_DRIVER: string;
      ACCESS_TOKEN_SECRET: string;
      REFRESH_TOKEN_SECRET: string;
    }
  }
}

export {}
