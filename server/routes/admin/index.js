//通用增删改查接口，CRUD

module.exports = app =>{
    const express = require('express')
    const jwt = require('jsonwebtoken')
    const AdminUser = require('../../models/AdminUser')
    const assert = require('http-assert')
    const router = express.Router({
        mergeParams: true
    })  //express的子路由，在里面写各种增删改查的东西    
    
    //const req.Model = require('../../models/req.Model')

    //创建资源
    router.post('/', async (req, res) =>{
       //const Model = require(`../../model/${req.params.resource}`)
       const model = await req.Model.create(req.body)
       res.send(model)
    })
    //更新资源
    router.put('/:id', async (req, res) =>{
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })    
    //删除资源
    router.delete('/:id', async (req, res) =>{
        await req.Model.findByIdAndDelete(req.params.id, req.body)
        res.send({
            success: true
        })
    })    
    //资源列表
    router.get('/', async (req, res) => {
        const queryOptions = {}
        if (req.Model.modelName === 'Category') {       //当model为分类列表时，进行特殊操作
            queryOptions.populate = 'parent'
        }

        const items = await req.Model.find().setOptions(queryOptions).limit(100)
        
        res.send(items)
   
    })

    //资源详情
    router.get('/:id', async (req, res) => {
        const model = await req.Model.findById(req.params.id)
        res.send(model)
   
    })
    
    //调用登录授权中间件
    const authMiddleware = require('../../middleware/auth')
    //调用资源中间件
    const resourceMiddleware = require('../../middleware/resource')

    //
    app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router)          //再把这个子路由挂载上去
    
    const multer = require('multer')
    const upload = multer({ dest: __dirname + '/../../uploads' })
    app.post('/admin/api/upload', authMiddleware(), upload.single('file'), async (req, res) => {   //允许接收单个文件
        const file = req.file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })


    app.post('/admin/api/login', async (req, res) => {
        const { username, password } = req.body
        //1.根据用户名找用户

        const user = await AdminUser.findOne({
            username: username
        }).select('+password')

        // http-assert这个包非常方便
        // assert(value, [status], [message], [properties])
        // 总的来说就是确保值value存在？如果不存在抛出什么错误状态码status，message是什么，属性构造可省略
        assert(user, 422, '用户不存在')
        // if (!user) {
        //     return res.status(422).send({
        //         message: '用户不存在'
        //     })
        // }

        //2.校验密码
        const isValid = require('bcryptjs').compareSync(password, user.password)
        assert(isValid, 422, '密码错误')
        // if(!isValid){
        //     return res.status(422).send({
        //         message: '密码错误'
        //     })
        // }

        //3.返回token
        
        const token = jwt.sign({id: user._id}, app.get('secret'))
                                            //保存用户的_id作为签名
        res.send({token})
    })


    //错误处理函数
    app.use(async (err, req, res, next) => {
        res.status(err.statusCode || 500 ).send({
            message: err.message
        })
    })

}