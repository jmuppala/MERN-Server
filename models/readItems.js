var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var readItemsSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    readItems: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'NewsItem'
        }
    ]
}, {
    timestamps: true
});

var ReadItems = mongoose.model('ReadItem', readItemsSchema);

module.exports = ReadItems;