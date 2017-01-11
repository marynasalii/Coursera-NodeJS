var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var favoriteSchema = new Schema({
    postedBy: {
        required: true,
        // ObjectId of User object
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    // array to perform $push
    dishes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dish'
    }]
}, {
    timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var Favorites = mongoose.model('Favorites', favoriteSchema);

module.exports = Favorites;