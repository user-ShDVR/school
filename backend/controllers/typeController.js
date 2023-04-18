const { Users, Contests } = require('../models/models')
const ApiError = require('../error/ApiError');


class TypeController {
    async create(req, res, next) {

        let { name, description, userId, workers } = req.body
        const meme = await Contests.findOne({ where: { name } })
        if (meme) {
            return next(ApiError.badRequest('Проект с таким именем уже существует'))
        }

        const cont = await Contests.create({ name, description, workers });
        const user = await Users.findAll({ where: { id: userId } });
        await cont.addUsers(user);
        return res.json(cont)

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

        let { name, id_user } = req.body;
        const resu = await Contests.findOne({ where: { name: name } });
        if (resu) {

            let obj = JSON.parse(resu.users);
            let ne = Object.keys(obj).length;

            if (Object.values(obj).includes(id_user)) {

                return res.json("Юзер уже в проекте");

            }

            obj[ne] = id_user;

            const al = await Contests.update({ users: JSON.stringify(obj) }, { where: { name: name } });
            return res.json(al);

        }
    }

}

module.exports = new TypeController()
