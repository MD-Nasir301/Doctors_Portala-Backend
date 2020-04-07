const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()
const app = express()

app.use(cors())
app.use(bodyParser.json())

//database connection start
const uri = process.env.DB_PATH;
let client = new MongoClient(uri, { useNewUrlParser: true });
//database connection  end

// get
app.get('/foods', (req, res) => {
    const client = new MongoClient(uri, { useNewUrlParser: true });
        client.connect(err => {
            const collection = client.db("redOnion").collection("foodItems");
            collection.find().toArray((err,document) =>{ 
                if(err){
                    console.log(err);
                    res.sent(err.message)
                }else{
                    // console.log("after save data ", result.ops[0]);
                    res.send(document)
                }
              })
          client.close();
        });
})


app.get('/foods/:key',(req,res)=>{
    const key = req.params.key
    const client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("redOnion").collection("foodItems");
        collection.find({key}).toArray((err,document) =>{ 
            if(err){
                console.log(err);
                res.sent(err.message)
            }else{
                // console.log("after save data ", result.ops[0]);
                res.send(document[0])
            }
          })
      client.close();
    });
    //backend

})

// post add User
    app.post('/Order',(req,res)=>{
        const client = new MongoClient(uri, { useNewUrlParser: true });
        const orderDetails = req.body
        orderDetails.orderTime = new Date()
        client.connect(err => {
            const collection = client.db("redOnion").collection("orderFood");
            collection.insertOne(orderDetails,(err,result) =>{ 
                if(err){
                    console.log(err);
                    res.sent(err.message)
                }else{
                    console.log("after save data ", result.ops[0]);
                    res.send(result.ops[0])
                }
              })
          client.close();
        });
    })

// post addProduct
    app.post('/addProduct',(req,res)=>{
        const client = new MongoClient(uri, { useNewUrlParser: true });
        const product = req.body
        client.connect(err => {
            const collection = client.db("redOnion").collection("foodItems");
            collection.insert(product,(err,result) =>{ 
                if(err){
                    console.log(err);
                    res.sent(err.message)
                }else{
                    console.log("after save data ", result.ops[0]);
                    res.send(result.ops[0])
                }
              })
          client.close();
        });
    })

const port = process.env.PORT || 3300
app.listen(port, () => console.log(` listening at http://localhost:${port}`))