/* eslint-disable jest/prefer-expect-assertions */
// tests/redisClient.test.js
import {
  isAlive, set, get, del,
} from '../utils/redis';

describe('redisClient', () => {
  it('should be alive', () => {
    expect(isAlive()).toBe(true);
  });

  it('should set and get a key', async () => {
    await set('testKey', 'testValue', 10);
    const value = await get('testKey');
    expect(value).toBe('testValue');
  });

  it('should delete a key', async () => {
    await set('testKey', 'testValue', 10);
    await del('testKey');
    const value = await get('testKey');
    expect(value).toBeNull();
  });
});
