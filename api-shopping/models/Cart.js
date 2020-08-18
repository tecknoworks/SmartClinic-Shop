var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const DrugCart = require('./DrugCart')

const cartSchema = new mongoose.Schema(
    {
        user:{ 
            type: String,
            require: true 
        },

        drugs:[
            { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Drug_to_Cart'
            }
        ]
    }

);

cartSchema.pre('findOneAndRemove', function(next){
    DrugCart.deleteMany({cart: this._conditions._id}).exec();
    next();
})

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;