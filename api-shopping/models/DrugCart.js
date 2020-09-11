var mongoose = require('mongoose');
var Float = require('mongoose-float').loadType(mongoose, 2);

const durgCartSchema = new mongoose.Schema(
    {
        name:{
            type: String,
        },
        price:{
            type: Float,
        },
        quantity: {
            type: Number,
            required: true
        },
        drug: {
             type: String, 
             require: true 
        },
        cart : {
            type: mongoose.Schema.Types.ObjectId,
            ref : 'Cart'
        }
    }
);

const DrugCart = mongoose.model('Drug_to_Cart', durgCartSchema);
module.exports = DrugCart;