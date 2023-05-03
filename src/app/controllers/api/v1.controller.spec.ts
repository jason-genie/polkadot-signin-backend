// std
import { ok, strictEqual } from 'assert';

// 3p
import { Context, createController, getHttpMethod, getPath, isHttpResponseOK } from '@foal/core';

// App
import { V1Controller } from './v1.controller';
import { DataSource } from 'typeorm';
import { createDataSource } from '../../../db';

describe('V1Controller', () => {

  let dataSource: DataSource;
  let controller: V1Controller;

  // Create a connection to the database before running all the tests.
  before(async () => {
    // The connection uses the configuration defined in the file config/test.json.
    // By default, the file has three connection options:
    // - "database": "./test_db.sqlite3" -> Use a different database for running the tests.
    // - "synchronize": true ->  Auto create the database schema when the connection is established.
    // - "dropSchema": true -> Drop the schema when the connection is established (empty the database).
    dataSource = createDataSource();
    await dataSource.initialize();
  });

  // Close the database connection after running all the tests whether they succeed or failed.
  after(async () => {
    if (dataSource) {
      await dataSource.close();
    }
  });

  beforeEach(() => controller = createController(V1Controller));

  describe('has a "readSecret" method that', () => {

    it('should handle requests at GET /secret', () => {
      strictEqual(getHttpMethod(V1Controller, 'readSecret'), 'GET');
      strictEqual(getPath(V1Controller, 'readSecret'), '/secret');
    });

    it('should return an HttpResponseOK.', async () => {
      const ctx = new Context({});
      const resposne = await controller.readSecret(ctx);
      ok(isHttpResponseOK(resposne), 'response should be an instance of HttpResponseOK.');
    });

  });

});
