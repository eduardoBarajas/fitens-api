const FoodRepository = require('../repositories/foodRepository');
const FoodsModel = require('../models/food');

class FoodService {
    async insertOne(food, callback) {
        try {
            let new_food = new FoodsModel(food);
            let result = await FoodRepository.save(new_food);
            if (result) {
                callback('success', result);
            } else {
                callback('error', null);
            }
        } catch(e) {
            callback('error', null);
        }
    }

    async find(type, params, callback) {
        console.log('entro aqui');
        try {
            let result;
            (type === 'find') ? result = await FoodRepository.find(params) : result = await FoodRepository.aggregate(params);
            if (result) {
                if (result.length > 0) {
                    callback('success', result);
                } else {
                    callback('warning', result);
                }
            } else {
                callback('error', null);
            }
            console.log(result);
        } catch(e) {
            console.log(e);
            callback('error', null);
        }
    }

    async paginate(start, end, callback) {
        try {
            let result = await FoodRepository.paginate(start, end);
            let count = await FoodRepository.count();
            if (result) {
                if (result.length > 0) {
                    callback('success', result, count);
                } else {
                    callback('warning', null, -1);
                }
            } else {
                callback('error', null, -1);
            }
            console.log(result);
        } catch(e) {
            console.log(e);
            callback('error', null, -1);
        }
    }
}

module.exports = Object.create(new FoodService());