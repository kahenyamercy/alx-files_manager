/* eslint-disable jest/prefer-expect-assertions */
// tests/dbClient.test.js
import { isAlive, nbUsers as _nbUsers, nbFiles as _nbFiles } from '../utils/db';

describe('dBClient', () => {
  it('should be alive', () => {
    expect(isAlive()).toBe(true);
  });

  it('should return the number of users', async () => {
    const nbUsers = await _nbUsers();
    expect(typeof nbUsers).toBe('number');
  });

  // eslint-disable-next-line jest/prefer-expect-assertions
  it('should return the number of files', async () => {
    const nbFiles = await _nbFiles();
    expect(typeof nbFiles).toBe('number');
  });
});
