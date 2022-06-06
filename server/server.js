import express from 'express';
import * as fs from 'fs';
import router from './cartRouter.js';



const app = express();

app.use(express.json());
app.use('/', express.static('public'));
app.use('/api/cart/',router);


app.get('/api/products/',(req,res)=>{
    
    fs.readFile('server/db/products.json','utf-8',(err,data)=>{
        if(!err){            
            res.send(data);
        }else{
            res.send(console.log("error in get products"))
        }
    })
    
})


// app.get('/api/cart/',(req,res)=>{
//     fs.readFile('cartProducts.json','utf-8',(err,data)=>{
//         if(!err){
//             // let phones = JSON.parse(data);
//             res.send(data);
//         }else{
//             res.send(console.log("error"))
//         }
//     })
    
// })

// app.post('/api/cart/',(req,res)=>{
//     fs.readFile('./cartProducts.json','utf-8',(err,data)=>{
//         if(!err){
//             let cartProd = JSON.parse(data);
//             let testItem = req.body;            
//             cartProd.contents.push(testItem);
//             fs.writeFile('cartProducts.json',JSON.stringify(cartProd,null,4),(err)=>{
//                 if(err){
//                     console.log("error in writing process")
//                 }else {
//                     res.send(JSON.stringify(cartProd,null,4))
//                 }
//             })
//             }else (
//                 res.send(console.log('error'))
//             )
//     })
// })




// app.put('api/updatePhones',(req,res)=>{

// })
const port = process.env.PORT || 3000;

app.listen( port,()=>{
    console.log('Связь с сервером установленна');
})