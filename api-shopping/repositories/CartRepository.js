var Cart = require('../models/Cart');
var Repository = require('./Repository');
const DrugCart = require('../models/DrugCart');

class CartRepository extends Repository {
    constructor(model) {
        super(model);
    }

    async findByUser(userId) {
        return await this.model.find({ user: userId }).exec();
    }

    async addDrugCart(cart,drug){
        return await this.model.findByIdAndUpdate(cart, {$push: {drugs: drug}}, {new: true, useFindAndModify:false});
    }

    async removeDrugCart(cartId,drugId){
        const drugCart = await DrugCart.findByIdAndRemove(drugId);
        const cart = await this.model.findById(cartId);

        let drugs = cart.drugs.filter(drug => {return drug != drugId});
        cart.drugs = drugs;

        const newCart = await cart.save();
        return newCart;
    }
}

var cartRepository = new CartRepository(Cart);

module.exports = cartRepository;