const {Tasks, Likes} = require('../models/models');
const ApiError = require('../error/ApiError');
const uuid = require('uuid');
const path = require('path');

class TasksController {

    async create(req, res, next) {
        
        let { name, description, author, rating } = req.body;
        const { img } = req.files;
        

        const meme = await Tasks.findOne({where: {name}})

        if (meme) {

            return next(ApiError.badRequest('Задача с таким именем уже существует'))

        }


        let fileName = uuid.v4() + ".jpg";
        img.mv(path.resolve(__dirname, '..', 'task', fileName));
        
        const cont = await Tasks.create({ name, description, photo: fileName, author, rating });

        return res.json(cont);
        
    }


    async getAll(req, res) {
        
        let { limit, page } = req.query;
        page = page || 1;
        limit = limit || 8;

        //offset - отступ
        let offset = page * limit - limit;

        const types = await Tasks.findAndCountAll({limit, offset})
        return res.json(types)
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

        let {name, id_user, proc} = req.body;
        const resu = await Tasks.findOne({where: {name: name}});
        //console.log(resu)
        if(resu){
            
            let obj = JSON.parse(resu.users);
            let ne = Object.keys(obj).length;


            if( Object.keys(obj).includes(id_user) ) {

                return res.json("Юзер уже в задаче");
            
            }

            obj[id_user] = proc;
            
            const al = await Tasks.update({users: JSON.stringify(obj)}, {where:{name: name}});
            return res.json(al);
            
        }

    }


}

//сразу указывает сколько сделает
//админ только создает задачу, а юзеры сами выбирают сколько сделают в цифрах


module.exports = new TasksController()