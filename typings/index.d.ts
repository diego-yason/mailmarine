/* eslint-disable no-var */
import { AxiosInstance } from "axios";
import { Connection } from "mysql";

declare var db: Connection;
declare var axios: AxiosInstance;

declare global {
    var db: Connection;
    var axios: AxiosInstance;
}