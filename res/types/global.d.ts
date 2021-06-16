/* eslint-disable no-unused-vars */
/* eslint-disable no-var */
// ? needed or else linter won't be happy

import { AxiosInstance } from "axios";
import { Client } from "discord.js";
import { Pool } from "mysql2/promise";

declare global {
    var db:      Pool;
    var axios:   AxiosInstance;
    var readFile: (file: string) => string;
    var client:  Client;
    /**
     * Sets the time between each cache clear in ms
     */
    var cacheTime: number;
    namespace NodeJS {
        interface ProcessEnv {
            TOKEN: string;
            DATABASE_IP: string;
            DATABASE_PORT: string;
            DATABASE_USER: string;
            DATABASE_PASS: string;
            APPID: string;
        }
    }
}

declare var db:      Pool;
declare var axios :  AxiosInstance;
declare var readSql: (file: string) => string;
declare var client:  Client;
declare var cacheTime: number;