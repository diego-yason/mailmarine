/* eslint-disable no-var */
import { Connection } from "mysql";

declare var db: Connection;

declare global {
    var db: Connection;
}