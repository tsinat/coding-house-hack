'use strict';

var mongoose = require('mongoose');

var visionSchema = new mongoose.Schema({
    categories: { type: Array, Required: true},
    requestId: { type: String},
    metadata: {type: Object}
});

visionSchema.statics.getAll = cb => {
    Vision.find({}, (err, result) => {
        if(err) cb(err);

        cb(null, result);
    });
};

visionSchema.statics.create = (newObj, cb) => {
    console.log('image create:', newObj);
    var image = new Vision({
        categories: newObj.categories,
        requestId: newObj.requestId,
        metadata: newObj.metadata
    });
    image.save((err, savedVision) => {
        if(err) return cb(err);

        else cb(null, savedVision);
    });
};

visionSchema.statics.getOne = (id, cb) => {
    Vision.findById(id, (err, result) => {
        if(err) cb(err);

        else cb(null, result);
    });
};

visionSchema.statics.remove = (id, cb) => {
    Vision.findByIdAndRemove(id, (err, deletedImage) => {
        if(err) cb(err)

        cb(null, deletedImage);
    });
};

visionSchema.statics.update = (id, updateObj, cb) => {
    var obj = updateObj;
    Vision.findByIdAndUpdate(id, { $set: obj}, (err, updatedResult) => {
        if(err) cb(err);

        updatedResult.save((err, savedImage) => {
            if(err) cb(err);

            cb(null, savedImage);
        });
    });
}

var Vision = mongoose.model('Vision', visionSchema);

module.exports = Vision;
