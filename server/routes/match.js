let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');


let Match = require('../models/match');

let matchController = require('../controllers/match');



router.get('/', matchController.displayMatchList);


router.get('/add', matchController.displayAddPage);

router.post('/add', matchController.processAddPage);

router.get('/edit/:id', matchController.displayEditPage);

router.post('/edit/:id', matchController.processEditPage);

router.get('/delete/:id', matchController.performDelete);

module.exports = router;