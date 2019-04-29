const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsItemSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

var NewsItem = mongoose.model('NewsItem', newsItemSchema);

module.exports = NewsItem;