
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,'./api/profile/');
    },
    filename:function(req,file,cb){
        cb(null,req._id);
    }
});

const fileFilter = (req, file, cb)=>{
    if(file.mimetype==='image/jpeg' || file.mimetype==='image/png'){
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
