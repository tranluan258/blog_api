import redis  from "redis";
const redisClient = redis.createClient();


export default {
    connect: async () => {
        await redisClient.connect();
    },

    setValues: async (key, value) => {
        // eslint-disable-next-line no-useless-catch
        try {
            await redisClient.set(key, value);
        } catch (error) {
            console.log(error)
            throw error;
        }
    },

    setValuesExpired: async (key, value) => {
        // eslint-disable-next-line no-useless-catch
        try {
            await redisClient.set(key, value);
            await redisClient.expire(key, 60 * 60 * 24)
        } catch (error) {
            console.log(error)
            throw error;
        }
    },

    getValues: async (key) => {
        try {
            let values = redisClient.get(key)
            return values;
        } catch (error) {
            console.log(error)
            throw error;
        }
    },

    pushValuesArr: async (key, value) => {
        // eslint-disable-next-line no-useless-catch
        try {
            await redisClient.LPUSH(key, value);
        } catch (error) {
            console.log(error)
            throw error;
        }
    },
    getAllValuesArr: async (key) => {
        // eslint-disable-next-line no-useless-catch
        try {
            return await redisClient.LRANGE(key, 0,-1);
        } catch (error) {
            console.log(error)
            throw error;
        }
    },

    deleteKey: async (key) => {
        try {
            return await redisClient.DEL(key);
        } catch (error) {
            console.log(error)
            throw error;
        }
    }
}