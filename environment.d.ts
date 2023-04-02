declare namespace NodeJS {
  export interface ProcessEnv {
    readonly MYSQL_PASSWORD: string;
    readonly DATABASE_URL: string;
    readonly GOOGLE_CLIENT_ID: string;
    readonly GOOGLE_CLIENT_SECRET: string;
  }
}
