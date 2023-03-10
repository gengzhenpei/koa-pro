const Sequelize = require('sequelize')
const redis = require("redis");
const {
  dbName,
  host,
  port,
  user,
  password
} = require('../config/config').database

const {
  redisConfig
} = require('../config/config')

const sequelize = new Sequelize(dbName, user, password, {
  dialect: 'mysql',
  host,
  port,
  logging: true,
  timezone: '+08:00',
  define: {
    // create_time && update_time
    timestamps: true,
    // delete_time
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    // 把驼峰命名转换为下划线
    underscored: true,
    scopes: {
      bh: {
        attributes: {
          exclude: ['password', 'updated_at', 'deleted_at', 'created_at']
        }
      },
      iv: {
        attributes: {
          exclude: ['content', 'password', 'updated_at', 'deleted_at']
        }
      }
    }
  }
})

// 创建模型
sequelize.sync({ force: false })

sequelize.authenticate().then(res => {
  console.log('Connection has been established successfully.');
}).catch(err => {
  console.error('Unable to connect to the database:', err);
})

// sequelize.query("CREATE DATABASE IF NOT EXISTS boblog DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci").then(res=>{
//   console.log('CREATE DATABASE SUCCESS!')
// }).catch(err => {
//   console.log('CREATE DATABASE FAIL!', err)
// })

// redis服务 建立连接
const redisClient = redis.createClient({
  socket: {
    port: redisConfig.REDIS_PORT,
    host: redisConfig.AREDIS_HOST,
  },
  password: redisConfig.REDIS_PASSWORD,
});

// redis监听连接事件
redisClient
  .connect()
  .then(() => {
    console.log("redis连接成功");
  })
  .catch((err) => {
    console.log(err || "redis连接出错");
  });

module.exports = {
  sequelize,
  redisClient
}
