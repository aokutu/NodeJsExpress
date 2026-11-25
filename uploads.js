const multer = require("multer");
const upload  = multer({ dest: 'uploads/' }).single('demo_image');

function upload(req,res){
    if (!req.file ){
        return res.json({ message :"failed" });

    }

}

module.exports = {upload } ; 

