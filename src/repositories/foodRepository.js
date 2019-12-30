const FoodsModel = require('../models/food');

class FoodRepository {
    
    async save(food) {
        return await food.save();
    }

    async update(food) {
        return FoodsModel.findByIdAndUpdate({_id: food._id}, food);
    }

    async delete(idFood) {
        return FoodsModel.deleteOne({_id: idFood});
    }

    async find(params) {
        return await FoodsModel.find(params);
    }

    async aggregate(params) {
        return FoodsModel.aggregate([params]).exec();
    }

    async paginate(start, end) {
        return FoodsModel.find({}).limit(end).skip(start);
    }

    async count() {
        return FoodsModel.countDocuments({}).exec();
    }
};

module.exports = Object.create(new FoodRepository());