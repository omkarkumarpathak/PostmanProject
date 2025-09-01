const { SqliteDriver } = require('@mikro-orm/sqlite');
const { RequestLog } = require('./entities/RequestLog');

module.exports = {
  entities: [RequestLog],
  dbName: 'requests.sqlite3',
  driver: SqliteDriver,  
};
