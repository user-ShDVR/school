const { Users, Contests } = require('../models/models')
const ApiError = require('../error/ApiError');


class TypeController {
    async create(req, res, next) {

        let { name, description, userId, workers } = req.body
        const isExists = await Contests.findOne({ where: { name } })
        if (isExists) {
            return next(ApiError.badRequest('Проект с таким именем уже существует'))
        }

        const contest = await Contests.create({ name, description, workers });
        const user = await Users.findAll({ where: { id: userId } });
        await contest.addUsers(user);
        return res.json(contest)

    }

    async getAll(req, res) {

        let { limit, page } = req.query;
        page = page || 1;
        limit = limit || 8;
        let offset = page * limit - limit;
        const types = await Contests.findAndCountAll({
            limit: +limit,
            offset: +offset,
            include: [{
                model: Users,
                as: 'users',
                required: false,
                attributes: ['id', 'name'],
                through: { attributes: [] }
            }],
        });
        return res.json(types)
    }

    async add_user(req, res) {

        let { id_user, id_contest } = req.body;
        const user = await Users.findAll({ where: { id: id_user } });
        const contest = await Contests.findOne({ where: { id: id_contest } });
        if (user && contest) {
            await contest.addUsers(user);
            return res.json(contest)
        } else {
            return next(ApiError.badRequest('Такого пользователя или проекта не существует'))
        }
    }

}

module.exports = new TypeController()
