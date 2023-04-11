const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Contests} = require('../models/models')
const uuid = require('uuid')
const path = require('path');

const generateJwt = (id, email, role) => {
    
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
    
}

class UserController {
    async registration(req, res, next) {

        const {email, password, name, role} = req.body
        //const {img} = req.files

        if (!email || !password) {

            return next(ApiError.badRequest('Некорректный email или password'))

        }

        const candidate = await User.findOne({where: {email}})

        if (candidate) {

            return next(ApiError.badRequest('Пользователь с таким email уже существует'))

        }

        const hashPassword = await bcrypt.hash(password, 5)

        //let fileName = uuid.v4() + ".jpg"
        //img.mv(path.resolve(__dirname, '..', 'avs', fileName))

        const user = await User.create({email, password: hashPassword, role, name})

        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})

    }

    async login(req, res, next) {

        const {email, password} = req.body
        if (email) {

        
        const user = await User.findOne({where: {email}})
        
        if(email && password){
            if (!user) {
                return next(ApiError.internal('Пользователь не найден'))
            }

            let comparePassword = bcrypt.compareSync(password, user.password)

            if (!comparePassword) {
                return next(ApiError.internal('Указан неверный пароль'))
            }

            const token = generateJwt(user.id, user.email, user.role)
            return res.json({token, user})

        }
        return res.json("Введены не все данные");


        }
        else {
            return res.json("Данные не введены");
        }
    }

    async check(req, res, next) {

        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})

    }

    async change_role(req, res){

        let {email, new_role} = req.body;
        const candidate = await User.findOne({where: {email}})

        if (candidate) {

            const al = await User.update({role: new_role}, {where:{email: email}});
            return res.json({al})

        }
        return res.json("Ошибка, email не найден")

    }

}
module.exports = new UserController()