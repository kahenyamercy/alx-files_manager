// utils/redis.js

import redis from 'redis';

class RedisClient {
    constructor() {
        this.client = redis.createClient();

        // Display errors in the console
        this.client.on('error', (err) => {
            console.error('Redis client error:', err);
        });
    }

    isAlive() {
        // Check if the connection to Redis is successful
        return this.client.connected;
    }

    async get(key) {
        return new Promise((resolve, reject) => {
            this.client.get(key, (err, reply) => {
                if (err) {
                    console.error('Error getting value from Redis:', err);
                    resolve(null);
                } else {
                    resolve(reply);
                }
            });
        });
    }

    async set(key, value, duration) {
        return new Promise((resolve, reject) => {
            this.client.setex(key, duration, value, (err, reply) => {
                if (err) {
                    console.error('Error setting value in Redis:', err);
                    resolve(null);
                } else {
                    resolve(reply);
                }
            });
        });
    }

    async del(key) {
        return new Promise((resolve, reject) => {
            this.client.del(key, (err, reply) => {
                if (err) {
                    console.error('Error deleting value from Redis:', err);
                    resolve(null);
                } else {
                    resolve(reply);
                }
            });
        });
    }
}

// Create and export an instance of RedisClient
const redisClient = new RedisClient();
export default redisClient;
