/* eslint-disable no-unused-vars */
/* eslint-disable no-var */
// ? needed or else linter won't be happy

import { AxiosRequestConfig } from "axios";
import { Pool } from "mysql2/promise";

declare global {
    var db:      Pool;
    var axios:   AxiosRequestConfig;
    var readSql: (file: string) => string;
}

declare var db:      Pool;
declare var axios :  AxiosRequestConfig;
declare var readSql: (file: string) => string;