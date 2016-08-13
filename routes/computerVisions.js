'use strict';

var express = require('express');
var request = require('request');
var router = express.Router();

var Vision = require('../models/computerVision');

const MY_SECRET = process.env.MY_SECRET;

router.get('/', (req, res) => {
    var options = {
        method: 'GET',
        url: 'https://api.projectoxford.ai/vision/v1.0/models',
        headers: {
            'cache-control': 'no-cache',
            'ocp-apim-subscription-key': MY_SECRET
        }
    };

    request(options, function(error, response, body) {
        if (error) throw new Error(error);

        Vision.getAll((err, result) => {
            console.log('result', result);
            res.send(result);

        });
    });
});

router.get('/:id', (req, res) => {
    Vision.getOne(req.params.id, (err, result) => {
        if (err) throw new Error(err);

        res.send(result);
    });
});

router.post('/', (req, res) => {
    console.log('req.body', req.body);
    var image = req.body.url;
    var options = {
        method: 'POST',
        url: 'https://api.projectoxford.ai/vision/v1.0/describe',
        qs: {
            maxCandidates: '1'
        },
        headers: {
            'postman-token': 'd811b874-3549-0e1d-0d1f-21347ff4bbfa',
            'cache-control': 'no-cache',
            'ocp-apim-subscription-key': '9b049284d8f0464295cd9efa7219df1f',
            'content-type': 'application/json'
        },
        body: {
            url: image
        },
        json: true
    };

    request(options, function(error, response, body) {
        if (error) throw new Error(error);

        console.log('body', body);
        Vision.create(body, (err, result) => {
            if (err) throw new Error(err);

            res.send(body);
        })

    });
});
router.delete('/:id', (req, res) => {
    Vision.remove(req.params.id, err => {
        if (err) throw new Error(err);

        res.send()
    });
});

router.put('/:id', (req, res) => {
    Vision.update(req.params.id, req.body, (err, result) => {
        if (err) throw new Error(err);

        res.send(result);
    })
})

module.exports = router;
