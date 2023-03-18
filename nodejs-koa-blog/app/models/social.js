const moment = require('moment');
const bcrypt = require('bcryptjs')
const { sequelize } = require('@core/db')
const { DataTypes, Model } = require('sequelize')

// 定义用户模型
class Socail extends Model {

}

// 初始用户模型
Socail.init({
    id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        comment: '用户主键ID'
    },
    social_id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        comment: '平台用户id'
    },
    user_id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        comment: 'user表用户id'
    },
    platform: {
        type: DataTypes.STRING(20),
        comment: '平台名称'
    },
    name: {
        type: DataTypes.STRING(50),
        comment: '用户昵称'
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: 'user_email_unique',
        comment: '邮箱'
    },
    given_name: {
        type: DataTypes.STRING(50),
        comment: '姓'
    },
    family_name: {
        type: DataTypes.STRING(50),
        comment: '名'
    },
    locale: {
        type: DataTypes.STRING(20),
        comment: '地区'
    },
    picture: {
        type: DataTypes.STRING(20),
        comment: '头像'
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: '创建时间',
        get() {
            return moment(this.getDataValue('created_at')).format('YYYY-MM-DD HH:mm:ss');
        }
    }
}, {
    sequelize,
    modelName: 'social',
    tableName: 'social'
})


module.exports = {
    Social
}
