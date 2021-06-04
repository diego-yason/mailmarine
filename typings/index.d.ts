/* eslint-disable no-var */
import { AxiosInstance, AxiosPromise } from "axios";
import { Connection } from "mysql";

declare var db: Connection;
declare var axios: AxiosPromise;

declare global {
    var db: Connection;
    var axios: AxiosPromise;
}