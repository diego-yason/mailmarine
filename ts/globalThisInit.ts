export default (database:, axios, client): void => {
    globalThis.db = database;
    globalThis.axios = axios;
    globalThis.client = client;
}