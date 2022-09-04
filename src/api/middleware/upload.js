const multer = require('multer')

const imageFilter = (req,file,cb) =>{

    const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
    if(allowedFileTypes.includes(file.mimetype)){
        cb(null,true)
    }else{
        cb("Please upload only images",false)
    }

}

let storage = multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null,"./src/public/uploads/")
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+"_"+file.originalname)
    }
})


let uploadFile = multer({storage:storage,fileFilter:imageFilter})

module.exports = uploadFile