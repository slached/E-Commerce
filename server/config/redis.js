const Redis = require('ioredis')
const redisClient = new Redis()
const DEFAULT_EXPIRATION = 60 * 60 * 1000

const initializeRedis = new Promise((resolve, reject) => {
    redisClient.on('connect', function () {
        resolve('Redis connected successfully');
    });

    redisClient.on('error', function (err) {
        reject('Redis Connection Error ' + err);
    });
});

module.exports = {initializeRedis, redisClient, DEFAULT_EXPIRATION};
