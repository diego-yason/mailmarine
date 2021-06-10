/* eslint-disable no-unused-vars */
/* eslint-disable no-var */
// ? needed or else linter won't be happy

import { AxiosInstance } from "axios";
import { Client } from "discord.js";
import { Pool } from "mysql2/promise";

declare global {
    var db:      Pool;
    var axios:   AxiosInstance;
    var readSql: (file: string) => string;
    var client:  Client;
}

declare var db:      Pool;
declare var axios :  AxiosInstance;
declare var readSql: (file: string) => string;
declare var client:  Client;