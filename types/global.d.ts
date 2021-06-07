/* eslint-disable no-unused-vars */
/* eslint-disable no-var */
// ? needed or else linter won't be happy

import { AxiosRequestConfig } from "axios";
import { Pool } from "mysql2";

declare global {
    var db: Pool;
    var promisedb: Pool;
    var axios : AxiosRequestConfig;
}

declare var db: Pool;
declare var promisedb: Pool;
declare var axios : AxiosRequestConfig;