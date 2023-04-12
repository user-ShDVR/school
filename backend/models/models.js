const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
    name: {type: DataTypes.STRING},
    
})

const Contests = sequelize.define('contests', {

    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    description: {type: DataTypes.STRING},
    author: {type: DataTypes.INTEGER},
    workers: {type: DataTypes.INTEGER},
    users: {type: DataTypes.JSON, defaultValue: "{ }"}

})


const Tasks = sequelize.define('tasks', {

    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    description: {type: DataTypes.STRING},
    photo: {type: DataTypes.STRING, allowNull: false},
    author: {type: DataTypes.INTEGER},
    users: {type: DataTypes.JSON, defaultValue: "{ }"},
    rating: {type: DataTypes.JSON, defaultValue: "{ }"},
    typ: {type: DataTypes.STRING},
    stop: {type: DataTypes.STRING}
    
})

module.exports = {

    User,
    Contests,
    Tasks

}

