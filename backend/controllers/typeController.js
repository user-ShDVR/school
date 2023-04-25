const { Users, Contests, Rating } = require('../models/models')
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
        return res.json(contest);  //Вместо ответа сделай на подобии ApiError только ApiSuccess.GoodRequest('Проект успешно создан')

    }
    

    async getAll(req, res) {
        let { limit, page } = req.query;
        page = page || 1;
        limit = limit || 8;
        let offset = page * limit - limit;
        const types = await Contests.findAndCountAll({
            limit: limit,
            offset: offset,
            distinct: true,
            include: [{

                model: Users,
                as: 'users',
                required: false,
                attributes: ['id', 'name','email' ],
                through: { attributes: [] }

            }],
        });
        return res.json(types)
    }

    async add_user(req, res) {

        let { userId, contentId } = req.body;
        const user = await Users.findAll({ where: { id: userId } });
        const contest = await Contests.findOne({ where: { id: contentId } });

        if (user && contest) {

            await contest.addUsers(user);
            return res.json(contest) //Вместо ответа сделай на подобии ApiError только ApiSuccess.GoodRequest('Пользователь успешно добавлен')

        } else {

            return next(ApiError.badRequest('Такого пользователя или проекта не существует'))

        }
    }

    async createRate(req, res, next) {

        const { contestId, rate, userId } = req.body
        let rated;
        const contest = await Contests.findByPk(contestId)

        if (!contest) {
            throw new Error('Товар не найден в БД')
        }
        const user = await Users.findByPk(userId)
        if (!user) {
            throw new Error('Пользователь не найден в БД')
        }
        const rating = await Rating.create({userId: userId, contestsId: contestId, rate})
        const votes = await Rating.count({where: {contestsId: contestId}})
        if (votes) {
            const rates = await Rating.sum('rate', {where: {contestsId: contestId}})
            rated = {rates, votes, rating: rates/votes}
            const updateContest = await Contests.update({ rating: rated }, {
                where: {
                    id: contestId
                }
              })
              res.json(updateContest)
        } else {
            rated = {rates: 0, votes: 0, rating: 0}
            const updateContest = await Contests.update({ rating }, {
                where: {
                    id: contestId
                }
              })
              res.json(updateContest)
        }

    }

}

module.exports = new TypeController()
