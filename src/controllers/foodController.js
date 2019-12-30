const express = require('express');
const router = express.Router();
const FoodService = require('../services/foodService');
router.post('/insertFood/', function(req, res) {
    try {
        // obtenemos el registro que se almacenara.
        let food = req.body.food;
        // colocamos el id como undefined para que se autogenere uno.
        food._id = undefined;
        FoodService.insertOne(food, (status, result) => {
            if (status === 'success') {
                res.status(200).send({message: 'Se agrego correctamente la comida.', 'status': status, data: result});
            } else {
                res.status(500).send({message: 'Fallo la operacion', 'status': status});
            }
        });
    } catch (e) {
        res.status(500).send({message: 'No se enviaron los parametros correctamente.', 'status': 'Error'});
    }
});

router.get('/find/:type/:query', (req, res) => {
    console.log(req.params);
    try {
        let params = JSON.parse(req.params.query);
        console.log(params);
        let result = (status, result) => {
            switch (status) {
                case 'success': res.status(200).send({message: 'Comidas obtenidas con exito', 'status': status, data: result});break;
                case 'warning': res.status(204).send({message: 'No se encontraron comidas con esas espeficaciones', 'status': status});break;
                case 'error': res.status(500).send({message: 'Ocurrio un problema', 'status': status});break;
            }
        };
        FoodService.find(req.params.type, params, result);
    } catch (e) {
        console.log(e);
        res.status(500).send({message: 'No se enviaron los parametros de busqueda correctamente.', 'status': 'Error'});
    }
});

router.get('/paginate/:start/:end', (req, res) => {
    try {
        let result = (status, result) => {
            switch (status) {
                case 'success': res.status(200).send({message: 'Comidas obtenidas con exito', 'status': status, data: result});break;
                case 'warning': res.status(204).send({message: 'No se encontraron comidas con esas espeficaciones', 'status': status});break;
                case 'error': res.status(500).send({message: 'Ocurrio un problema', 'status': status});break;
            }
        };
        FoodService.paginate(parseInt(req.params.start), parseInt(req.params.end), (status, result, count) => {
            switch (status) {
                case 'success': res.status(200).send({message: 'Comidas obtenidas con exito', 'status': status, data: result, count: count});break;
                case 'warning': res.status(203).send({message: 'No se encontraron comidas con esas espeficaciones', 'status': status});break;
                case 'error': res.status(500).send({message: 'Ocurrio un problema', 'status': status});break;
            }
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({message: 'No se enviaron los parametros de busqueda correctamente.', 'status': 'Error'});
    }
});



module.exports = router;