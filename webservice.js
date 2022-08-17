const express = require('express');
const router = express.Router();
const path = require('path');
const fs= require('fs')
const Joi= require('joi')
const multer = require('multer');
const upload = multer()
router.post('/add-File',multer({storage: multer.memoryStorage()}).single("file"),async function (req, res) {
    console.log(req.body)
    const schema = Joi.object({
        filename: Joi.string().required(),
        url: Joi.string().required(),
    });
    const { error } =schema.validate(req.body);
    if (error) return res.status(400).send({ status: false, data: error.details[0].message, message: "failed" })

    let filename=req.body.filename
    let buffer=req.file.buffer
    //if file already exist, generate new name with index
    if (fs.existsSync(path.join(__dirname,'files',filename))) {
        await getNewFileName(filename).then(value=>{
            filename =value;
        });
    }
    //write file
    fs.writeFile(path.join(__dirname,'files',filename), buffer, (err) => {
       if(err) console.log(err)
        if(!err) console.log('Data written');
      });
});

function getNewFileName(fileName){
    //read all the files in directory
    let allPreviousFiles=[]
    return new Promise(async(resolve, reject) => {
      await  fs.readdir(
            path.resolve(__dirname, 'files'),
            (err, files) => {
              if (err)  reject(err);
              files.forEach((file,index)=> {
                const nameParts = file.split('_');
                if(nameParts[0]==fileName){
                    if(nameParts[1])
                    allPreviousFiles.push(nameParts[1])
                }
                if(index==files.length-1){
                    console.log("File already Exists, adding new file")
                // if no file with index, start adding 1
                if(allPreviousFiles.length==0)
                fileName=fileName+'_1'
                else{
                    fileName=fileName+'_'+(Math.max(allPreviousFiles)+1)
                }
                
                resolve(fileName);
            }
              })
            }
          );   
         })
      }
module.exports = router;