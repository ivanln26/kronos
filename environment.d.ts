declare namespace NodeJS {
  export interface ProcessEnv {
    readonly MYSQL_PASSWORD: string;
    readonly DATABASE_URL: string;
  }
}
