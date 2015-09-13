var mongoose = require('mongoose'),
    Schema= mongoose.Schema;

var TaskSchema =  new Schema({
    text: {type: String, required: true},
    complete: {type: Boolean, required: true},
});

module.exports=mongoose.model('Task', TaskSchema);