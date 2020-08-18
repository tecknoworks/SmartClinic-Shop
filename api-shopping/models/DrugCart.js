var mongoose = require('mongoose');

const durgCartSchema = new mongoose.Schema(
    {
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