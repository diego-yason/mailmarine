/* eslint-disable no-unused-vars */
/* eslint-disable no-var */
// ? needed or else linter won't be happy

import { AxiosRequestConfig } from "axios";
import { Pool } from "mysql2/promise";

declare global {
    var db: Pool;
    var axios : AxiosRequestConfig;
}

declare var db: Pool;
declare var axios : AxiosRequestConfig;