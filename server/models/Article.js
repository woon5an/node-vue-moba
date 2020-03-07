const mongoose = require('mongoose')


const schema = new mongoose.Schema({
    categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }], //说明分类是一个数组，里面关联的是一个个id，实现数据多选（一个英雄多个定位分类）
    title: { type: String },
    body: { type: String },
}, {
    timestamps: true    //自动加上create 和 update的时间字段
})


module.exports = mongoose.model('Article', schema)