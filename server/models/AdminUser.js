const mongoose = require('mongoose')


const schema = new mongoose.Schema({
    username: { type: String },
    password: { type: String, 
                select: false,
                set(val) {              //安装bcryptjs模块，用于装密码的散列,bcrypt安装会报错，bcryptjs是纯js写的bcrypt可以解决报错
                    return require('bcryptjs').hashSync(val, 10)
                }
        },
})


module.exports = mongoose.model('AdminUser', schema)