let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// create a reference to the model
let Match = require('../models/match');

module.exports.displayMatchList = (req, res, next) => {
    Match.find((err, matchList) => {
        if (err) {
            return console.error(err);
        } else {


            res.render('match/list', { title: 'Matches', MatchList: matchList });
        }
    });
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('match/add', { title: 'Add Match' })
}

module.exports.processAddPage = (req, res, next) => {
    let newMatch = Match({
        "match": req.body.match,
        "teams": req.body.teams,
        "game": req.body.game,
        "time": req.body.time,
        "price": req.body.price
    });

    Match.create(newMatch, (err, Match) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {

            res.redirect('/match-list');
        }
    });

}


module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    Match.findById(id, (err, matchToEdit) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            //show the edit view
            res.render('match/edit', {
                title: 'Edit Match',
                match: matchToEdit,
                displayName: req.user ? req.user.displayName : ''
            })
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id

    let updatedMatch = Match({
        "_id": id,
        "match": req.body.match,
        "teams": req.body.teams,
        "game": req.body.game,
        "time": req.body.time,
        "price": req.body.price
    });

    Match.updateOne({ _id: id }, updatedMatch, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {

            res.redirect('/match-list');
        }
    });
}





module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    Match.remove({ _id: id }, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {

            res.redirect('/match-list');
        }
    });
}