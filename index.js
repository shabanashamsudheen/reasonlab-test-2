const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fetch =require('node-fetch')
const axios = require('axios');
const FormData = require('form-data');

app.use(bodyParser.json());
process.on('unhandledRejection', (ex) => {
    throw ex;
  });

 
   
   
  
// josn reponse iterator
function deepIterator (target) {
  
    if (typeof target === 'object') {
      for (const key in target) {
        deepIterator(target[key]);
      }
    } else {
        readFile(target)
    }
  }
 

//function to read the file content in the url
async function readFile(url){
    let filename=url.split('/').pop();

    const response = await axios.get(
    url,
    { responseType: 'arraybuffer' }
    );
    if(response.data){
        const buffer = Buffer.from(response.data, 'utf-8');
        var bodyFormData = new FormData();
        bodyFormData.append('filename', filename);
        bodyFormData.append('url', url); 
        bodyFormData.append('file', buffer,filename); 
      //calling my service to add/ update file 
        axios({
            method:'post',
            url:'http://localhost:3011/api/add-File',
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" },
        }).then(response=>{
        console.log(response)   
        if (response.status==200){
            }
        }).catch(err=>{console.log(res)})
    }
    
}


//Api call in every 5 minute
setInterval(async()=>{
    let url = `https://cfrkftig71.execute-api.us-east-1.amazonaws.com/prod?expert=true`
    const response= await axios.get(url).then(response=>{
      if (response.status==200){
          response.data.forEach(data => {
              if(data){
                  if(typeof data=='string' && data) {
                      readFile(data)
                  }
                  else{
                      deepIterator(data)
                  }
              }
          });
      }
    })
},30000);
app.use('/api', require('./webservice'));

const port = process.env.PORT || 3011;
app.listen(port, () => console.log(`Listening on port ${port}...`));
