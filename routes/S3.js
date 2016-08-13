"use strict";

var express = require("express");
var router = express.Router();
var mkdirp = require('mkdirp');
var async = require('async');
var filendir = require('filendir');
var fstream = require('fstream'),
tar = require('tar'),
zlib = require('zlib');

var multer = require("multer");
var upload = multer({
    storage: multer.memoryStorage()
});
var s3 = require("../models/S3");

router.post("/addToBucket", upload.single("newFile"), function(request, response) {
    console.log("file: ", request.file)
    s3.storeOn(request.file, function(error) {
        if (error) response.status(400).send(error);
        response.redirect("/")
    })
});

router.post("/addMultipleToBucket", upload.array("newFiles"), function(request, response) {
    console.log("Here");
    console.log("files: ", request.files);
    s3.storeMultipleOn(request.files, function(error, results) {
        if (error) {
            response.status(400).send(error)
        } else {
            console.log("results: ", results);
            response.send(results);
        }
    });
});

router.post("/createBucket", function(request, response) {

    s3.createBucket("someData", function(error, results) {
        if (error) response.status(400).send(error);
        response.send(results)
    });
});


router.put("/getFromBucket", function(request, response) {
    s3.getFrom(request.body, function(error, data) {
        if (error) response.status(400).send(error);
        response.send(data);
    })
});

router.get("/getForm", function(request, response) {
            console.log('routing')


    fstream.Reader({
            'path': 'routes',
            'type': 'Directory'
        }) /* Read the source directory */
        .pipe(tar.Pack()) /* Convert the directory to a .tar file */
        .pipe(zlib.Gzip()) /* Compress the .tar file */
        .pipe(fstream.Writer({
                'models': 'compressed_folder.tar.gz'
            });

    response.send('it is working');

});


module.exports = router;
