const Redis = require("ioredis");
const redis = new Redis({
  port: 18699, // Redis port
  host: "redis-18699.c10.us-east-1-2.ec2.cloud.redislabs.com", // Redis host
  username: "default", // needs Redis >=
  password: process.env.REDISPASSWORD,
});

module.exports = redis;
