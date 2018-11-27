const mongoose = require('mongoose');
const uploadSchema = new mongoose.Schema({
name : {
    type : String
},
image : {
    type : String
}
});
const Upload = mongoose.model('uploads', uploadSchema);
module.exports = Upload;