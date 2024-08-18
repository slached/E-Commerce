const {redisClient, DEFAULT_EXPIRATION} = require('../config/redis')

const getOrSetCache = (key, cb) => {
    return new Promise((resolve, reject) => {
        redisClient.get(key, async (err, data) => {
            // if there is an error occured
            if (err) return reject(err);
            // if key in cache
            if (data) return resolve(JSON.parse(data))
            // if key is not in cache
            const freshData = await cb()
            redisClient.setex(key, DEFAULT_EXPIRATION, JSON.stringify(freshData))
            resolve(freshData)
        })
    })
}

module.exports = getOrSetCache