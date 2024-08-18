const {redisClient, DEFAULT_EXPIRATION} = require('../config/redis')

const getOrSetCache = (key, cb) => {
    return new Promise((resolve, reject) => {
        redisClient.get(key, async (err, data) => {
            if (err) return reject(err);
            if (data) return resolve(JSON.parse(data))
            const freshData = await cb()
            redisClient.setex(key, DEFAULT_EXPIRATION, JSON.stringify(freshData))
            resolve(freshData)
        })
    })
}

module.exports = getOrSetCache