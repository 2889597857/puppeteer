const mongoose = require('../config/mongoose')

const LinkListSchema = mongoose.Schema({
    url: {
        type: String
    },
    state: {
        type: Number,
        default: 0
    },
    lastTime: {
        type: Date,
        default: Date.now
    },
    content: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'content'
    },
    website: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'website'
    }
})

const LinkListModel = mongoose.model('LinkListSchema', LinkListSchema, 'LinkList')

module.exports = LinkListModel
