
const multer = require('multer');
const path = require('path');
const fs = require('fs')

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,'./api/profile/');
    },
    filename:function(req,file,cb){
        cb(null,`${req.params._id}.jpeg`);
    }
});

const fileFilter = (req, file, cb)=>{
    if(file.mimetype==='image/jpeg' || file.mimetype==='image/png'){
        var dir = path.join(path.dirname(require.main.filename), 'api/profile/');
        try {
            fs.unlinkSync(`${dir}${req.params._id}.jpeg`);
        } catch (err) {
            //cb(null,false);
        }
        cb(null, true);
    }else{
        cb(null,false);
    }
}

const uploads = multer({
    storage:storage,
    fileFilter:fileFilter
});

module.exports = uploads;
