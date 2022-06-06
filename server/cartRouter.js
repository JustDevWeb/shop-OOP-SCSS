import * as express from 'express';
import * as fs from 'fs';
import cartHandler from './cartHandler.js';
const router = express.Router();


router.get('/',(req,res)=>{
    fs.readFile("server/db/cartProducts.json",'utf-8',(err,data)=>{
        if(!err){
            res.send(data)
        }else{
            res.sendStatus(404, JSON.stringify({result:0, text: err}));
        }
    })
})

router.post('/add',(req,res)=>{
    fs.readFile("server/db/cartProducts.json",'utf-8',(err,data)=>{
        if(!err){
            let cartModify = new cartHandler(JSON.parse(data),req.body);
            let newCart = cartModify.add();
            
            // res.send(JSON.stringify(cartItems,null,4))
            fs.writeFile("server/db/cartProducts.json",JSON.stringify(newCart,null,4),(err)=>{
                if(!err){
                    res.send(JSON.stringify(newCart,null,4))
                }else{
                    res.sendStatus(404,JSON.stringify({text:err}))
                }

            })
        }else{
            res.sendStatus(404,JSON.stringify({text:err}))
        }
    })
})

router.put('/update',(req,res)=>{
    fs.readFile("server/db/cartProducts.json",'utf-8',(err,data)=>{
        if(!err){
            // console.log(req.body);
            let cartModify = new cartHandler (JSON.parse(data),req.body);
            let newCart = cartModify.update();
            fs.writeFile('server/db/cartProducts.json', JSON.stringify(newCart,null,4),(err)=>{
                if(!err){
                    res.send(JSON.stringify(newCart,null,4))
                }else{
                    res.sendStatus(404,JSON.stringify({text:err}))
                }
            })
            
        }else{
            res.sendStatus(404,JSON.stringify({text:err}))
        }
    })
})



router.delete('/delete',(req,res)=>{
    fs.readFile('server/db/cartProducts.json', 'utf-8', (err,data)=>{
        if(!err){
            let cartModify = new cartHandler (JSON.parse(data),req.body);
            let newCart = cartModify.delete();            
            fs.writeFile('server/db/cartProducts.json', JSON.stringify(newCart,null,4),(err)=>{
                if(!err){
                    res.send(JSON.stringify(newCart,null,4))
                }else{
                    res.sendStatus(404,JSON.stringify({text:err}))
                }
            })
        }else {
            res.sendStatus(404,JSON.stringify({text:err}))
        }
    })
})




export default router;