import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

import { users } from "./schema";

const poolConnection = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DBNAME,
});

export const db = drizzle(poolConnection);
