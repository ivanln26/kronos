declare namespace NodeJS {
  export interface ProcessEnv {
    readonly MYSQL_HOST: string;
    readonly MYSQL_PORT: string;
    readonly MYSQL_USER: string;
    readonly MYSQL_PASSWORD: string;
    readonly MYSQL_DBNAME: string;
  }
}
