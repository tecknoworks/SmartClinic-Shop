const CartRepository = require('../repositories/CartRepository');
const DrugCartRepository = require('../repositories/DrugCartRepository')

let get = async (req, res) => {
    let carts = await CartRepository.get();
    let drugs = await DrugCartRepository.get();
    res.json({carts: carts, drugs: drugs});
}

let getById = async (req, res) => {
    let id = req.params.id;
    let cart = await CartRepository.findById(id);

    res.json(cart);
}

let getByUserId = async (req, res) => {
    let id = req.params.id;

    let carts = await CartRepository.findByUser(id);
    res.json(carts);
}

let post = async (req, res) => {
    let data = { ...req.body };

    let cart = await CartRepository.create(data);
    res.json(cart);
}

let remove = async (req, res) => {
    let id = req.params.id;
    let cart = await CartRepository.remove(id);

    res.json(cart);
}

let addDrugToCart = async(req,res) =>{
    let data = { ...req.body };
    
    let cartId = data.cart;//the cart we want to insert
    let drugId = data.drug;//the actual drug we want to insert
    let quantity = data.quantity;//the quantity

    //validate
    let cart = await CartRepository.findById(cartId);
    if(!cart) throw new Error("Cart not found!");

    //checking if the actual drug is in cart (we have reference just for DrugCart in Cart)

    let isPresent = cart.drugs.filter(async drugCartId =>{
        let drugCart = await DrugCartRepository.findById(drugCartId);
        return drugCart.drug == drugId;
    })

    let drugCart;
    let newCart;
    if(isPresent.length===0){//if is not present, we want to create one
       
       drugCart = await DrugCartRepository.create({ quantity: quantity, drug: drugId,cart: cartId});
       newCart = await CartRepository.addDrugCart(cartId,drugCart.id);
       
    }else{//if is present, we want to update the qauntity
        existingDrugCart = await DrugCartRepository.findById(isPresent[0]);
        let newQuantity = existingDrugCart.quantity + quantity;
        drugCart =  await DrugCartRepository.update(existingDrugCart.id,{quantity:newQuantity});
        newCart = cart;
    }

    res.json({cart: newCart, drug: drugCart});
}

let deleteDrugFromCart = async(req,res) =>{
    const cartId = req.params.cartId;
    const drugId = req.params.drugId;

    let cart = await CartRepository.findById(cartId);
    if(!cart) throw new Error ("Cart not found!");

    let drug = await DrugCartRepository.findById(drugId);
    if(!drug) throw new Error("Drug not found!");

    let newCart =await  CartRepository.removeDrugCart(cartId, drugId);
    res.json(newCart);
}


module.exports = { get, getById, getByUserId, post, remove, addDrugToCart, deleteDrugFromCart};