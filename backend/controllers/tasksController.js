const {Tasks, Users, TaskUser} = require('../models/models');
const ApiError = require('../error/ApiError');
const uuid = require('uuid');
const path = require('path');

class TasksController {

    async create(req, res, next) {

            let { name, description, typ, userId, stop } = req.body;
            const isExists = await Tasks.findOne({ where: { name } });

            if (isExists) {

                return next(ApiError.badRequest('Проект с таким именем уже существует'));

            }

            const task = await Tasks.create({ name, description, typ, stop });
            const user = await Users.findAll({ where: { id: userId } });
            await task.addUsers(user); //task.addUsers(user, { through: { author: true } })
            return res.json(task);  //Вместо ответа сделай на подобии ApiError только ApiSuccess.GoodRequest('Проект успешно создан')

        }


    async getAll(req, res) {
        
        let { limit, page } = req.query;
        page = page || 1;
        limit = limit || 8;
        let offset = page * limit - limit;
        const tasks = await Tasks.findAndCountAll({
            limit: limit,
            offset: offset,
            distinct: true,
            include: [{
                model: Users,
                as: 'users',
                required: false,
                attributes: ['id', 'name'],
                through: { attributes: ['predicted', 'rate'] }
            }],
        });

        return res.json(tasks)

    }

    async add_like(req, res){

        let { name, val, user } = req.body;

        const proj = await Tasks.findOne({where: {name}});
        
        let obj = JSON.parse(proj.rating);

        obj[user] = +val;
        
        const al = await Tasks.update({rating: JSON.stringify(obj)}, {where:{name: name}});
        return res.json(al)
   
    }

    async get_like(req, res){

        let { name } = req.body;
        const rat = await Tasks.findOne({where:{name: name}});

        if(rat){
            return res.json(rat.rating);
        }else{

            return res.json("Нет такого");
        }
    }

    async add_user(req, res){
        let { userId, contentId, predict } = req.body;

        const user = await Users.findOne({ where: { id: userId } });
        const task = await Tasks.findOne({ where: { id: contentId } });

        if (user && task) {
            task.addUsers(user, { through: { predicted: predict } })
            return res.json(task) //Вместо ответа сделай на подобии ApiError только ApiSuccess.GoodRequest('Пользователь успешно добавлен')
        } else {
            return next(ApiError.badRequest('Такого пользователя или проекта не существует'))
        }

    }

    async createRate(req, res){
        let { userId, taskId, rate } = req.body;
        const task1= await Tasks.findByPk(taskId)
        
        if (!task1) {
            return res.json('task не найден в БД')
        }
        const user1 = await Users.findByPk(userId)
        if (!user1) {
            return res.json('User не найден в БД')
        }
        const user = await Users.findOne({ where: { id: userId } });
        const task = await Tasks.findOne({ where: { id: taskId } });


        if (user && task) {
            //const taskUser = await TaskUser.findOne({ where: { userId, taskId } }) из вот этой функи достаем это -> {rates: 0, votes: 0, rating: 0}
            // rates + rate
            // votes + 1
            // rating = rates/votes
            // update {rates: 5, votes: 1, rating: 5}
            //const rating = await TaskRating.create({userId: userId, TasksId: taskId, predicted: predict})
            //const tu = await TaskUser.create({taskId, userId})
            task.addUsers(user, { through: { predicted: predict } })
            return res.json(task) //Вместо ответа сделай на подобии ApiError только ApiSuccess.GoodRequest('Пользователь успешно добавлен')

        } else {
            return next(ApiError.badRequest('Такого пользователя или проекта не существует'))

        }

    }

    async getUserTasks(req, res) {
        let { userId, page, limit, type } = req.query;
        page = page || 1;
        limit = limit || 8;
        let offset = page * limit - limit;

        // получаем пользователя
        const user = await Users.findOne({
            where: { id: userId }
        });

        if (!user) {
            throw new Error('Такого пользователя не существует');
        }
        const count = await user.countTasks({where: { typ: type }});
        const userTasks = await user.getTasks({
            where: { typ: type },
            limit: limit,
            offset: offset,
            distinct: true,
            include: [{
                model: Users,
                as: 'users',
                required: false,
                attributes: ['id', 'name', 'email'],
                through: { attributes: ['predicted', 'rate'] }
            }],
        });

        return res.json({
            count: count,
            rows: userTasks
        });
    }
}
//сразу указывает сколько сделает
//админ только создает задачу, а юзеры сами выбирают сколько сделают в цифрах
module.exports = new TasksController()