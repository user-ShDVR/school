const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const Users = sequelize.define('users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('USER', 'EXPERT', 'ADMIN'),
    defaultValue: 'USER'
  },
  name: {
    type: DataTypes.STRING
  }
});

const Contests = sequelize.define('Contests', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  workers: {
    type: DataTypes.INTEGER
  },
  rating: {
    type: DataTypes.JSON,
    defaultValue: "{rates: 0, votes: 0, rating: 0}"
  },
});

const Rating = sequelize.define('rating', {
  rate: { 
    type: DataTypes.INTEGER, 
    allowNull: false },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  contestsId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Contests',
      key: 'id'
    }
  }
})


const Tasks = sequelize.define('tasks', {

  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  description: { type: DataTypes.STRING },
  photo: { type: DataTypes.STRING, allowNull: false },
  author: { type: DataTypes.INTEGER },
  users: { type: DataTypes.JSON, defaultValue: "{ }" },
  rating: { type: DataTypes.JSON, defaultValue: "{ }" },
  typ: { type: DataTypes.STRING },
  stop: { type: DataTypes.STRING }

})

const ContestUser = sequelize.define('ContestUser', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  contestsId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Contests',
      key: 'id'
    }
  }
});

Users.belongsToMany(Contests, {
  through: 'ContestUser',
  as: 'Contests',
  foreignKey: 'userId'
});
Contests.belongsToMany(Users, {
  through: 'ContestUser',
  as: 'users',
  foreignKey: 'contestsId'
});
// связь many-to-many товаров и пользователей через промежуточную таблицу rating;
// за один товар могут проголосовать несколько зарегистрированных пользователей,
// один пользователь может проголосовать за несколько товаров

Users.belongsToMany(Contests, {
  through: Rating,
  as: 'ContestsRating',
  foreignKey: 'userId'
});
Contests.belongsToMany(Users, {
  through: Rating,
  as: 'usersRating',
  foreignKey: 'contestsId'
});


module.exports = {

  Users,
  Contests,
  Tasks,
  ContestUser,
  Rating

}

