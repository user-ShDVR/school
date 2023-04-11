const {Contests} = require('../models/models')
const ApiError = require('../error/ApiError');
const uuid = require('uuid')
const path = require('path');


class TypeController {
    async create(req, res, next) {

        let { name, description, author } = req.body
        const { img } = req.files
        
        const meme = await Contests.findOne({where: {name}})

        if (meme) {

            return next(ApiError.badRequest('Проект с таким именем уже существует'))

        }


        let fileName = uuid.v4() + ".jpg"
        img.mv(path.resolve(__dirname, '..', 'static', fileName))
        
        const cont = await Contests.create({ name, description, photo: fileName, author });

        return res.json(cont)

    }

    async getAll(req, res) {

        let { limit, page } = req.query;
        page = page || 1;
        limit = limit || 8;

        //offset - отступ
        let offset = page * limit - limit;

        const types = await Contests.findAndCountAll({limit, offset})
        return res.json(types)
    }

    async add_user(req, res){

        let {name, id_user} = req.body;
        const resu = await Contests.findOne({where: {name: name}});
        //console.log(resu)
        if(resu){
            
            let obj = JSON.parse(resu.users);
            let ne = Object.keys(obj).length;

            if( Object.values(obj).includes(id_user) ) {
            
                return res.json("Юзер уже в проекте");
            
            }

            obj[ne] = id_user;
            
            const al = await Contests.update({users: JSON.stringify(obj)}, {where:{name: name}});
            return res.json(al);
            
        }
    }

}

//пользователь смог добавиться в проект

module.exports = new TypeController()
