var mongoose = require('mongoose');

var DrugCart = require('../models/DrugCart');
var Repository = require('./Repository');

class DrugCartRepository extends Repository {
    constructor(model) {
        super(model);
    }

    async findByDrug(drugId){
        return await this.model.find({drug : drugId})
    }

    async update(id, data){
        const drug = await this.model.findById(id);
        if(!drug) throw new Error("Drug in cart not found!");

        Object.assign(drug,data);

        const newDrug = await drug.save();
        return newDrug;
    }

}

var drugCartRepository = new DrugCartRepository(DrugCart);

module.exports = drugCartRepository;