var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/task_database';
var Task = require('../../models/tasks');

router.post('/todos', function(req, res) {
    var results = [];
    // Grab data from http request
    var data = {text: req.body.text, complete: false};

    //only do something if there is a task in the text field
    if (req.body.text) {
        //create new database document for new task
        Task.create(data,function(err){
            if (err) {
                console.log(err);
                next(err);
            }else {
                //return all database documents after addition
                Task.find({}, function (err, tasks) {
                    if (err) {
                        console.log(err);
                        next(err);
                    } else {
                        tasks.forEach(function (task) {
                            results.push(task);
                        });
                        res.json(results);
                    }
                });
            }
        });
    } else{
        Task.find({}, function (err, tasks) {
            if (err) {
                console.log(err);
                next(err);
            } else {
                tasks.forEach(function (task) {
                    results.push(task);
                });
                res.json(results);
            }
        });
    }
});

router.get('/todos', function(req, res) {
    var results = [];
    //find all documents in database
    Task.find({}, function (err,tasks) {
        if (err) {
            console.log(err);
            next(err);
        } else {
            tasks.forEach(function (task) {
                results.push(task);
            });
            res.json(results);
        }
    });

});

router.put('/todos', function(req, res) {
    var results = [];
    var id = req.body._id;
    //find database document to be updated
    Task.findByIdAndUpdate(id,{complete:req.body.complete}, function (err, task) {
        if (err) {
            console.log(err);
            next(err);
        } else {
            //find all database entries to return
            Task.find({}, function (err,tasks) {
                if (err) {
                    console.log(err);
                    next(err);
                } else {
                    tasks.forEach(function (task) {
                        results.push(task);
                    });
                    res.json(results);
                }
            });
        }
    });

});

router.delete('/todos/:id', function(req, res) {
    var results = [];
    //get id from url
    var id = req.params.id;
    //find database document to be deleted
    Task.findByIdAndRemove(id, function (err) {
        if (err) {
            console.log(err);
            next(err);
        } else {
            //return all documents in database after deletion
            Task.find({}, function (err, tasks) {
                if (err) {
                    console.log(err);
                    next(err);
                } else {
                    tasks.forEach(function (task) {
                        results.push(task);
                    });
                    res.json(results);
                }
            });
        }
    });
});

module.exports = router;